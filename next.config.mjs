/** @type {import('next').NextConfig} */
const nextConfig = {

    eslint: {
        ignoreDuringBuilds: true, // Ignore linting during builds
      },
      typescript: {
        ignoreDevErrors: true,
        ignoreBuildErrors: true,
      },

    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'lh3.googleusercontent.com',
            },
        ],
    },
};



export default nextConfig;

