'use client'
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { verifySchema } from '@/schemas/verifySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import * as  z from 'zod'

function VerifyAccount() {

const { toast } = useToast()
const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
            code: ''
        }
    });

    const methods = useForm();
    const router = useRouter();
    // grab params from url
    const params = useParams<{ username: string }>();

    
const onsubmit=async (data: z.infer< typeof verifySchema>)=>{
    console.log(data);

    try {
        const response= await axios.post('/api/verify-code', {
            username: params.username,
            code:data.code
        });

        console.log(response);

        toast({
            title: "success",
            description:response.data.message
        })


    } catch (error) {
        console.log("errors from errorrorororrr")
const axiosError : any= error ;
        toast({
            title: "failure",
            description:axiosError.response?.data.message
        })
    }
}

    console.log(params.username);
    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>

            <div className='w-full max-w-md p-8 space-y-8 rounded-lg bg-white'>
                <h1 className='text-2xl font-bold text-center'>Verify Your Code</h1>
                <FormProvider {...methods}>

                    <form method='post' onSubmit={form.handleSubmit(onsubmit)}>
                        {/* make form field  */}


                        {/* code */}


                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>code</FormLabel>
                                    <FormControl>
                                        <Input

                                            placeholder="Code"
                                            {...field}

                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type='submit' className='mt-10 w-full' disabled={isSubmitting}>
                            {
                                isSubmitting ? (<>
                                    <Loader2 />
                                </>) : ('Submit')
                            }

                        </Button>

                    </form>
                </FormProvider>
            </div></div>
    )
}

export default VerifyAccount