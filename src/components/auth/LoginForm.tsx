/* eslint-disable react/no-unescaped-entities */
'use client'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'

const LoginForm = () => {

    const router = useRouter()

    const [eye, setEye] = useState(false)

    const email = useRef('')

    const password = useRef('')

    const loginUser = async (e: any) => {
        
        e.preventDefault();

        if (!email || !password) return alert('Fill up the form!');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: { email: email.current, password: password.current },
                }),
            });

            const data = await response.json();

            if (response.status === 200 && data.status.code === 200) {

                const user = {
                    name: data.status.data.user.name,
                    token: response.headers.get('authorization'),
                };

                localStorage.setItem('user', JSON.stringify(user))

                router.push('/task')

            }
        } catch (error) {

            console.log(error);
        }
    };


    return (
        <main className="bg-[url(/auth.svg)] bg-no-repeat w-screen h-screen bg-cover bg-center pt-24 px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36">
            <div className='flex w-full h-full flex-col items-center gap-20 lg:pt-10'>
                <div className='flex flex-col gap-6 items-start'>
                    <h1 className='text-3xl md:text-5xl font-light md:font-extralight text-gray-800'>Welcome Back! Log in to Your Account</h1>
                    <h2 className='text-gray-700 leading-7 lg:text-center w-full'>Experience Seamless Connectivity, Tailored Features, and Enhanced Convenience</h2>
                </div>
                <form onSubmit={loginUser} className='bg-white w-full md:w-96 border shadow-xl rounded-3xl flex flex-col p-10 py-16 gap-3 lg:gap-4'>
                    <input onChange={(e: any) => email.current = e.target.value} type="text" className='border p-2 px-3 text-lg outline-none' placeholder='Enter email' />
                    <div className='relative w-full'>
                        <input onChange={(e: any) => password.current = e.target.value} type={eye ? 'text' : 'password'} className='border p-2 px-3 text-lg outline-none w-full' placeholder='Enter password' />
                        <FontAwesomeIcon icon={eye ? faEyeSlash : faEye} onClick={() => setEye(prevState => !prevState)} className='text-gray-600 text-lg absolute right-4 top-4 cursor-pointer' />
                    </div>
                    <button className='bg-blue-600 text-white py-2.5 text-lg mt-4 rounded-3xl'>Login</button>
                    <div className='text-gray-600 flex gap-3 items-center mt-3 justify-center w-full'>Don't have account yet? <Link href={'/signup'} className='text-black hover:text-blue-600 font-medium'>Signup</Link></div>
                </form>
            </div>
        </main>
    )
}

export default LoginForm