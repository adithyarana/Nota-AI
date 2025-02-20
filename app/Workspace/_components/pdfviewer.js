// function Pdfviewer({fileUrl}) {
//     console.log("file", fileUrl);
    
//   return (
//     <div  className="w-full h-screen sm:h-[600px] md:h-[800px]   ">
//         <iframe title="PDF Viewer" width="100%" height="1000" src={fileUrl+"#toolbar=0"}></iframe>
//     </div>
//   )
// }

// export default Pdfviewer


function Pdfviewer({ fileUrl }) {
  // Prevent rendering if fileUrl is missing
  if (!fileUrl) return <p className="text-center text-gray-500">Loading PDF...</p>;

  return (
    <div className="w-full h-screen sm:h-[600px] md:h-[800px]">
      {/* Primary Embed Viewer for Better Mobile Support */}
      <embed
        src={fileUrl}
        width="100%"
        height="1000px"
        type="application/pdf"
        className=" sm:block"
      />

      {/* Fallback iFrame for Desktop */}
      <iframe
        title="PDF Viewer"
        width="100%"
        height="1000"
        src={`${fileUrl}#toolbar=0&page=1`}
        className=" sm:block"
      />
    </div>
  );
}

export default Pdfviewer;

