import PolicyChunk from "../models/PolicyChunk.js";
import { OpenAIEmbeddings } from "@langchain/openai";

/**
 * Embed a batch of texts using OpenAI embeddings
 */
export async function embedBatch(texts) {
  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-large"
  });
  const vectors = await embeddings.embedDocuments(texts);
  return vectors;
}

/**
 * Store chunks with embeddings into MongoDB
 */
export async function storeChunksWithEmbeddings({ userId, docId, chunks }) {
  const vectors = await embedBatch(chunks.map((c) => c.text));
  const docs = chunks.map((c, idx) => ({
    userId,
    docId,
    pageNumber: c.pageNumber,
    chunkIndex: c.chunkIndex,
    text: c.text,
    embedding: vectors[idx]
  }));
  // Bulk insert
  await PolicyChunk.insertMany(docs);
  return docs.length;
}

/**
 * Retrieve top-k relevant chunks for a query using cosine similarity in JS.
 * Note: This is a simple fallback that works without Atlas Vector Search index.
 */
export async function retrieveRelevantChunks({ userId, docId, query, k = 4 }) {
  const embeddings = new OpenAIEmbeddings({ model: "text-embedding-3-large" });
  const queryVector = await embeddings.embedQuery(query);

  const filter = { userId };
  if (docId) filter.docId = docId;

  const candidateChunks = await PolicyChunk.find(filter).lean();

  // Compute cosine similarity
  function cosineSim(a, b) {
    let dot = 0,
      na = 0,
      nb = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      na += a[i] * a[i];
      nb += b[i] * b[i];
    }
    return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-8);
  }

  const scored = candidateChunks.map((c) => ({
    ...c,
    score: cosineSim(queryVector, c.embedding || [])
  }));

  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, k);

  return top.map((c) => ({
    text: c.text,
    metadata: {
      pageNumber: c.pageNumber,
      chunkIndex: c.chunkIndex,
      docId: String(c.docId)
    }
  }));
}