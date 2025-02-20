"use client";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { api } from "@/convex/_generated/api"
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useAction, useMutation } from "convex/react"
import { Loader2Icon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner";
import uuid4 from "uuid4";
  

// code to uplaod the file in conex backend 

const  Uploadpdf= ({children , isMaxFile})=> {
    const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl)
    const insertfile = useMutation(api.fileStorage.Addfile)
    const embeddDocument= useAction(api.myAction.ingest)
    const {user} = useUser();
    const [filename , setfilename]= useState();
    const [open , setopen]= useState(false);
    const getfileUrl = useMutation(api.fileStorage.getfileUrl)
    const [file, setfile] = useState();
    const [loding , setloding] = useState(false);
    const [error, setError] = useState(null);
    const onfileSelect = async (event)=>{
          setfile(event.target.files[0])
    }

    const onUpload = async () => {
      try {
        if (!file) {
          setError("Please select a file to upload.");
          return;
        }
        setloding(true);
        setError(null);
    
        // Get a short-lived upload URL
        const postUrl = await generateUploadUrl();
    
        // Upload file to the URL
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": file?.type },
          body: file,
        });
    
        if (!result.ok) {
          throw new Error("File upload failed. Please try again.");
        }
    
        const { storageId } = await result.json();
        console.log("Storage ID:", storageId);
        const fileId= uuid4();
        const fileUrlResponse = await getfileUrl({storageId: storageId})
      // Step 3: Save the newly allocated storage id to the database
        
         
         const response = await insertfile({
          fileId: fileId,
          fileName: filename??'Untitled file',
          storageId: storageId,
          fileUrl: fileUrlResponse.fileUrl, 
          createdBy:user?.primaryEmailAddress?.emailAddress,
          
         })
          console.log("response",response)

          // api call to get pdf 

          const apiresponse = await axios.get('/api/pdf-loder?pdfUrl='+fileUrlResponse.fileUrl);
          console.log(apiresponse.data.result)
        const embdeddresult=  embeddDocument({
              splitText:apiresponse.data.result,
              fileId,
          });
          console.log("embdeddresult",embdeddresult)
      
        setloding(false);
        setopen(false);
        toast("File is Uploaded Successfully!")
      
       

      } catch (err) {
        setError(err.message);
        setloding(false);
      
       
      }
    };
  

    return (
        <Dialog open={open}>
  <DialogTrigger asChild>
    <Button onClick={()=>setopen(true)} disabled={isMaxFile} className='w-full'>
      <span className="text-2xl">+</span> Upload PDF File
    </Button>
  </DialogTrigger>
  <DialogContent className='rounded-lg'>
    <DialogHeader>
      <DialogTitle >Upload PDF File</DialogTitle>
      <DialogDescription asChild>

         {/* first input field */}
       <div className="">
       <h2 className="font-bold mt-5 ">Select the file to Upload*</h2>
       <div className=" gap-4  border-2 border-line p-4 rounded-lg ">
       <input type="file" accept="application/pdf" onChange={(event)=>onfileSelect(event)} />

         {error && <p className="text-red-500">{error}</p>}

         
        </div>
        

        {/* second input field */}

        <div className="flex flex-col mt-4 gap-1">
            <label className="font-bold">File Name*</label>
            <input className="border-2 border-line p-3" type="text" placeholder="File Name"
             onChange={(e)=>setfilename(e.target.value)}/>
            {error && <p className="text-red-500">File Name is Needed</p>}
        </div>


        <div className="" >
            <Button onClick={onUpload} disabled={loding} className="bg-primary text-white p-3 rounded-lg mt-4 w-30px">
                       {loding ? <Loader2Icon className="animate-spin"/> : "Upload"}
                </Button>

                {/* // close button */}

                <Button onClick={()=>setopen(false)} className="bg-[#F5F5F5] text-black p-3 rounded-lg mt-4 ml-2 w-30px  hover:bg-white ">
                  Close
                </Button>

                
        </div>
       </div>

      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    )
}

export default Uploadpdf