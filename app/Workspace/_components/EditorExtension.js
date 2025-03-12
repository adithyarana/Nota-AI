"use client"
import { chatSession } from "@/configs/AIModle";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAction, useMutation } from "convex/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Download,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  Sparkles,
  Strikethrough,
  Underline,
} from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import {jsPDF} from "jspdf"
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";

function EditorExtension({ editor }) {
  if (!editor) return null;
  const { fileId } = useParams();
  const searchAi = useAction(api.myAction.search);
  const savenotes= useMutation(api.notes.AddNotes)
  const{user}=useUser();

  // logic for downloding the notes to local machine

    const downloadNotes= async()=>{
      if (!editor) return;

      const content = document.createElement("div");
      content.innerHTML = editor.getHTML();
      document.body.appendChild(content);
    
      // Convert HTML content to canvas
      const canvas = await html2canvas(content);
      const imgData = canvas.toDataURL("image/png");
    
      // Create a new PDF document
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190; // Width in mm (A4 size)
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
    
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("notes.pdf");
    
      document.body.removeChild(content);
      toast("Notes downloaded as PDF!");
    }


  // AI Answer Logic
  const onAction = async () => {
    toast("AI is working on...")

    const selectedtext = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      ' '
    );
    console.log("Selected text: " , selectedtext);

    try {
      const result = await searchAi({
        query: selectedtext,
        fileId: fileId,
      });

      // Formatting the AI answer for display in the editor
      // const unformattedans = result.data || [];
      const Answer = result.data.map((item) => item.pageContent).join("");

        // AI prompt formatting
        const PROMT = `Question: "${selectedtext}"  
        Using the provided content, generate a clear and concise answer in a short paragraph.  
        Ensure the response directly addresses the query with relevant information. 
        And the Bigger content in bullet points
        Reference Content:  
        ${Answer}`;

     
  
        const AimodleResult = await chatSession.sendMessage(PROMT);
        const aiText = await AimodleResult.response.text(); // Await response text
    
        console.log("AI Model Response:", aiText);

        // Convert AI's response into a list of bullet points
      const bulletPoints = aiText.split("\n").map(point => `<li>${point}</li>`).join('');
      const formattedAnswer = `<ul>${bulletPoints}</ul>`; 
      
      // Insert AI answer into the editor content
      const Alltext= editor.getHTML();
      editor.commands.setContent(`${Alltext}<p><strong>Answer:</strong> ${formattedAnswer}</p>`);

      // Save the notes to the database
      const notes = {
        fileId: fileId,
        notes: editor.getHTML(),
        createdBy:user?.primaryEmailAddress?.emailAddress
      };
      await savenotes(notes);
      


    } catch (error) {
      console.log('error calling searchAi', error);
      
    }
  };

  return (
    <div className="p-3 w-full">
      {/* Toolbar with responsive layout */}
      <div className="flex flex-wrap items-center gap-2 md:gap-4 bg-gray-100 p-2 rounded-lg shadow-md overflow-x-auto">
        {/* Headings */}
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`p-2 rounded-md ${editor.isActive("heading", { level: 1 }) ? "bg-blue-500 text-white" : "bg-white"}`}
        >
          <Heading1 />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`p-2 rounded-md ${editor.isActive("heading", { level: 2 }) ? "bg-blue-500 text-white" : "bg-white"}`}
        >
          <Heading2 />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`p-2 rounded-md ${editor.isActive("heading", { level: 3 }) ? "bg-blue-500 text-white" : "bg-white"}`}
        >
          <Heading3 />
        </button>

        {/* Formatting */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-md ${editor.isActive("bold") ? "bg-blue-500 text-white" : "bg-white"}`}
        >
          <Bold />
        </button>

        <button
          onClick={() => editor.chain().focus().setItalic().run()}
          className={`p-2 rounded-md ${editor.isActive("italic") ? "bg-blue-500 text-white" : "bg-white"}`}
        >
          <Italic />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded-md ${editor.isActive("underline") ? "bg-blue-500 text-white" : "bg-white"}`}
        >
          <Underline />
        </button>

        {/* Text Alignment */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`p-2 rounded-md ${editor.isActive({ textAlign: "left" }) ? "bg-blue-500 text-white" : "bg-white"}`}
        >
          <AlignLeft />
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`p-2 rounded-md ${editor.isActive({ textAlign: "center" }) ? "bg-blue-500 text-white" : "bg-white"}`}
        >
          <AlignCenter />
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`p-2 rounded-md ${editor.isActive({ textAlign: "right" }) ? "bg-blue-500 text-white" : "bg-white"}`}
        >
          <AlignRight />
        </button>

        {/* Highlight, Strike & Lists */}
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded-md ${editor.isActive("strike") ? "bg-blue-500 text-white" : "bg-white"}`}
        >
          <Strikethrough />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`p-2 rounded-md ${editor.isActive("highlight") ? "bg-blue-500 text-white" : "bg-white"}`}
        >
          <Highlighter />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-md ${editor.isActive("bulletList") ? "bg-blue-500 text-white" : "bg-white"}`}
        >
          <List />
        </button>

        {/* AI Action */}
        <button
          onClick={() => onAction()}
          className="p-2 rounded-md hover:bg-blue-200"
        >
          <Sparkles />
          <span className="text-sm mb-3">Ai</span>
        </button>

        <Button onClick={downloadNotes} className="cursor-pointer hover:opacity-80 bg-slate-500 ">
          <Download/>
        </Button>
      </div>
    </div>
  );
}

export default EditorExtension;
