import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";


/**
 * Loads a PDF file and returns an array of { pageContent, metadata: { pageNumber } }
 */
export async function loadPDF(filePath) {
  const loader = new PDFLoader(filePath, { splitPages: true });
  const docs = await loader.load();
  // Normalize metadata
  return docs.map((d, i) => {
    const pageNumber =
      d.metadata?.loc?.pageNumber ??
      d.metadata?.pageNumber ??
      d.metadata?.pdf?.pageNumber ??
      i + 1;
    return {
      pageContent: d.pageContent,
      metadata: { pageNumber }
    };
  });
}