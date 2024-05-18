import { auth, signOut } from "@/auth";
import Image from "next/image";
import { Redirect } from "next";
import { any } from "zod";
import React from "react";


async function doLogout() {
  try {
    await signOut({ redirectTo: '/' });
    console.log('User logged out successfully');
    // You can also add additional logic here, such as redirecting the user to another page.
  } catch (error) {
    console.error('Error logging out:', error);
    // Handle any errors that occurred during sign out
  }
}

export default  async function home(){

  const session=await auth();

  console.log(session);

  const handleLogout = async () => {
    await doLogout();
  };

  return(
    <>
    <div>

      {session?.user?.name}
      {session?.user?.email}

      <Image src={session?.user?.image} width={200} height={200} alt={session?.user?.name}/>



    </div>


    </>
  )
}