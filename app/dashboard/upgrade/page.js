"use client";
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useMutation } from 'convex/react';
import React from 'react';

function Upgrade() {

  const upgradeplane = useMutation(api.user.userupgrade)
 const {user} = useUser();

 
  const onpaymentcomplete= async()=>{
    // Your payment complete code here
   const result= await upgradeplane({email:user?.primaryEmailAddress?.emailAddress});
    toast.success('Your plan has been upgraded successfully!');

  }

  return (
    <div className=" py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-semibold text-center text-gray-900 mb-4">Plans</h2>
      <p className="text-md text-center text-gray-600 mb-12 ml-3">Update your plan to upload multiple PDFs and create your notes 👇</p>

      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 ml-4 lg:px-8">
  <div className="flex flex-col gap-y-6"> {/* Ensure cards stack properly */}
    
    {/* Free Plan */}
    <div className="rounded-xl border border-gray-300 p-6 shadow-lg bg-white transform hover:scale-105 transition-all duration-300">
      <div className="text-center">
        <h2 className="text-lg font-medium text-gray-900">Free Plan</h2>
        <p className="mt-4">
          <strong className="text-3xl font-bold text-gray-900">0₹</strong>
          <span className="text-sm font-medium text-gray-700">/month</span>
        </p>
      </div>
      <ul className="mt-6 space-y-3">
        <li className="flex items-center gap-2 text-gray-700">
          ✅ 5 PDFs allowed
        </li>
        <li className="flex items-center gap-2 text-gray-700">
          ✅ Basic support
        </li>
        <li className="flex items-center gap-2 text-gray-700">
          ✅ Help center access
        </li>
      </ul>
      <a href="/dashboard" className="mt-8 block rounded-full bg-indigo-600 text-white text-sm font-medium text-center px-12 py-3 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700">
        Current Plan
      </a>
    </div>

    {/* Paid Plan */}
    <div className="rounded-xl border border-gray-300 p-6 shadow-lg bg-white transform hover:scale-105 transition-all duration-300">
      <div className="text-center">
        <h2 className="text-lg font-medium text-gray-900">Starter Plan</h2>
        <p className="mt-4">
          <strong className="text-3xl font-bold text-gray-900">10₹</strong>
          <span className="text-sm font-medium text-gray-700">/One time</span>
        </p>
      </div>
      <ul className="mt-6 space-y-3">
        <li className="flex items-center gap-2 text-gray-700">
          ✅ Unlimited PDFs
        </li>
        <li className="flex items-center gap-2 text-gray-700">
          ✅ 5GB of storage
        </li>
        <li className="flex items-center gap-2 text-gray-700">
          ✅ Priority support
        </li>
        <li className="flex items-center gap-2 text-gray-700">
          ✅ Help center access
        </li>
      </ul>
      <div className='mt-5 flex justify-center'>
        <PayPalButtons
          onApprove={() => onpaymentcomplete()}
          onCancel={() => console.log('Payment canceled')}
          createOrder={(data, action) => {
            return action?.order?.create({
              purchase_units: [{
                amount: {
                  value: '10.00',
                  currency_code: 'USD',
                },
              }],
            });
          }}
        />
      </div>
    </div>

  </div>
</div>

    </div>
  );
}

export default Upgrade;
