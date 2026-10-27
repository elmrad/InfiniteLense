import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const secrets = new SecretsManagerClient({});
const SECRET_ID = process.env.OPENAI_SECRET_ID || "InfiniteLense/prod/openai";
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";
let cachedKey;

const schema = {
  type:"object",
  additionalProperties:false,
  required:["image_reading","detected_evidence","curriculum_outcomes","limitations"],
  properties:{
    image_reading:{type:"string"},
    detected_evidence:{
      type:"array",minItems:1,maxItems:12,
      items:{
        type:"object",additionalProperties:false,
        required:["category","observation","confidence"],
        properties:{
          category:{type:"string"},
          observation:{type:"string"},
          confidence:{type:"integer",minimum:0,maximum:100}
        }
      }
    },
    curriculum_outcomes:{
      type:"array",minItems:1,maxItems:10,
      items:{
        type:"object",additionalProperties:false,
        required:["area","stage","concept","outcome","child_perspective","visible_evidence","source_title","source_url","confidence"],
        properties:{
          area:{type:"string"},
          stage:{type:"string"},
          concept:{type:"string"},
          outcome:{type:"string"},
          child_perspective:{type:"string"},
          visible_evidence:{type:"string"},
          source_title:{type:"string"},
          source_url:{type:"string"},
          confidence:{type:"integer",minimum:0,maximum:100}
        }
      }
    },
    limitations:{type:"array",items:{type:"string"}}
  }
};

function response(statusCode,body){
  return {
    statusCode,
    headers:{
      "content-type":"application/json",
      "access-control-allow-origin":ALLOWED_ORIGIN,
      "access-control-allow-headers":"authorization,content-type",
      "access-control-allow-methods":"POST,OPTIONS"
    },
    body:JSON.stringify(body)
  };
}

async function getOpenAIKey(){
  if(cachedKey) return cachedKey;
  const value=await secrets.send(new GetSecretValueCommand({SecretId:SECRET_ID}));
  const raw=value.SecretString || "";
  try{
    const parsed=JSON.parse(raw);
    cachedKey=parsed.OPENAI_API_KEY || parsed.openai_api_key;
  }catch{
    cachedKey=raw;
  }
  if(!cachedKey) throw new Error("OPENAI_API_KEY is missing from the configured secret.");
  return cachedKey;
}

function stageForAge(age){
  return {
    4:"Reception / EYFS",
    5:"Year 1 / Key Stage 1",
    6:"Year 2 / Key Stage 1",
    7:"Year 3 / Key Stage 2",
    8:"Year 4 / Key Stage 2",
    9:"Year 5 / Key Stage 2",
    10:"Year 6 / Key Stage 2",
    11:"Year 7 / Key Stage 3"
  }[age];
}

function validate(body){
  if(!Array.isArray(body.images) || body.images.length!==1) return "Upload exactly one picture.";
  if(typeof body.images[0]!=="string" || !body.images[0].startsWith("data:image/") || body.images[0].length>2_400_000) return "The picture must be a valid compressed image.";
  if(!Number.isInteger(body.age) || body.age<4 || body.age>11) return "Choose an age from 4 to 11.";
  if(body.curriculum!=="British") return "The MVP currently supports the British curriculum.";
  return null;
}

export const handler=async event=>{
  if(event.requestContext?.http?.method==="OPTIONS") return response(204,{});
  try{
    const body=JSON.parse(event.body || "{}");
    const invalid=validate(body);
    if(invalid) return response(400,{error:invalid});

    const age=body.age;
    const stage=stageForAge(age);
    const key=await getOpenAIKey();
    const prompt=`You are the InfiniteLense visual curriculum engine. Analyse this single photograph through the developmental and educational perspective of a ${age}-year-old learner in ${stage}, using the statutory curriculum for England. Optional context supplied by the user: ${body.notes || "none"}.

The photograph is the primary evidence. Inspect it carefully and report only what is genuinely visible. Consider age-appropriate possibilities including, where evidenced: recognising and naming colours; counting visible items; comparing bigger/smaller, more/fewer, longer/shorter or near/far; matching, sorting and classifying; position, direction and proximity; shapes and patterns; addition or subtraction using visible quantities; language and description; living things, materials, forces, place, art and observation. These are possibilities, not a checklist. Do not force a concept that the image does not support.

Return only curriculum outcomes appropriate to the selected age and stage. For age 4, prioritise the current EYFS statutory framework and Development Matters only where appropriate. For school ages, prioritise the National Curriculum in England programme of study for the correct year/key stage. Verify wording with official GOV.UK or Department for Education sources using web search. Do not invent curriculum codes. Paraphrase faithfully when exact wording is not needed.

For every outcome, explain:
1. what a child of this age might naturally notice;
2. the exact visible evidence in this photograph;
3. why that evidence supports the curriculum outcome.

Do not identify people, infer sensitive traits, or describe a child's identity. If a count, colour, object or spatial relationship is uncertain, say so and lower confidence. Exclude unsupported outcomes. This MVP produces outcomes only—no activities, lesson plans, materials or assessment plans.`;

    const api=await fetch("https://api.openai.com/v1/responses",{
      method:"POST",
      headers:{authorization:`Bearer ${key}`,"content-type":"application/json"},
      body:JSON.stringify({
        model:process.env.OPENAI_MODEL || "gpt-6-luna",
        input:[{role:"user",content:[
          {type:"input_text",text:prompt},
          {type:"input_image",image_url:body.images[0],detail:"high"}
        ]}],
        tools:[{type:"web_search"}],
        text:{format:{type:"json_schema",name:"image_curriculum_lens",strict:true,schema}},
        max_output_tokens:5000,
        store:false
      })
    });

    const data=await api.json();
    if(!api.ok) throw new Error(data?.error?.message || "OpenAI request failed.");
    const outputText=data.output_text || data.output?.flatMap(item=>item.content || []).find(item=>item.type==="output_text")?.text;
    if(!outputText) throw new Error("OpenAI returned no structured analysis.");
    return response(200,{plan:JSON.parse(outputText)});
  }catch(error){
    console.error("InfiniteLense analysis failed",error?.message);
    return response(500,{error:"The picture could not be analysed. Please try again."});
  }
};