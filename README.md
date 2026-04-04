# Shadowing Prompter

A personal English-learning app built entirely with AI assistance — from data pipeline to frontend.

## The Mindset

Every step of this project was built by describing a problem to an AI and iterating on the output. The goal was to move fast: define the problem clearly, give the AI what it needs to know, and treat the output as a strong first draft to refine.

---

## Step 1 — Source Material

On a daily basis I collect short (~30s) English video clips for a YouTube study series. Each clip has a corresponding audio file and a hand-written English transcript. These two artifacts — audio + transcript — are the raw inputs to everything that follows.

---

## Step 2 — AI-Powered Chinese Translation (Gemini API)

**Key setup before prompting Copilot:**

- Create a project in [Google AI Studio](https://aistudio.google.com) and generate an API key.
- Check the free-tier rate limits upfront — specifically **RPD (requests per day = 20)** and **RPM (requests per minute = 5)** for `gemini-2.5-flash`. Sharing these constraints explicitly with Copilot matters, because they directly influence architecture decisions like batch size and sleep intervals.

## **Prompt engineering note:** Provide Copilot with the model name, the API key setup, the rate limits, and the desired output format (English + Chinese pairs), and ask it to write a script that batches requests to stay within the free-tier envelope.

## Step 3 — Plain Text to JSON

Raw transcripts come out of my workflow as plain `.txt` files. Before any AI processing can happen, the data needs structure.

Ask Copilot to write a transformation script: parse the text file, add episode number and extract transcript content, and output a clean JSON array. The prompt was intentionally minimal — describe input format, describe desired output schema, let Copilot figure out the parsing logic.

---

## Step 4 — Enriching `data.json` with AI (Batch Pipeline)

With structured JSON in hand, the next step was to enrich each episode: split the English transcript into natural shadowing lines, insert breath-pause markers, highlight key vocabulary with color-coded spans, and generate idiomatic Chinese translations per line.

The prompt I gave Gemini spelled out:

- The exact input/output JSON schema
- Line-splitting rules (5–8 lines, full word coverage)
- Pause insertion conventions (`/` at clause boundaries)
- A cycling color system for vocabulary highlights (`hl-blue → hl-green → hl-orange → hl-purple → repeat`)
- A strict contract: the concatenated English lines, after stripping all markup, must reproduce the original transcript verbatim

Provide Copilot with the batch structure and rate limits so it could wire up the batching, sleep logic, validation, and incremental save.

---

## Step 5 — Frontend App (HTML + CSS + JS)

The final step was a browser-based shadowing player: navigate episodes, read line-by-line with highlights, listen to audio.

Ask Copilot to build a single-page app with pure HTML, CSS, and JavaScript — using `data.json` as its only data source. The result is a self-contained folder that works by opening `index.html` directly.

---

## Step 6 — Push to GitHub and Publish with GitHub Pages

Create a new GitHub repository, push the `Shadowing Prompter/` folder as the repo root, then enable **GitHub Pages** from the repository settings — pointing it at the `main` branch root. No build step, no CI/CD, no server. The app is live at a public URL within seconds.

---

## Key Takeaways

- **Give AI the constraints, not just the goal.** Rate limits, schema contracts, encoding requirements — the more context, the less back-and-forth.
- **Prompt for a pipeline, not a snippet.** Asking for a script that handles batching, error recovery, and incremental saves from the start is better than patching a naive script later.
- **Prepare the data in a proper format.** A flat JSON array of episodes made every downstream step — AI enrichment, frontend rendering, and manual inspection — straightforward.
