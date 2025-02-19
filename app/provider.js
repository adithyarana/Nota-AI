"use client";
import React from 'react'
import { ConvexProvider, ConvexReactClient } from "convex/react"
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

// this page is conection for the covex data base rap the children in the convex provider
function Provider({children}) {
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

  
    
  return (
   <>
    
  <ConvexProvider client={convex}> 
  <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
  {children}
  </PayPalScriptProvider>
    </ConvexProvider>
   </>
  )
}

export default Provider