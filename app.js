const standards = [
  { subject: "Science", strand: "Living things & habitats", code: "SCI-Y4-LH-01", title: "Group living things using observable characteristics", detail: "Recognise that living things can be organised in several meaningful ways.", potential: "High" },
  { subject: "Science", strand: "Living things & habitats", code: "SCI-Y4-LH-02", title: "Use classification keys in local environments", detail: "Explore and apply simple keys to identify and name local plants and animals.", potential: "High" },
  { subject: "Science", strand: "Living things & habitats", code: "SCI-Y4-LH-03", title: "Investigate how environments change", detail: "Recognise that environmental change can help or endanger living things.", potential: "High" },
  { subject: "Science", strand: "Animals, including humans", code: "SCI-Y4-AH-01", title: "Construct and interpret food chains", detail: "Identify producers, predators and prey in a connected feeding relationship.", potential: "High" },
  { subject: "Science", strand: "States of matter", code: "SCI-Y4-SM-01", title: "Compare solids, liquids and gases", detail: "Group everyday materials according to their observable state.", potential: "High" },
  { subject: "Science", strand: "States of matter", code: "SCI-Y4-SM-02", title: "Observe changes of state", detail: "Investigate how heating or cooling changes materials and record temperature.", potential: "High" },
  { subject: "Science", strand: "States of matter", code: "SCI-Y4-SM-03", title: "Connect evaporation to the water cycle", detail: "Identify evaporation and condensation and relate evaporation rate to temperature.", potential: "High" },
  { subject: "Science", strand: "Sound", code: "SCI-Y4-SO-01", title: "Find patterns in pitch and volume", detail: "Relate sound to vibration, distance, pitch and the strength of vibration.", potential: "High" },
  { subject: "Science", strand: "Electricity", code: "SCI-Y4-EL-01", title: "Build and test a simple series circuit", detail: "Identify components, complete loops, switches, conductors and insulators safely.", potential: "Medium" },
  { subject: "Mathematics", strand: "Measurement", code: "MAT-Y4-ME-01", title: "Convert common units of measure", detail: "Use practical contexts to convert units such as kilometres and metres or hours and minutes.", potential: "High" },
  { subject: "Mathematics", strand: "Measurement", code: "MAT-Y4-ME-02", title: "Measure and calculate perimeter", detail: "Calculate the perimeter of rectilinear figures using centimetres and metres.", potential: "High" },
  { subject: "Mathematics", strand: "Measurement", code: "MAT-Y4-ME-03", title: "Find area by counting squares", detail: "Estimate and compare the area of rectilinear spaces using square units.", potential: "High" },
  { subject: "Mathematics", strand: "Statistics", code: "MAT-Y4-ST-01", title: "Collect, present and compare data", detail: "Use tables and appropriate graphs to answer comparison, sum and difference questions.", potential: "High" },
  { subject: "Mathematics", strand: "Geometry", code: "MAT-Y4-GE-01", title: "Describe position and direction", detail: "Use coordinates, translation and geometric language in a practical mapped space.", potential: "Medium" },
  { subject: "Geography", strand: "Fieldwork", code: "GEO-KS2-FW-01", title: "Observe, measure and record a local place", detail: "Present human and physical features using sketch maps, plans, graphs and digital tools.", potential: "High" },
  { subject: "Geography", strand: "Human & physical geography", code: "GEO-KS2-HP-01", title: "Describe the water cycle in place", detail: "Connect visible water, heat and weather conditions to water-cycle processes.", potential: "High" },
  { subject: "Geography", strand: "Geographical skills", code: "GEO-KS2-GS-01", title: "Use maps, symbols and compass directions", detail: "Locate and describe features with maps, keys and the eight points of a compass.", potential: "High" },
  { subject: "English", strand: "Spoken language", code: "ENG-KS2-SL-01", title: "Explain findings to an audience", detail: "Give a structured description, ask relevant questions and justify ideas with evidence.", potential: "High" }
];

let activities = [
  {
    id: "habitat", title: "Microhabitat Detectives", match: 96, status: "approved",
    description: "Teams survey two garden microhabitats, build a branching classification key and explain how visible features support identification.",
    subject: "Science", duration: "45 min", group: "Teams of 4", setting: "School garden",
    code: "SCI-Y4-LH-02", outcome: "Use classification keys to identify and name living things in the local environment.",
    materials: ["Clipboards or tablets", "Hand lenses", "Plant/animal observation sheet", "Boundary markers"],
    steps: ["Set safe survey zones and model careful observation.", "Teams record visible characteristics without disturbing organisms.", "Students build a simple yes/no classification key.", "Pairs swap keys and test whether they reach the same identification.", "Groups explain one classification decision using evidence."],
    evidence: "Photo of the classification key, observation table and a 30-second student explanation.",
    safety: "Check allergies, avoid unknown plants, keep organisms in place and provide a paved accessible survey route."
  },
  {
    id: "water", title: "Puddle to Cloud", match: 91, status: "review",
    description: "Students compare evaporation in sunny and shaded locations, collect temperature evidence and explain the water-cycle connection.",
    subject: "Science + Geography", duration: "35 min", group: "Pairs", setting: "Courtyard",
    code: "SCI-Y4-SM-03", outcome: "Identify evaporation and condensation in the water cycle and relate evaporation rate to temperature.",
    materials: ["Two shallow trays", "Water", "Thermometers", "Chalk or marker", "Timer"],
    steps: ["Place equal water samples in sun and shade.", "Mark starting levels and record temperatures.", "Predict which sample changes faster and justify why.", "Return after a set interval to measure change.", "Connect results to evaporation in the local water cycle."],
    evidence: "Before/after measurements, a two-column comparison and a short causal explanation.",
    safety: "Use non-slip trays, avoid peak heat and maintain a clear walking route."
  },
  {
    id: "map", title: "Measure the Living Map", match: 89, status: "approved",
    description: "Students measure garden features, create a scaled sketch map and display counts of natural and built assets.",
    subject: "Maths + Geography", duration: "50 min", group: "Teams of 3", setting: "School grounds",
    code: "GEO-KS2-FW-01", outcome: "Use fieldwork to observe, measure, record and present features in the local area.",
    materials: ["Tape measures", "Grid paper", "Pencils", "Compass", "Tally sheet"],
    steps: ["Agree a boundary and identify map features.", "Measure key paths and beds in metres.", "Use compass directions to locate features.", "Create a sketch map with a title, symbols and key.", "Present one pattern found in the place data."],
    evidence: "Annotated sketch map, measurement table and a team explanation of one design choice.",
    safety: "Assign measuring roles, keep tapes low and use the accessible route for every team."
  },
  {
    id: "sound", title: "Sound Map Walk", match: 87, status: "review",
    description: "Students map sounds around the school, compare perceived volume by distance and investigate which objects vibrate.",
    subject: "Science + English", duration: "40 min", group: "Pairs", setting: "School grounds",
    code: "SCI-Y4-SO-01", outcome: "Find patterns between sound, vibration, pitch, volume and distance from a source.",
    materials: ["Sound-map template", "Pencils", "Elastic bands", "Reusable containers", "Timer"],
    steps: ["Pause at four marked listening points.", "Record direction, source and relative volume.", "Compare the same sound at two distances.", "Test safe objects that produce visible vibration.", "Present the strongest pattern and supporting evidence."],
    evidence: "Sound map, comparison statement and an oral explanation using vibration vocabulary.",
    safety: "Choose low-traffic locations, protect quiet learning areas and do not measure unsafe noise sources."
  }
];

const state = {
  activeSubject: "All",
  search: "",
  environmentReady: false,
  environmentPhotos: [],
  visibleActivities: 3,
  approved: new Set(activities.filter(a => a.status === "approved").map(a => a.id)),
  evidence: Number(localStorage.getItem("il_evidence_count") || 12)
};

const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];
const esc = value => String(value ?? "").replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);

function authConfig() {
  return window.INFINITE_LENSE_AUTH || {};
}

function authIsConfigured() {
  const config = authConfig();
  return Boolean(config.domain && config.clientId && config.redirectUri);
}

function decodeTokenPayload(token) {
  try {
    const encoded = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(encoded));
  } catch { return {}; }
}

function currentIdToken() {
  const token = sessionStorage.getItem("il_id_token");
  if (!token) return "";
  const payload = decodeTokenPayload(token);
  if (!payload.exp || payload.exp * 1000 < Date.now() + 30_000) {
    sessionStorage.removeItem("il_id_token");
    return "";
  }
  return token;
}

function randomBase64Url(bytes = 32) {
  const values = crypto.getRandomValues(new Uint8Array(bytes));
  return btoa(String.fromCharCode(...values)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function sha256Base64Url(value) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return btoa(String.fromCharCode(...new Uint8Array(digest))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function beginLogin() {
  if (!authIsConfigured()) { showToast("Cognito is not configured yet."); return; }
  const config = authConfig();
  const verifier = randomBase64Url(48);
  const stateValue = randomBase64Url(24);
  sessionStorage.setItem("il_pkce_verifier", verifier);
  sessionStorage.setItem("il_oauth_state", stateValue);
  const challenge = await sha256Base64Url(verifier);
  const query = new URLSearchParams({
    response_type: "code", client_id: config.clientId, redirect_uri: config.redirectUri,
    scope: "openid email", state: stateValue, code_challenge: challenge, code_challenge_method: "S256"
  });
  location.assign(`${config.domain}/oauth2/authorize?${query}`);
}

async function finishLogin() {
  if (!authIsConfigured()) return;
  const query = new URLSearchParams(location.search);
  const code = query.get("code");
  if (!code) return;
  const returnedState = query.get("state");
  const savedState = sessionStorage.getItem("il_oauth_state");
  const verifier = sessionStorage.getItem("il_pkce_verifier");
  if (!returnedState || returnedState !== savedState || !verifier) throw new Error("The sign-in response could not be verified.");
  const config = authConfig();
  const tokenResponse = await fetch(`${config.domain}/oauth2/token`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "authorization_code", client_id: config.clientId, code, redirect_uri: config.redirectUri, code_verifier: verifier })
  });
  const tokens = await tokenResponse.json();
  if (!tokenResponse.ok || !tokens.id_token) throw new Error("Sign-in could not be completed.");
  sessionStorage.setItem("il_id_token", tokens.id_token);
  sessionStorage.removeItem("il_pkce_verifier");
  sessionStorage.removeItem("il_oauth_state");
  history.replaceState({}, document.title, location.pathname + location.hash);
}

function updateAuthButton() {
  const button = qs("#authButton");
  if (!button) return;
  if (!authIsConfigured()) {
    button.textContent = "Demo mode";
    button.disabled = true;
  } else if (currentIdToken()) {
    button.textContent = "Sign out";
    button.disabled = false;
  } else {
    button.textContent = "Sign in";
    button.disabled = false;
  }
}

qs("#authButton").addEventListener("click", async () => {
  if (!currentIdToken()) return beginLogin();
  const config = authConfig();
  sessionStorage.removeItem("il_id_token");
  const query = new URLSearchParams({ client_id: config.clientId, logout_uri: config.redirectUri });
  location.assign(`${config.domain}/logout?${query}`);
});

function showToast(message) {
  const toast = qs("#toast");
  qs("p", toast).textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 3200);
}

function setView(viewName, updateHash = true) {
  const target = qs("#view-" + viewName);
  if (!target) return;
  qsa(".view").forEach(view => view.classList.toggle("active", view === target));
  qsa("[data-view-link]").forEach(link => link.classList.toggle("active", link.dataset.viewLink === viewName && link.classList.contains("nav-item")));
  qs("#pageTitle").textContent = target.dataset.title || "InfiniteLense";
  if (updateHash) history.replaceState(null, "", "#" + viewName);
  window.scrollTo({ top: 0, behavior: "smooth" });
  qs("#sidebar").classList.remove("open");
  qs("#sidebarScrim").classList.remove("open");
}

qsa("[data-view-link]").forEach(link => link.addEventListener("click", event => {
  event.preventDefault();
  setView(link.dataset.viewLink);
}));

qs("#menuButton").addEventListener("click", () => {
  qs("#sidebar").classList.add("open");
  qs("#sidebarScrim").classList.add("open");
});
qs("#sidebarScrim").addEventListener("click", () => {
  qs("#sidebar").classList.remove("open");
  qs("#sidebarScrim").classList.remove("open");
});

function renderStandards() {
  const query = state.search.trim().toLowerCase();
  const filtered = standards.filter(item =>
    (state.activeSubject === "All" || item.subject === state.activeSubject) &&
    (!query || [item.title, item.detail, item.code, item.strand, item.subject].join(" ").toLowerCase().includes(query))
  );
  qs("#standardCount").textContent = filtered.length + (filtered.length === 1 ? " outcome" : " outcomes");
  qs("#standardList").innerHTML = filtered.length ? filtered.map(item => `
    <article class="standard-card">
      <div class="standard-code"><small>${item.subject} · ${item.strand}</small><strong>${item.code}</strong></div>
      <div class="standard-text"><h4>${item.title}</h4><p>${item.detail}</p></div>
      <span class="potential ${item.potential === "Medium" ? "medium" : ""}"><i></i>${item.potential} experiential potential</span>
    </article>`).join("") : '<div class="info-banner"><span>i</span><div><strong>No matching outcomes</strong><p>Try another search term or subject.</p></div></div>';
}

qsa("#subjectTabs button").forEach(button => button.addEventListener("click", () => {
  state.activeSubject = button.dataset.subject;
  qsa("#subjectTabs button").forEach(item => item.classList.toggle("active", item === button));
  renderStandards();
}));
qs("#standardSearch").addEventListener("input", event => { state.search = event.target.value; renderStandards(); });

function renderActivities() {
  qs("#activityCards").innerHTML = activities.slice(0, state.visibleActivities).map((activity, index) => {
    const approved = state.approved.has(activity.id);
    return `
      <article class="learning-card">
        <div class="learning-card-header"><span class="rank-badge">#${index + 1} ranked</span><span class="match-badge">${esc(activity.match)}% curriculum match</span><h3>${esc(activity.title)}</h3></div>
        <div class="learning-card-body">
          <p>${esc(activity.description)}</p>
          <div class="activity-meta"><span>${esc(activity.subject)}</span><span>${esc(activity.duration)}</span><span>${esc(activity.group)}</span></div>
          <div class="outcome-link"><span>${esc(activity.code)}</span><p>${esc(activity.outcome)}</p></div>
          <div class="learning-card-actions">
            <button class="button button-secondary" data-activity-details="${activity.id}">View plan</button>
            <button class="button ${approved ? "approved approve-button" : "button-primary approve-button"}" data-approve="${activity.id}">${approved ? "✓ Approved" : "Approve activity"}</button>
          </div>
        </div>
      </article>`;
  }).join("");
  qsa("[data-activity-details]").forEach(button => button.addEventListener("click", () => openActivity(button.dataset.activityDetails)));
  qsa("[data-approve]").forEach(button => button.addEventListener("click", () => {
    const id = button.dataset.approve;
    if (state.approved.has(id)) {
      showToast("This activity is already approved.");
      return;
    }
    state.approved.add(id);
    localStorage.setItem("il_approved", JSON.stringify([...state.approved]));
    renderActivities();
    showToast("Activity approved and added to the evidence workflow.");
  }));
}

function openActivity(id) {
  const activity = activities.find(item => item.id === id);
  if (!activity) return;
  qs("#activityModalContent").innerHTML = `
    <div class="activity-modal-hero"><span class="eyebrow">${esc(activity.match)}% CURRICULUM MATCH · ${esc(activity.setting.toUpperCase())}</span><h2 id="activityModalTitle">${esc(activity.title)}</h2><p>${esc(activity.description)}</p></div>
    <div class="detail-grid">
      <div class="detail-outcome"><span>MAPPED LEARNING OUTCOME · ${esc(activity.code)}</span><p>${esc(activity.outcome)}</p></div>
      <div class="detail-block"><h4>Materials</h4><ul>${activity.materials.map(item => "<li>" + esc(item) + "</li>").join("")}</ul></div>
      <div class="detail-block"><h4>Evidence of learning</h4><p>${esc(activity.evidence)}</p></div>
      <div class="detail-block"><h4>Student experience</h4><ol>${activity.steps.map(item => "<li>" + esc(item) + "</li>").join("")}</ol></div>
      <div class="detail-block"><h4>Safety & inclusion</h4><p>${esc(activity.safety)}</p></div>
    </div>
    <button class="button button-primary full" style="margin-top:16px" data-modal-approve="${activity.id}">${state.approved.has(activity.id) ? "✓ Teacher approved" : "Approve this activity"}</button>`;
  qs("#activityModal").classList.add("open");
  const approve = qs("[data-modal-approve]");
  approve.addEventListener("click", () => {
    state.approved.add(activity.id);
    localStorage.setItem("il_approved", JSON.stringify([...state.approved]));
    approve.textContent = "✓ Teacher approved";
    renderActivities();
    showToast("Activity approved and ready to assign.");
  });
}

function closeModals() { qsa(".modal").forEach(modal => modal.classList.remove("open")); }
qsa("[data-close-modal]").forEach(button => button.addEventListener("click", closeModals));
qsa(".modal").forEach(modal => modal.addEventListener("click", event => { if (event.target === modal) closeModals(); }));
document.addEventListener("keydown", event => { if (event.key === "Escape") closeModals(); });

qs("#openCurriculumModal").addEventListener("click", () => qs("#curriculumModal").classList.add("open"));
qs("#curriculumFile").addEventListener("change", event => {
  const file = event.target.files[0];
  if (file) qs("#curriculumFileLabel").textContent = file.name;
});
qs("#processCurriculum").addEventListener("click", () => {
  const file = qs("#curriculumFile").files[0];
  if (!file) { showToast("Choose a curriculum file first."); return; }
  closeModals();
  showToast(file.name + " was added to the administrator review queue.");
  qs("#curriculumFile").value = "";
  qs("#curriculumFileLabel").textContent = "Choose PDF, Word or CSV";
});

function setEnvironmentPreview(mode) {
  const dropzone = qs("#dropzone");
  dropzone.classList.remove("has-sample");
  if (mode === "sample") {
    dropzone.classList.add("has-sample");
  }
  state.environmentReady = mode === "image" || mode === "sample";
}

qs("#environmentFile").addEventListener("change", event => {
  const files = [...event.target.files].filter(file => file.type.startsWith("image/")).slice(0, 8);
  if (!files.length) return;
  state.environmentPhotos = files;
  qs("#photoPreviewGrid").innerHTML = "";
  files.forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = () => {
      const item = document.createElement("figure");
      item.innerHTML = `<img src="${reader.result}" alt="Environment view ${index + 1}"><figcaption>View ${index + 1}</figcaption>`;
      qs("#photoPreviewGrid").appendChild(item);
    };
    reader.readAsDataURL(file);
  });
  setEnvironmentPreview("image");
  showToast(`${files.length} environment ${files.length === 1 ? "photo" : "photos"} ready for combined analysis.`);
});
qs("#loadSample").addEventListener("click", () => { setEnvironmentPreview("sample"); showToast("Sample school garden loaded."); });

function compressImage(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => { image.src = reader.result; };
    image.onerror = reject;
    image.onload = () => {
      const maximum = 1200;
      const scale = Math.min(1, maximum / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(image.width * scale);
      canvas.height = Math.round(image.height * scale);
      canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", .76));
    };
    reader.readAsDataURL(file);
  });
}

function applyAIPlan(plan) {
  qs("#analysisResults .results-heading h3").textContent = plan.environment_summary;
  qs("#analysisResults .suitability-score span").textContent = plan.suitability_score;
  const lensCards = qsa("#analysisResults .lens-grid article");
  plan.lenses.forEach((lens, index) => {
    if (!lensCards[index]) return;
    qs("h4", lensCards[index]).textContent = lens.name;
    qs("p", lensCards[index]).textContent = `${lens.visible_evidence.join(" · ")} — ${lens.learning_possibilities.join(" · ")}`;
  });
  const strongest = plan.outcomes[0];
  if (strongest) {
    const evidence = qs("#analysisResults .evidence-link-panel p");
    evidence.textContent = `${strongest.code}: ${strongest.outcome} Visible evidence: ${strongest.visible_evidence}`;
    if (/^https:\/\//i.test(strongest.source_url)) {
      const source = document.createElement("a");
      source.href = strongest.source_url;
      source.target = "_blank";
      source.rel = "noreferrer";
      source.textContent = " Source ↗";
      evidence.appendChild(source);
    }
  }
  activities = plan.activities.map((activity, index) => ({
    id: `ai-${Date.now()}-${index}`, title: activity.title, match: activity.curriculum_match, status: "suggested",
    description: `Ranked for the visible environment and selected ${qs("#analysisSubject").value} outcomes.`,
    subject: qs("#analysisSubject").value + (activity.cross_curricular.length ? " + cross-curricular" : ""),
    duration: `${activity.duration_minutes} min`, group: activity.grouping, setting: qs("#environmentType").value,
    code: activity.outcome_codes.join(", "), outcome: plan.outcomes.filter(item => activity.outcome_codes.includes(item.code)).map(item => item.outcome).join(" ") || "Curriculum-linked experiential outcome",
    materials: activity.materials, steps: activity.steps, evidence: activity.evidence, safety: activity.safety.join(" ")
  }));
  state.visibleActivities = 3;
}

qs("#analyseButton").addEventListener("click", async () => {
  if (!state.environmentReady) { showToast("Add a photo or load the sample environment first."); return; }
  const hasFaces = confirm("Do any selected photographs contain identifiable student faces?\n\nChoose OK for yes or Cancel for no.");
  if (hasFaces && !qs("#faceConsent").checked) { showToast("Record consent before analysing photographs with identifiable faces."); return; }
  qs("#contextTitle").textContent = `${qs("#analysisCurriculum").value} · ${qs("#analysisGrade").value.split(" · ")[0]}`;
  qs("#contextSubject").textContent = qs("#analysisSubject").value + " + cross-curricular links";
  const button = qs("#analyseButton");
  button.classList.add("loading");
  qs("span", button).textContent = "Assessing environment";
  button.disabled = true;
  try {
    const apiUrl = window.INFINITE_LENSE_API_URL;
    if (apiUrl && state.environmentPhotos.length) {
      const idToken = currentIdToken();
      if (!idToken) { showToast("Sign in to run live AI analysis."); await beginLogin(); return; }
      const images = await Promise.all(state.environmentPhotos.map(compressImage));
      const result = await fetch(apiUrl, {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${idToken}` },
        body: JSON.stringify({
          images, curriculum: qs("#analysisCurriculum").value, grade: qs("#analysisGrade").value,
          subject: qs("#analysisSubject").value, studentCount: Number(qs("#groupSize").value),
          studentAges: qs("#studentAges").value, environmentType: qs("#environmentType").value,
          location: qs("#environmentLocation").value, notes: qs("#environmentNotes").value,
          facesDeclared: hasFaces, consentConfirmed: qs("#faceConsent").checked
        })
      });
      const payload = await result.json();
      if (!result.ok) throw new Error(payload.error || "Analysis failed.");
      applyAIPlan(payload.plan);
      showToast("Live AI curriculum analysis complete.");
    } else {
      await new Promise(resolve => setTimeout(resolve, 1150));
      showToast(apiUrl ? "The sample uses representative demo results." : "Demo analysis complete. Connect the AWS endpoint for live AI.");
    }
  } catch (error) {
    showToast(error.message || "The environment could not be analysed.");
    return;
  } finally {
    button.classList.remove("loading");
    qs("span", button).textContent = "Analysis complete";
    button.disabled = false;
  }
    qs("#analysisResults").classList.add("visible");
    qs("#analysisResults").scrollIntoView({ behavior: "smooth", block: "start" });
});

qs("#generateActivities").addEventListener("click", () => {
  state.visibleActivities = 3;
  renderActivities();
  setView("activities");
  showToast("Three best-fit activities ranked for this environment.");
});

qs("#generateMore").addEventListener("click", () => {
  state.visibleActivities = activities.length;
  renderActivities();
  qs("#generateMore").disabled = true;
  qs("#generateMore").textContent = "All suggestions shown";
  showToast("One additional cross-curricular activity generated.");
});

qs("#evidenceFile").addEventListener("change", event => {
  const files = [...event.target.files];
  if (!files.length) return;
  const label = event.target.closest(".evidence-drop");
  label.classList.add("has-file");
  qs("strong", label).textContent = files.length === 1 ? files[0].name : `${files.length} evidence files selected`;
  qs("small", label).textContent = "Photographs and video supported · selected locally";
});
qs("#saveEvidence").addEventListener("click", () => {
  if (!qs("#studentId").value.trim()) { showToast("Add a student ID or initials before saving."); return; }
  if (!qs("#studentObservation").value.trim()) { showToast("Add the student's observation before saving."); return; }
  state.evidence += 1;
  localStorage.setItem("il_evidence_count", String(state.evidence));
  qs("#evidenceMetric").textContent = state.evidence;
  qs("#studentId").value = "";
  qs("#studentObservation").value = "";
  qs("#teacherFeedback").value = "";
  qs("#evidenceFile").value = "";
  const label = qs(".evidence-drop");
  label.classList.remove("has-file");
  qs("strong", label).textContent = "Add photographs or video evidence";
  qs("small", label).textContent = "No file is uploaded in demo mode";
  showToast("Evidence saved in this browser for the demo.");
});

qs("#roleSelect").addEventListener("change", event => {
  const label = { teacher: "Teacher", admin: "School Admin", facilitator: "Facilitator" }[event.target.value];
  qs("#welcomeHeading").textContent = "Good afternoon, " + label;
  localStorage.setItem("il_role", event.target.value);
  showToast("Portal view changed to " + label + ".");
});

const savedRole = localStorage.getItem("il_role");
if (savedRole && qs('#roleSelect option[value="' + savedRole + '"]')) {
  qs("#roleSelect").value = savedRole;
  qs("#welcomeHeading").textContent = "Good afternoon, " + ({ teacher: "Teacher", admin: "School Admin", facilitator: "Facilitator" }[savedRole]);
}
try {
  const savedApproved = JSON.parse(localStorage.getItem("il_approved") || "[]");
  savedApproved.forEach(id => state.approved.add(id));
} catch {}
qs("#evidenceMetric").textContent = state.evidence;
finishLogin().then(() => { updateAuthButton(); if (currentIdToken()) showToast("Signed in securely."); }).catch(error => { updateAuthButton(); showToast(error.message); });
updateAuthButton();
renderStandards();
renderActivities();
setView((location.hash || "#dashboard").slice(1), false);
