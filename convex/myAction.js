import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

/**
 * ✅ INGEST: Stores PDF text embeddings in Convex
 */
export const ingest = action({
  args: {
    splitText: v.array(v.string()), // Ensure splitText is an array of strings
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("🔹 Ingesting File ID:", args.fileId);
    console.log("🔹 Text Chunks:", args.splitText);

    if (!args.splitText || args.splitText.length === 0) {
      console.error("❌ No text found to store.");
      return { success: false, message: "No text found for ingestion" };
    }

    // Ensure metadata is correctly structured
    const metadataArray = args.splitText.map(() => ({ fileId: args.fileId }));
    console.log("🔹 Metadata Array:", metadataArray);

    await ConvexVectorStore.fromTexts(
      args.splitText, // Array of text chunks
      metadataArray,  // Attach metadata with fileId properly
      new GoogleGenerativeAIEmbeddings({
        apiKey: "AIzaSyA_xmtQd5zXVX-n4y5bBkBwOBiVHFI0PUA",
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );

    console.log("✅ Ingested Successfully!");
    return { success: true, message: "Ingested successfully" };
  },
});

/**
 * ✅ SEARCH: Queries stored embeddings and returns relevant text
 */
export const search = action({
  args: {
    query: v.string(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("🔹 Searching Query:", args.query);
    console.log("🔹 File ID:", args.fileId);

    // Load existing embeddings from ConvexVectorStore
    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey: "AIzaSyA_xmtQd5zXVX-n4y5bBkBwOBiVHFI0PUA",
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );

    // Perform similarity search
    const results = await vectorStore.similaritySearch(args.query, 1); // Get top 5 matches
    console.log("🔹 Raw Results:", results);

    // Ensure metadata is accessed safely and id is valid
    const filteredResults = results
      .filter((q) => {
        const storedFileId = q.metadata?.fileId ? q.metadata.fileId.trim().toLowerCase() : null;
        const inputFileId = args.fileId.trim().toLowerCase();
        console.log("Comparing storedFileId:", storedFileId, "with inputFileId:", inputFileId);
        return storedFileId === inputFileId;
      })
      .map((doc) => ({
        ...doc,
        id: doc.id !== undefined ? doc.id : null, // Ensure id is never undefined
      }));

    console.log("✅ Filtered Results:", filteredResults);

    if (filteredResults.length === 0) {
      console.log("❌ No Matching Documents Found");
      return { success: false, message: "No matching documents found", data: [] };
    }

    return { success: true, data: filteredResults };
  },
});





































// import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
// import { action } from "./_generated/server.js";
// import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
// import { TaskType } from "@google/generative-ai";
// import { v } from "convex/values";

// export const ingest = action({
//   args: {
//     splitText:v.any(),
//     fileId:v.string(),
//   },
//   handler: async (ctx,args) => {
//     await ConvexVectorStore.fromTexts(
//      args.splitText, // array
//      args.fileId,// string
//       new GoogleGenerativeAIEmbeddings({
//         apiKey:'AIzaSyA_xmtQd5zXVX-n4y5bBkBwOBiVHFI0PUA',
//         model: "text-embedding-004", // 768 dimensions
//         taskType: TaskType.RETRIEVAL_DOCUMENT,
//         title: "Document title",
//       }),
//       { ctx }
//     );
//     return { success: true, message: "Ingested successfully" };
//   },
// });

// export const search = action({
//   args: {
//     query: v.string(),
//     fileId: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const vectorStore = new ConvexVectorStore (
//      new GoogleGenerativeAIEmbeddings({
//       apiKey:'AIzaSyA_xmtQd5zXVX-n4y5bBkBwOBiVHFI0PUA',
//       model: "text-embedding-004", // 768 dimensions
//       taskType: TaskType.RETRIEVAL_DOCUMENT,
//       title: "Document title",
//     }),
//        { ctx }
//       );

//       const results = await vectorStore.similaritySearch(args.query, 1);
//       const filteredResults = results.filter(q => q.metadata.fileId === args.fileId);
  
//       console.log("Filtered Results:", filteredResults);
  
//       if (filteredResults.length === 0) {
//         return { success: false, message: "No matching documents found", data: [] };
//       }
  
//       return { success: true, data: filteredResults };
//   },
// });