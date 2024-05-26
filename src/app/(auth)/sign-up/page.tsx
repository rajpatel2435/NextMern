'use client'
import React, { useState } from 'react'
import * as Z from "zod"
import {useForm} from "react-hook-form"
import Link from 'next/link'
import { useDebounceValue } from 'usehooks-ts'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'


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

    const debouncedUsername= useDebounceValue(username,300);

    // to fire the message Ui
    const {toast}=useToast();
// snd user anywhere with the help of router userouter from navigation
    const router= useRouter();







  return (
    <div>page</div>
  )
}

export default page