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

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user } = useUser();
  const path = usePathname();
  const filelist = useQuery(api.fileStorage.Getuserfiles, {
    email: user?.primaryEmailAddress?.emailAddress,
  });

  return (
    <div
      className={`shadow-lg h-screen fixed left-0 top-0 transition-all duration-300 ease-in-out bg-[#e3f2fd] ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Sidebar Toggle Button */}
      <div
        className={`p-4 cursor-pointer flex items-center ${
          isOpen ? "justify-start" : "justify-center"
        }`}
        onClick={toggleSidebar}
      >
        <Menu size={24} color="#555" />
      </div>

      {/* Logo Section */}
      <Link href={"/"}>
        <div
          className={`flex items-center justify-center mb-3 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <img
            src={"/logoo.png"}
            alt="Logo"
            className="h-32 w-full transition-transform duration-300 hover:scale-110 hover:opacity-80"
          />
        </div>
      </Link>

      {/* Sidebar Content */}
      {isOpen && (
        <div className="p-4">
          <Uploadpdf isMaxFile={filelist?.length >= 5}>
            <Button className="w-full mt-3 font-semibold flex items-center gap-2">
              <span className="text-2xl">+</span> Upload PDF
            </Button>
          </Uploadpdf>
        </div>
      )}

      {/* Navigation Links */}
      <Link href={"/dashboard"}>
        <div
          className={`flex items-center gap-2 mt-10 p-5 hover:opacity-75 rounded-lg cursor-pointer ${
            path === "/dashboard" && "bg-slate-400"
          }`}
        >
          <Layout />
          <span className={`${isOpen ? "block" : "hidden"} font-bold`}>
            Workspace
          </span>
        </div>
      </Link>

      <Link href={"/dashboard/upgrade"}>
        <div
          className={`flex items-center gap-2 mt-1 p-5 hover:opacity-75 rounded-lg cursor-pointer ${
            path === "/dashboard/upgrade" && "bg-slate-400"
          }`}
        >
          <Shield />
          <span className={`${isOpen ? "block" : "hidden"} font-bold`}>
            Upgrade
          </span>
        </div>
      </Link>

      {/* Storage Progress */}
      {isOpen && (
        <div className="absolute bottom-12 w-full p-5">
          <Progress value={(filelist?.length / 5) * 100} />
          <p className="text-sm mt-1">{filelist?.length} out of 5 PDFs uploaded</p>
          <p className="text-sm text-gray-500 mt-2">
            Upgrade to upload more PDFs
          </p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
