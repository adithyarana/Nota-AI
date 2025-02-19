import {v} from "convex/values";
import { mutation } from "./_generated/server";


export const  createUser= mutation({
    args:{
        userName: v.string(),
        email: v.string(),
        imageUrl: v.string(),
       
    },
    // id user already exist
    handler: async(ctx , args) => {
        const user =await ctx.db.query('users')
        .filter((q)=>q.eq(q.field('email'), args.email))
        .collect();



         // user not exist create new user

        if(user?.length==0){
          await ctx.db.insert('users', {
                email: args.email,
                userName: args.userName,
                imageUrl: args.imageUrl,
                upgrade: false
                
          });
           return {
               success: true,
               message: "User created successfully"
           }
        }

        return {
            success: false,
            message: "User already exist"
        }
    }

 

    
    
})

export const userupgrade=mutation({
     args:{
       email:v.string(),
       
     },
     handler: async(ctx , args) => {
      const result=  await ctx.db.query('users').filter(q=>q.eq(q.field('email'),args.email)).collect();
      
      if(result){
        await ctx.db.patch(result[0]._id,{upgrade:true});
        return {
            success: true,
            message: "User upgraded successfully"
        }

      }
      
      return {
            success: false,
            message: "User not found"
        }
    }
})