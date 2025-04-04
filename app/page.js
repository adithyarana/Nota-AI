"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { SignedIn, SignIn, SignUpButton } from "@clerk/clerk-react";
import {  SignedOut, SignInButton, SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeroSection from "./components/landingpage";





export default function Home() {

  // code for saving the user data in the convwx database

  const {user}= useUser();
  console.log("user",user);
 
  const createUser= useMutation(api.user.createUser);
  console.log("createUser",createUser);
  

  useEffect(()=>{
    if(user){
      checkuser();
    }
  },[user])


  const checkuser= async()=>{
    const result = await createUser({
      email:user?.primaryEmailAddress?.emailAddress,
      imageUrl:user?.imageUrl,
      userName:user?.fullName,
    
    })

    console.log("result",result);
    
  }


  return (

    // nav bar section 

    <>

<div className="flex justify-between items-center px-6 py-4 bg-white/30 backdrop-blur-lg shadow-md  border border-white/20">
  {/* Logo with hover effect */}
  <Link href="/" className="flex items-center space-x-2 group">
    <img
      src="/logoo.png"
      alt="Logo"
      className="h-16 w-auto transition-transform duration-300 group-hover:scale-110"
    />
  </Link>

  {/* Navigation Buttons */}
  <div className="flex items-center gap-4">
    <SignedOut>
      <SignInButton>
        <Button className="text-white bg-gradient-to-r from-blue-400 to-purple-400 rounded-full px-6 py-2 border border-transparent shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-pink-400 hover:to-yellow-400">
          Sign In
        </Button>
      </SignInButton>
    </SignedOut>

    <SignedOut>
      <SignUpButton>
        <Button className="text-white bg-gradient-to-r from-purple-400 to-blue-400 rounded-full px-6 py-2 border border-transparent shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-yellow-400 hover:to-pink-400">
          Sign Up
        </Button>
      </SignUpButton>
    </SignedOut>

    <SignedIn>
      <Link href="/dashboard" passHref>
        <Button asChild className="bg-blue-500 text-white px-6 py-2 rounded-full transition-transform duration-300 hover:scale-105 hover:bg-blue-700 shadow-md">
          <span>Dashboard</span>
        </Button>
      </Link>
      <UserButton afterSignOutUrl="/" />
    </SignedIn>
  </div>
</div>


  {/* Landing page section */}


  <HeroSection/>



  </>



 
  );
}
