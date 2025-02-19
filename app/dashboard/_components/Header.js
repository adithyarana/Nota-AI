import { UserButton } from "@clerk/nextjs";
import React from "react";

const Header = () => {
  return (
    <div className="p-5  w-full flex justify-end">
      <UserButton />
    </div>
  );
};

export default Header;
