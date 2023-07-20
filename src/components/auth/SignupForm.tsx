/* eslint-disable react/no-unescaped-entities */
'use client'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'

const SignupForm = () => {


    const router = useRouter()
    const [eye, setEye] = useState(false)

    const name = useRef('')
    const confirmpassword = useRef('')
    const email = useRef('')
    const password = useRef('')

    const registerUser = async (e: any) => {

        e.preventDefault()

        if (!name.current || !email.current || !password.current || !confirmpassword.current) return alert('Fill up all inputs')

        if (password.current !== confirmpassword.current) return alert('Password did not matched!')

        try {

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {

                user: { name: name.current, email: email.current, password: password.current }

            })

            if (data.status.code === 200) {

                router.push('/login')

            }

        } catch (error) {

            console.log(error);

        }

    }

    return (
        <main className="bg-[url(/auth.svg)] bg-no-repeat w-screen h-screen bg-cover bg-center pt-24 px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36">
            <div className='flex w-full h-full flex-col items-center gap-10 lg:gap-20 lg:pt-10'>
                <div className='flex flex-col gap-6 items-start'>
                    <h1 className='text-3xl md:text-5xl font-light md:font-extralight text-gray-800'>Join Us Today! Sign Up for a Personalized Experience</h1>
                    <h2 className='text-gray-700 leading-7 lg:text-center w-full'>Unlock a World of Possibilities and Seamlessly Connect with our Community</h2>
                </div>
                <form onSubmit={registerUser} className='bg-white w-full md:w-96 border shadow-xl rounded-3xl flex flex-col p-10 gap-3 lg:gap-4'>
                    <input onChange={(e: any) => name.current = e.target.value} type="text" className='border p-2 px-3 text-lg outline-none' placeholder='Enter name' />
                    <input onChange={(e: any) => email.current = e.target.value} type="text" className='border p-2 px-3 text-lg outline-none' placeholder='Enter email' />
                    <input onChange={(e: any) => password.current = e.target.value} type={eye ? 'text' : 'password'} className='border p-2 px-3 text-lg outline-none w-full' placeholder='Create password' />
                    <div className='relative w-full'>
                        <input onChange={(e: any) => confirmpassword.current = e.target.value} type={eye ? 'text' : 'password'} className='border p-2 px-3 text-lg outline-none w-full' placeholder='Confirm password' />
                        <FontAwesomeIcon icon={eye ? faEyeSlash : faEye} onClick={() => setEye(prevState => !prevState)} className='text-gray-600 text-lg absolute right-4 top-4 cursor-pointer' />
                    </div>
                    <button className='bg-blue-600 text-white py-2.5 text-lg mt-4 rounded-3xl'>Signup</button>
                    <div className='text-gray-600 flex gap-3 items-center mt-3 justify-center w-full'>Already have an account? <Link href={'/login'} className='text-black hover:text-blue-600 font-medium'>Login</Link></div>
                </form>
            </div>
        </main>
    )
}

export default SignupForm