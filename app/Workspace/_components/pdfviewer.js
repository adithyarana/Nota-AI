function Pdfviewer({ fileUrl }) {
  if (!fileUrl) return <p className="text-center text-gray-500">Loading PDF...</p>;

  console.log("PDF URL:", fileUrl); // Debugging file URL

  return (
    <div className="w-full h-screen sm:h-[600px] md:h-[800px]">
      {/* Primary iFrame Viewer */}
      <iframe
        title="PDF Viewer"
        width="100%"
        height="100%"
        src={`${fileUrl}#toolbar=0`}
        className="hidden sm:block"
        onError={(e) => console.error("Error loading PDF in iframe:", e)}
      />

      {/* Fallback Embed Viewer */}
      <embed
        src={fileUrl}
        type="application/pdf"
        width="100%"
        height="100%"
        className="block sm:hidden"
      />

      {/* Download Link as Last Resort */}
      <p className="text-center text-gray-600 mt-4">
        If the PDF does not load, you can <a href={fileUrl} className="text-blue-500 underline">download it here</a>.
      </p>
    </div>
  );
}

export default Pdfviewer;
