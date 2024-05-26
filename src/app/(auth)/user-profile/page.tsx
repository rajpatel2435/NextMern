'use client'
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import { JwtPayload } from 'jwt-decode';
function page() {
    const [decodedToken, setDecodedToken] = useState<any>('');

    useEffect(() => {
      // Get the token from the cookie
      const token = Cookies.get('auth');
  
      if (token) {
        try {
          // Decode the JWT token
          const decoded : any = jwtDecode(token);

setDecodedToken(decoded.user);
        } catch (error) {
          console.error('Invalid token:', error);
        }
      }
    }, []); // Empty dependency array ensures this runs only once when the component mounts


    console.log(JSON.stringify(decodedToken))
  return (
    <>
    <div>{decodedToken.username}</div>
    <div>{decodedToken.verifyCode}</div>
    </>
  )
}

export default page

