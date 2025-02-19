"use client";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Delete, Trash, Trash2 } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const { user } = useUser();
 

  const filelist = useQuery(api.fileStorage.Getuserfiles, {
    email: user?.primaryEmailAddress?.emailAddress,
  });

  const deletenotes= useMutation(api.fileStorage.Deletefile)

  const handledelete= async(fileId)=>{
    try {
     await deletenotes({fileId});
     toast('file deleted successfully!')
      
    } catch (error) {
      console.log('error deleting the file', error);
      
    }
  }

  const isLoading = filelist === undefined;
  const hasFiles = filelist?.length > 0;


  return (
    <div className="p-10 select-none "> 
      {/* Header Section */}
      <h2 className="text-3xl font-semibold text-gray-800 hover:opacity-70 transition-opacity duration-200">
        📂 Dashboard
      </h2>

      {/* Files Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2  p-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ">
        {isLoading
          ? // Loading skeleton effect
            Array(5)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-300 rounded-md h-[150px] animate-pulse"
                ></div>
              ))
          : hasFiles
          ? // Display files if available
          filelist.map((file) => (
            <div key={file.fileId} className="relative p-5 bg-white shadow-md rounded-xl flex flex-col items-center justify-center border hover:shadow-lg cursor-pointer h-40 min-h-[160px]">
              {/* Delete Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevents triggering the link click
                  handledelete(file._id);
                }}
                className="absolute  text-red-600 top-2 right-2 hover:opacity-80  p-1 rounded-full"
              >
                <Trash2 size={20} />
              </button>

              {/* File Link */}
              <Link href={'/Workspace/' + file.fileId} className="flex flex-col items-center">
                <Image src="/pdf.png" alt="file" width={50} height={50} />
                <h2 className="font-medium text-gray-700 mt-2 text-center text-sm break-words w-full line-clamp-2">
                  {file?.fileName}
                </h2>
              </Link>
            </div>
          ))
          
          : // Show "No Files Found" if empty
            null}
      </div>

      {/* If no files exist, show message */}
      {!isLoading && !hasFiles && (
        <div className="flex items-center justify-center h-[50vh]">
          <h1 className="text-3xl font-semibold text-gray-800">
            📂 No Files Found
          </h1>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
