'use client';
import React, { useState } from "react";
import Sidebar from "../dashboard/_components/Sidebar.js";

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex overflow-hidden">
      {/* Sidebar Component */}
      <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />

      {/* Main Content */}
      <div className={`transition-all duration-300 flex-1 ${isOpen ? "ml-52 " : "ml-16"} p-4  `}>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
