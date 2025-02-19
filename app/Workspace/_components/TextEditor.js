

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import EditorExtension from "./EditorExtension";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import Italic from '@tiptap/extension-italic'
import BulletList from '@tiptap/extension-bullet-list'
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function TextEditor({fileId}) {

  const notes=useQuery(api.notes.Getnotes,{
    fileId:fileId
  })

  
  const editor = useEditor({
    extensions: [StarterKit,
        Placeholder.configure({
            placeholder:'Start Taking Notes here...'
        }),
        TextAlign.configure({
         types:['heading', 'paragraph']
        }),
        Highlight.configure({
          multicolor:true
        }),
        Underline,
        Italic,
        BulletList
        
        
         
    ],
    editorProps:{
        attributes:{
            class:'focus:outline-none h-screen p-5'
        }
    }
  });

  useEffect(()=>{
   
      editor&&editor.commands.setContent(notes)
    
  },[notes&&editor])

 

  return (

    <div>
       <EditorExtension editor={editor} className=''/>
        <div className="overflow-scroll h-[88vh]">
        <EditorContent editor={editor}/>
        
        </div>
    </div>
  )
}

export default TextEditor;
