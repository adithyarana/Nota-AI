import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function GET(req){
    
  const reqUrl = req.url;
  const {searchParams}= new URL(reqUrl);
  const pdfurl = searchParams.get('pdfUrl');
  console.log(pdfurl);
  
    const response = await fetch(pdfurl)
    const data = await response.blob();
    const loader = new WebPDFLoader(data)
    const docs = await loader.load()

    let pdftext=''
 docs.forEach((doc)=>{
     pdftext= pdftext+doc.pageContent;
 })

 // split the text 
 
 const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 20,
  });
  const texts = await textSplitter.splitText(pdftext);

    return NextResponse.json({result:texts})
}