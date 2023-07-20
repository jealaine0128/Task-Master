/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'

const LandingMain = () => {
    return (
        <main className="bg-[url(/bg.svg)] bg-no-repeat w-screen h-screen bg-cover bg-center pt-24 px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36">
            <div className='flex items-center justify-between w-full h-full flex-col lg:flex-row'>
                <div className='flex flex-col gap-6 items-center lg:items-start lg:w-1/2'>
                    <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light md:font-extralight text-gray-800'>Simplify Your Daily To-Dos with Our Powerful Task Manager App</h1>
                    <h2 className='text-gray-700 leading-7 text-sm md:text-base'>Simplify task management, eliminate distractions, and enhance your efficiency with our user-friendly and intuitive task manager app that adapts to your unique work style and preferences</h2>
                    <Link href={'/login'} className='bg-blue-600 text-white px-7 hover:bg-white border border-blue-600 hover:text-blue-600 py-2.5 text-lg rounded-3xl'>Get Started</Link>
                </div>
                <img src="/main.jpg" alt="" className='rounded-full' />
            </div>
        </main>
    )
}

export default LandingMain