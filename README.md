# AgentPay Guardian

AgentPay Guardian protects AI agent payments with verified identity, compliance checks, and transparent audit trails.

## Demo Flow

Start Demo -> Verify Agent -> Request Payment -> Run Compliance Check -> Authorize Payment -> View Audit Trail

Use the **Run Full Demo** button to execute the whole flow automatically:

1. Generate A-Pass
2. Record payment request
3. Check A-Token rules
4. Check A-Token paused status
5. Run validator compliance
6. Authorize payment
7. Write audit trail

## Real vs Demo

- A-Pass: real Cleanverse API route when credentials exist
- A-Token rules: real Cleanverse API route when credentials exist
- A-Token paused status: real Cleanverse API route when credentials exist
- Validator verify: real Cleanverse API route when credentials and contract data exist
- Audit trail: demo memory by default, optional persistent KV storage
- Monad transaction receipt: simulated record for the hackathon demo

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open:

```text
http://127.0.0.1:3000
```

## Environment Variables

Required for live Cleanverse calls:

```env
CLEANVERSE_API_ID=your_api_id_here
CLEANVERSE_API_KEY=your_api_key_here
CLEANVERSE_BASE_URL=https://uatapi.cleanverse.com/api/cooperate
CLEANVERSE_APP_ID=APP20260614112550LIDZXM
```

Optional for persistent audit logs on Vercel or another hosted environment:

```env
KV_REST_API_URL=your_vercel_kv_or_upstash_rest_url_here
KV_REST_API_TOKEN=your_vercel_kv_or_upstash_rest_token_here
AGENTPAY_AUDIT_KEY=agentpay_guardian_audit
```

If the KV variables are missing, the audit trail falls back to server memory. That is fine for local demos but can reset on serverless deployments.

## Vercel Deployment

1. Import the GitHub repo into Vercel.
2. Add the Cleanverse environment variables.
3. Add the optional KV variables if you want persistent audit logs.
4. Deploy.

Build command:

```bash
npm run build
```

## Judge Demo Script

1. Open the landing page.
2. Click **Run Full Demo**.
3. Review the audit trail.
4. Open the receipt page.
5. Show the compliance checklist and failure simulation on the compliance page.

## Verification

```bash
npm run lint
npm run build
```
