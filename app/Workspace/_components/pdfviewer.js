function Pdfviewer({fileUrl}) {
    console.log("file", fileUrl);
    
  return (
    <div  className="w-full h-screen sm:h-[600px] md:h-[800px]   ">
        <iframe title="PDF Viewer" width="100%" height="1000" src={fileUrl+"#toolbar=0"}></iframe>
    </div>
  )
}

export default Pdfviewer