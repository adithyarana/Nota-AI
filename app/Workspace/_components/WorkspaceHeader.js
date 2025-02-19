import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { SaveAll } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

function WorkspaceHeader({ fileName  }) {


  const handleSaveNotes = async () => {
    toast('Notes saved successfully')
  };


  return (
    <div className="flex justify-between items-center h-16  px-4 shadow-lg bg-[#e3f2fd]">
      {/* <div className='h-24 w-auto mt-2'> */}

      <Link href="/">
        <Image
          src={"/logoo.png"}
          alt="logo"
          width={100}
          height={100}
          className="h-full  w-auto object-contain"
        />
      </Link>

      <h2 className="font-bold text-xl sm:text-lg mr-10 md:text-1xl items-center p-2  text-center">
  {fileName}
</h2>


      <div className="flex items-center gap-4">
        <Button onClick={handleSaveNotes}  className="rounded-full">Save</Button>
        <UserButton />
      </div>
    </div>
  );
}

export default WorkspaceHeader;
