const $ = selector => document.querySelector(selector);
const esc = value => String(value ?? "").replace(/[&<>'"]/g, char => ({
  "&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"
})[char]);

let selectedFile = null;

function authConfig(){ return window.INFINITE_LENSE_AUTH || {}; }
function authReady(){
  const config = authConfig();
  return Boolean(config.domain && config.clientId && config.redirectUri);
}
function decodeToken(token){
  try{
    const part = token.split(".")[1].replace(/-/g,"+").replace(/_/g,"/");
    return JSON.parse(atob(part));
  }catch{return {}}
}
function currentToken(){
  const token = sessionStorage.getItem("il_id_token");
  if(!token) return "";
  const payload = decodeToken(token);
  if(!payload.exp || payload.exp * 1000 < Date.now() + 30000){
    sessionStorage.removeItem("il_id_token");
    return "";
  }
  return token;
}
function randomUrlSafe(bytes=32){
  const values = crypto.getRandomValues(new Uint8Array(bytes));
  return btoa(String.fromCharCode(...values)).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"");
}
async function challengeFor(value){
  const digest = await crypto.subtle.digest("SHA-256",new TextEncoder().encode(value));
  return btoa(String.fromCharCode(...new Uint8Array(digest))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"");
}
async function beginLogin(){
  if(!authReady()){ toast("The secure AI connection is not configured yet."); return; }
  const config = authConfig();
  const verifier = randomUrlSafe(48);
  const state = randomUrlSafe(24);
  sessionStorage.setItem("il_pkce_verifier",verifier);
  sessionStorage.setItem("il_oauth_state",state);
  const query = new URLSearchParams({
    response_type:"code",client_id:config.clientId,redirect_uri:config.redirectUri,
    scope:"openid email",state,code_challenge:await challengeFor(verifier),code_challenge_method:"S256"
  });
  location.assign(`${config.domain}/oauth2/authorize?${query}`);
}
async function finishLogin(){
  if(!authReady()) return;
  const query = new URLSearchParams(location.search);
  const code = query.get("code");
  if(!code) return;
  const verifier = sessionStorage.getItem("il_pkce_verifier");
  if(query.get("state") !== sessionStorage.getItem("il_oauth_state") || !verifier) throw new Error("The sign-in response could not be verified.");
  const config = authConfig();
  const response = await fetch(`${config.domain}/oauth2/token`,{
    method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},
    body:new URLSearchParams({grant_type:"authorization_code",client_id:config.clientId,code,redirect_uri:config.redirectUri,code_verifier:verifier})
  });
  const tokens = await response.json();
  if(!response.ok || !tokens.id_token) throw new Error("Sign-in could not be completed.");
  sessionStorage.setItem("il_id_token",tokens.id_token);
  sessionStorage.removeItem("il_pkce_verifier");
  sessionStorage.removeItem("il_oauth_state");
  history.replaceState({},document.title,location.pathname);
}
function updateAuth(){
  const button = $("#authButton");
  if(!authReady()){ button.textContent="AI connection pending"; button.disabled=true; return; }
  button.textContent=currentToken() ? "Sign out" : "Sign in";
}
$("#authButton").addEventListener("click",()=>{
  if(!currentToken()) return beginLogin();
  const config = authConfig();
  sessionStorage.removeItem("il_id_token");
  location.assign(`${config.domain}/logout?${new URLSearchParams({client_id:config.clientId,logout_uri:config.redirectUri})}`);
});

function toast(message){
  const element = $("#toast");
  element.textContent=message;
  element.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer=setTimeout(()=>element.classList.remove("show"),3200);
}
function setStatus(message){ $("#status").textContent=message; }

$("#imageFile").addEventListener("change",event=>{
  const file=event.target.files[0];
  if(!file) return;
  if(!file.type.startsWith("image/")){ toast("Please choose a JPG, PNG or WEBP picture."); return; }
  selectedFile=file;
  const preview=$("#preview");
  preview.src=URL.createObjectURL(file);
  $("#dropzone").classList.add("has-image");
  $("#analyseButton").disabled=false;
  setStatus("Picture ready for analysis.");
});

function compressImage(file){
  return new Promise((resolve,reject)=>{
    const image=new Image();
    const reader=new FileReader();
    reader.onerror=reject;
    image.onerror=reject;
    reader.onload=()=>{image.src=reader.result};
    image.onload=()=>{
      const max=1400;
      const scale=Math.min(1,max/Math.max(image.width,image.height));
      const canvas=document.createElement("canvas");
      canvas.width=Math.round(image.width*scale);
      canvas.height=Math.round(image.height*scale);
      canvas.getContext("2d").drawImage(image,0,0,canvas.width,canvas.height);
      resolve(canvas.toDataURL("image/jpeg",.82));
    };
    reader.readAsDataURL(file);
  });
}

function renderPlan(plan,age){
  $("#resultTitle").textContent=`Through the eyes of a ${age}-year-old`;
  $("#imageReading").textContent=plan.image_reading;
  $("#evidenceStrip").innerHTML=(plan.detected_evidence || []).map(item=>`
    <article class="evidence-chip">
      <strong>${esc(item.category)}</strong>
      <span>${esc(item.observation)}</span>
    </article>`).join("");

  $("#outcomeCount").textContent=`${plan.curriculum_outcomes.length} supported ${plan.curriculum_outcomes.length===1?"outcome":"outcomes"}`;
  $("#outcomeList").innerHTML=plan.curriculum_outcomes.map(item=>`
    <article class="outcome-card">
      <div class="outcome-meta">
        <span>${esc(item.area)}</span>
        <strong>${esc(item.stage)}</strong>
        <span class="confidence">${esc(item.confidence)}% evidence confidence</span>
      </div>
      <div class="outcome-copy">
        <h3>${esc(item.concept)}</h3>
        <p><b>Curriculum outcome:</b> ${esc(item.outcome)}</p>
        <p><b>What the child may notice:</b> ${esc(item.child_perspective)}</p>
        <p><b>Evidence in this picture:</b> ${esc(item.visible_evidence)}</p>
        ${/^https:\/\//i.test(item.source_url) ? `<a href="${esc(item.source_url)}" target="_blank" rel="noreferrer">View curriculum source ↗</a>` : ""}
      </div>
    </article>`).join("");
  $("#limitations").textContent=plan.limitations?.length
    ? "Image limits: "+plan.limitations.join(" · ")
    : "Only outcomes supported by visible evidence are shown.";
  $("#results").classList.add("visible");
  $("#results").scrollIntoView({behavior:"smooth",block:"start"});
}

$("#analyseButton").addEventListener("click",async()=>{
  if(!selectedFile){toast("Choose a picture first.");return}
  if(!window.INFINITE_LENSE_API_URL){toast("The frontend still needs the AWS API address.");return}
  const token=currentToken();
  if(!token){toast("Sign in to use live image analysis.");await beginLogin();return}

  const button=$("#analyseButton");
  button.disabled=true;
  button.classList.add("loading");
  $("span",button);
  const label=button.querySelector("span");
  label.textContent="Looking through the image";
  setStatus("Finding visible evidence and matching British curriculum outcomes…");
  try{
    const image=await compressImage(selectedFile);
    const age=Number($("#age").value);
    const response=await fetch(window.INFINITE_LENSE_API_URL,{
      method:"POST",
      headers:{"content-type":"application/json",authorization:`Bearer ${token}`},
      body:JSON.stringify({
        images:[image],curriculum:"British",age,
        notes:$("#notes").value.trim(),
        consentConfirmed:$("#faceConsent").checked
      })
    });
    const payload=await response.json();
    if(!response.ok) throw new Error(payload.error || "The image could not be analysed.");
    renderPlan(payload.plan,age);
    setStatus("Analysis complete.");
  }catch(error){
    setStatus("");
    toast(error.message || "The image could not be analysed.");
  }finally{
    button.disabled=false;
    button.classList.remove("loading");
    label.textContent="Analyse through this child's eyes";
  }
});

finishLogin()
  .then(()=>{updateAuth();if(currentToken())toast("Signed in securely.");})
  .catch(error=>{updateAuth();toast(error.message)});
updateAuth();