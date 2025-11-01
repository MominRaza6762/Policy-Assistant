import { ChatOpenAI } from "@langchain/openai";
import { retrieveRelevantChunks } from "./vectorStore.js";

export async function askQuestion({ userId, query, docId, k = 4, modelName = "gpt-4o-mini" }) {
  const contextChunks = await retrieveRelevantChunks({ userId, docId, query, k });

  const contextText = contextChunks
    .map(
      (c, idx) =>
        `Source ${idx + 1} (p.${c.metadata.pageNumber}):\n${c.text}`
    )
    .join("\n\n");

  const citations = contextChunks.map((c, idx) => ({
    source: idx + 1,
    pageNumber: c.metadata.pageNumber,
    chunkIndex: c.metadata.chunkIndex
  }));

  const systemInstruction = `
You are a strict compliance assistant. Answer ONLY using the provided sources from the company's policy documents.
- If the answer is not in the sources, say you don't have enough information.
- Keep the answer concise (2-5 sentences).
- Do not hallucinate. Provide short citation notes referencing page numbers where applicable.
`;

  const userPrompt = `
User question:
${query}

Sources:
${contextText}

Return the answer first. At the end, add a "Citations" line listing relevant page numbers, e.g., "Citations: p.3, p.7".
`;

  const model = new ChatOpenAI({
    temperature: 0.2,
    modelName,
    openAIApiKey: process.env.OPENAI_API_KEY
  });

  const response = await model.invoke([
    { role: "system", content: systemInstruction.trim() },
    { role: "user", content: userPrompt.trim() }
  ]);

  return {
    answer: response?.content ?? "",
    citations
  };
}
