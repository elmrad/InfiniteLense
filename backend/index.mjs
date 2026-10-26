import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const secrets = new SecretsManagerClient({});
const SECRET_ID = process.env.OPENAI_SECRET_ID || "InfiniteLense/prod/openai";
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";
let cachedKey;

const schema = {
  type: "object",
  additionalProperties: false,
  required: ["environment_summary", "suitability_score", "safety", "lenses", "outcomes", "activities", "cross_curricular_links"],
  properties: {
    environment_summary: { type: "string" },
    suitability_score: { type: "integer", minimum: 0, maximum: 100 },
    safety: { type: "array", items: { type: "string" } },
    lenses: {
      type: "array", minItems: 4, maxItems: 4,
      items: {
        type: "object", additionalProperties: false,
        required: ["name", "visible_evidence", "learning_possibilities"],
        properties: {
          name: { type: "string" },
          visible_evidence: { type: "array", items: { type: "string" } },
          learning_possibilities: { type: "array", items: { type: "string" } }
        }
      }
    },
    outcomes: {
      type: "array", minItems: 1, maxItems: 6,
      items: {
        type: "object", additionalProperties: false,
        required: ["code", "outcome", "source_title", "source_url", "visible_evidence", "confidence"],
        properties: {
          code: { type: "string" }, outcome: { type: "string" }, source_title: { type: "string" },
          source_url: { type: "string" }, visible_evidence: { type: "string" },
          confidence: { type: "integer", minimum: 0, maximum: 100 }
        }
      }
    },
    activities: {
      type: "array", minItems: 3, maxItems: 3,
      items: {
        type: "object", additionalProperties: false,
        required: ["rank", "title", "curriculum_match", "outcome_codes", "duration_minutes", "grouping", "materials", "steps", "evidence", "safety", "cross_curricular"],
        properties: {
          rank: { type: "integer", minimum: 1, maximum: 3 }, title: { type: "string" },
          curriculum_match: { type: "integer", minimum: 0, maximum: 100 },
          outcome_codes: { type: "array", items: { type: "string" } },
          duration_minutes: { type: "integer", minimum: 10, maximum: 180 }, grouping: { type: "string" },
          materials: { type: "array", items: { type: "string" } }, steps: { type: "array", items: { type: "string" } },
          evidence: { type: "string" }, safety: { type: "array", items: { type: "string" } },
          cross_curricular: { type: "array", items: { type: "string" } }
        }
      }
    },
    cross_curricular_links: { type: "array", items: { type: "string" } }
  }
};

function response(statusCode, body, origin = ALLOWED_ORIGIN) {
  return {
    statusCode,
    headers: {
      "content-type": "application/json",
      "access-control-allow-origin": origin,
      "access-control-allow-headers": "content-type",
      "access-control-allow-methods": "POST,OPTIONS"
    },
    body: JSON.stringify(body)
  };
}

async function getOpenAIKey() {
  if (cachedKey) return cachedKey;
  const value = await secrets.send(new GetSecretValueCommand({ SecretId: SECRET_ID }));
  const raw = value.SecretString || "";
  try {
    const parsed = JSON.parse(raw);
    cachedKey = parsed.OPENAI_API_KEY || parsed.openai_api_key;
  } catch {
    cachedKey = raw;
  }
  if (!cachedKey) throw new Error("OPENAI_API_KEY is missing from the configured secret.");
  return cachedKey;
}

function validate(body) {
  if (!Array.isArray(body.images) || body.images.length < 1 || body.images.length > 8) return "Upload between 1 and 8 photographs.";
  if (!body.curriculum || !body.grade || !body.subject) return "Curriculum, grade and subject are required.";
  if (!Number.isInteger(body.studentCount) || body.studentCount < 1 || body.studentCount > 100) return "Student count must be between 1 and 100.";
  if (body.facesDeclared && !body.consentConfirmed) return "Recorded consent is required for identifiable student faces.";
  if (body.images.some(image => typeof image !== "string" || !image.startsWith("data:image/") || image.length > 1_600_000)) return "Each photograph must be a valid compressed image under the size limit.";
  return null;
}

export const handler = async event => {
  const origin = ALLOWED_ORIGIN;
  if (event.requestContext?.http?.method === "OPTIONS") return response(204, {}, origin);

  try {
    const body = JSON.parse(event.body || "{}");
    const invalid = validate(body);
    if (invalid) return response(400, { error: invalid }, origin);

    const key = await getOpenAIKey();
    const context = {
      curriculum: body.curriculum, grade: body.grade, subject: body.subject,
      student_count: body.studentCount, student_ages: body.studentAges,
      environment_type: body.environmentType, location: body.location, notes: body.notes
    };

    const content = [
      {
        type: "input_text",
        text: `Analyse every photograph as one combined learning environment. Context: ${JSON.stringify(context)}. Use four lenses: (1) objects, materials and available tools; (2) colours, shapes, patterns and measurements; (3) nature, living systems and physical forces; (4) culture, language, art and sustainability. Link only learning outcomes genuinely supported by visible evidence. Verify curriculum wording using authoritative curriculum-body or government sources. Create exactly three ranked, practical experiential activities. Include selected-subject depth plus sensible cross-curricular links. Adapt for the stated ages and group size. Do not identify people or infer sensitive traits. If evidence is uncertain, lower confidence and say so.`
      },
      ...body.images.map(image_url => ({ type: "input_image", image_url, detail: "auto" }))
    ];

    const api = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-6-luna",
        input: [{ role: "user", content }],
        tools: [{ type: "web_search" }],
        text: { format: { type: "json_schema", name: "experiential_learning_plan", strict: true, schema } },
        max_output_tokens: 6000,
        store: false
      })
    });

    const data = await api.json();
    if (!api.ok) throw new Error(data?.error?.message || "OpenAI request failed.");
    const outputText = data.output_text || data.output?.flatMap(item => item.content || []).find(item => item.type === "output_text")?.text;
    if (!outputText) throw new Error("OpenAI returned no structured plan.");
    return response(200, { plan: JSON.parse(outputText) }, origin);
  } catch (error) {
    console.error("InfiniteLense analysis failed", error?.message);
    return response(500, { error: "The environment could not be analysed. Please try again." }, origin);
  }
};
