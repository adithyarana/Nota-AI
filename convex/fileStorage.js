import { mutation, query } from "./_generated/server";
import {v} from "convex/values";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const Addfile = mutation({
  args:{
    fileId:v.string(),
    storageId:v.string(),
    fileName:v.string(),
    createdBy:v.string(),
    fileUrl:v.string(),
  },
  handler: async (ctx, args) => {
      await ctx.db.insert('pdfFile', {
      fileId: args.fileId,
      storageId: args.storageId,
      fileName: args.fileName,
      createdBy: args.createdBy,
      fileUrl: args.fileUrl
    });
    return {
      success: true,
      message: "File uploaded successfully"
    }
  }


})



export const getfileUrl = mutation({
  args: {
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    const url = await ctx.storage.getUrl(args.storageId);
    return { fileUrl: url }; // ✅ Always return an object
  },
});
 
export const getfile = query({
  args: {
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const file = await ctx.db.query('pdfFile').filter((q) => q.eq(q.field('fileId'), args.fileId))
    .collect();
    return file[0];
  },
})

export const Getuserfiles = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.query('pdfFile')
    .filter((q) => q.eq(q.field('createdBy'), args.email))
    .collect();
    return result;
  },
})

// delete file



export const Deletefile = mutation({
  args: {
     fileId: v.id("pdfFile")
     }, 
  handler: async (ctx, args) => {
    await ctx.db.delete(args.fileId); // ✅ No need to specify "pdfFile", it's already validated
    return {
      success: true,
      message: "File deleted successfully",
    };
  },
});


