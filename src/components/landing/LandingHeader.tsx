import Link from 'next/link'
import React from 'react'

const LandingHeader = () => {

  return (

        <header className='fixed top-0 left-0 w-screen px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 h-20 flex items-center shadow-lg bg-white'>
            <Link href={'/'} className='font-black text-2xl text-blue-600 tracking-tight w-96'>TASK MASTER</Link>
            <ul className='flex w-full h-full justify-end items-center gap-6 text-white'>
                <Link href={'/login'}  className='px-6 py-2 border rounded-3xl bg-white text-blue-600 border-blue-500'>Log in</Link>
                <Link href={'/signup'} className='px-6 py-2 border rounded-3xl bg-blue-600 text-white'>Sign up</Link>
            </ul>
        </header>
        
    )
}

export default LandingHeader