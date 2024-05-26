'use client'
import React, { useEffect, useState } from 'react'
import * as Z from "zod"
import { useForm, FormProvider, useFormContext,Form } from "react-hook-form"
import Link from 'next/link'
import { useDebounceValue } from 'usehooks-ts'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { signUpSchema } from '@/schemas/signUpSchema'
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from 'axios';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'




function page() {
  
    // defining the state
    const [username,setUsername]= useState('');
    const [usernameMessage,setUsernameMessage] =useState('');
    const [isCheckingUsername,setIsCheckingUsername] =useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    //  why debounce?
    //  to reducve the backend call means whebnver user change the value in username field
    //  it directly request to backend server
// debounce add the 300 delay before sending to server

const [debouncedValueUsername, setUsernameValue] = useDebounceValue(username, 1000)


    // to fire the message Ui
    const {toast}=useToast();
// snd user anywhere with the help of router userouter from navigation
    const router= useRouter();


    // zod implementaion 
    // infer => whta type of value it gets
    // means getting value from resolver should match with signUpSchema
const form = useForm<Z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues:{
        username: '',
        email :'',
        password:''
    }
});

useEffect(()=>{

    const checkUsername= async ()=>{
        if(debouncedValueUsername){
            setIsCheckingUsername(true);
            // make sure we dont have any error message for user
            setUsernameMessage('');

            try{

                const response= await axios.get(`/api/check-username/?username=${debouncedValueUsername}`);
   console.log(response);
console.log("checking username")
                console.log(response);

            }catch(error){
                const axiosError= error as AxiosError;
                console.error("fetch the error from"+ axiosError);

                
            }finally{
                setIsCheckingUsername(false);
            }
        }
    }

    checkUsername();
},[debouncedValueUsername]);

const methods = useForm()
;
const onsubmit=async (data: Z.infer< typeof signUpSchema>)=>{
    console.log(data);

    try {
        const response= await axios.post('api/sign-up', data);

        console.log(response);
        toast({
            title: "success",
            description:response.data.message
        })

        router.replace(`verify/${username}`)
        setIsSubmitting(false);
    } catch (error) {
        
    }
}

  return (

<div className='flex justify-center items-center min-h-screen bg-gray-100'>

    <div className='w-full max-w-md p-8 space-y-8 rounded-lg bg-white'>


    <FormProvider {...methods}>

            <form method='post' onSubmit={form.handleSubmit(onsubmit)}>
{/* make form field  */}
            <FormField
  control={form.control}
  name="username"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Username</FormLabel>
      <FormControl>
        <Input 
        placeholder="Username" 
        {...field}
        onChange={(e)=>{
            field.onChange(e)
            setUsername(e.target.value)
        }}
         />
      </FormControl>

      <FormMessage />
    </FormItem>
  )}
/>


{/* email */}


<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input 
        placeholder="Email" 
        {...field}
       
         />
      </FormControl>

      <FormMessage />
    </FormItem>
  )}
/>



<FormField
  control={form.control}
  name="password"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Password</FormLabel>
      <FormControl>
        <Input 
        type='password'
        placeholder="Password" 
        {...field}
       
         />
      </FormControl>

      <FormMessage />
    </FormItem>
  )}
/>

<Button type='submit' className='mt-10 w-full' disabled={isSubmitting }>
    {
        isSubmitting? (<>
        <Loader2/>
        </>) : ('SignUp')
    }
   
</Button>

            </form>
            </FormProvider>
</div>

            </div>

  )
}

export default page