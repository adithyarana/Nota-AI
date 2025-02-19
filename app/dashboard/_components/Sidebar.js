"use client";
import React, { useState } from "react";
import { Layout, Menu, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import Uploadpdf from "./Uploadpdf";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { usePathname } from "next/navigation";


const Sidebar = () => {
  const { user } = useUser();
 const path = usePathname();

  const filelist = useQuery(api.fileStorage.Getuserfiles, {
    email: user?.primaryEmailAddress?.emailAddress,
  });

  const [isOpen, setIsOpen] = useState(false);

  // toggle bar

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={`shadow-lg h-screen transition-all duration-300 ease-in-out bg-[#e3f2fd]   ${isOpen ? "w-64" : "w-16"}`}
    >
      <div
        className={`p-4 cursor-pointer flex items-center  ${isOpen ? "justify-start" : "justify-center"}`}
        onClick={toggleSidebar}
      >
        <Menu size={24} color="#555" className={isOpen ? "ml-1" : ""} />
      </div>

      {/* logo section */}

 <Link href={'/'}>
 <div
        className={`flex items-center justify-center  ${isOpen ? "block" : "hidden"}`}
      >
        <img
          src={"/logoo.png"} // Replace with your logo URL or path
          alt="Logo"
          className="transform transition-transform duration-300 ease-in-out hover:scale-110  hover:opacity-80 h-full"
        />
      </div>
 </Link>

      {/* Sidebar content */}

      {isOpen && (
        <div className="p-4">
          <Uploadpdf isMaxFile={filelist?.length >= 5 ? true : false}>
            <Button className="w-full mt-3 font-semibold">
              <span className="text-3xl">+</span>Upload Pdf
            </Button>
          </Uploadpdf>
        </div>
      )}

      <Link href={"/dashboard"}>
        <div className={`flex items-center gap-2 mt-10 p-5 hover:opacity-75 rounded-lg cursor-pointer ${path=='/dashboard' && 'bg-slate-400'}`}>
          <Layout />
          <span className={`${isOpen ? "block" : "hidden"} font-bold`}>
            Workspace
          </span>
        </div>
      </Link>

      <Link href={"/dashboard/upgrade"}>
        <div className={`flex items-center gap-2 mt-1 p-5 hover:opacity-75 rounded-lg cursor-pointer ${path=='/dashboard/upgrade' && 'bg-slate-400'}`}>
          <Shield />
          <span className={`${isOpen ? "block" : "hidden"} font-bold`}>
            Upgrade
          </span>
        </div>
      </Link>

      <div
        className={`absolute bottom-12 w-full p-5  ${isOpen ? "block" : "hidden"}`}
      >
        <Progress value={(filelist?.length / 5) * 100} />
        <p className="text-sm mt-1">{filelist?.length} out of 5 pdf Uploaded</p>

        <p className="text-sm text-gray-500 mt-2">Upgrade to Upload more PDF</p>
      </div>
    </div>
  );
};

export default Sidebar;
