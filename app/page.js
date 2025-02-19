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

    <div className="flex justify-between items-center   bg-white-300/60 backdrop-blur-md rounded m-2">
    {/* Logo with hover effect */}
    <Link href="/" className="flex items-center space-x-2 group">
    <img
          src={"/logoo.png"} 
          alt="Logo"
          className="h-24 w-full transition-transform duration-300 group-hover:scale-110"
        />
      
    </Link>

    <div className="flex items-center space-x-4">
      <SignedOut>
        <SignInButton>
          <Button className="text-white bg-black rounded-full px-4 py-2 border  transition-transform duration-300 hover:scale-105 hover:bg-gray-900">
           Get Started
          </Button>
        </SignInButton>
      </SignedOut>

      <SignedOut>
        <SignUpButton>
          <Button className="text-black bg-blue-200 rounded-full px-4 py-2 border  transition-transform duration-300 hover:scale-105 hover:bg-pink-100">
            Sign up
          </Button>
        </SignUpButton>
      </SignedOut>

      <SignedIn >
        <Link href="/dashboard" passHref>
          <Button asChild className="bg-blue-400 text-white px-4 py-2  rounded-full transition-transform duration-300 hover:scale-105 hover:bg-blue-700">
            <span>Dashboard</span>
          </Button>
        </Link>
        <UserButton  afterSignOutUrl="/" />
      </SignedIn>
    </div>

  </div>

  {/* Landing page section */}


  <HeroSection/>



  </>
 

 
  );
}
