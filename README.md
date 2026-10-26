# InfiniteLense

Investor-ready MVP for turning real environments into curriculum-linked experiential learning plans.

## Current MVP

- Curriculum, grade/year and subject selection
- One combined environment created from up to eight photographs
- Four visual analysis lenses
- Exact learning outcomes linked to visible evidence
- Three ranked activity suggestions plus **Generate more**
- Cross-curricular links, safety and inclusion guidance
- Recorded-consent control for identifiable student faces
- Student photo and video evidence workflow

The current analysis uses representative demo logic. A secure server-side OpenAI integration will be added after the portal workflow is validated. Never place `OPENAI_API_KEY` in browser code or commit it to GitHub.

## AWS Amplify

The included `amplify.yml` publishes the static portal from `dist/`.

## Live AI backend

The `backend/` directory contains an AWS SAM Lambda service that:

- Retrieves `OPENAI_API_KEY` from the `InfiniteLense/prod/openai` Secrets Manager secret
- Combines up to eight environment photographs into one analysis
- Uses the OpenAI Responses API with vision, web search and Structured Outputs
- Returns four lenses, verified curriculum links and exactly three ranked activities

Deploy from AWS CloudShell. During the guided questions, enter the exact Amplify URL for `PortalUrl` and a globally unique lowercase value such as `infinitelense-elmrad` for `CognitoDomainPrefix`:

```bash
git clone https://github.com/elmrad/InfiniteLense.git
cd InfiniteLense/backend
sam build
sam deploy --guided
```

The stack creates a Cognito user pool, hosted sign-in, JWT-protected HTTP API, Lambda function and least-privilege permission to read the OpenAI secret. Lambda concurrency is capped at two.

After deployment, copy the three stack outputs into `config.js`:

- `AnalysisApiUrl` → `window.INFINITE_LENSE_API_URL`
- `CognitoDomain` → `window.INFINITE_LENSE_AUTH.domain`
- `CognitoClientId` → `window.INFINITE_LENSE_AUTH.clientId`

Commit `config.js`; Amplify will redeploy automatically. These values are public configuration, not secrets. The OpenAI key must never appear in `config.js`.

Finally, create the first permitted teacher under **Amazon Cognito → User pools → InfiniteLense-Teachers → Users → Create user**. Public self-registration is disabled for the MVP.
