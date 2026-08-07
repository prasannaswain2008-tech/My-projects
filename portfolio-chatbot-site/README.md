# Portfolio Chatbot Site

A React/Vite portfolio with two server-backed AI experiences:

- a manuals assistant powered by the OpenAI Responses API
- a technical-writing assistant powered by Gemini

API keys remain on the Express server and are never exposed through Vite client variables.

## Run locally

Prerequisites: Node.js and pnpm.

1. Copy `.env.example` to `.env.local`.
2. Set `OPENAI_API_KEY` and `GEMINI_API_KEY` in `.env.local`.
3. Install dependencies and start the development server:

   ```shell
   pnpm install
   pnpm dev
   ```

4. Open `http://localhost:3000`.

The optional `CHAT_MODEL` variable defaults to `gpt-4.1-mini`.

## Validate and run in production

```shell
pnpm lint
pnpm build
pnpm start
```

Set `NODE_ENV=production` when starting the deployed service. The server reads `PORT`, defaulting to `3000`.
