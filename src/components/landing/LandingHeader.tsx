'use client'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useState } from 'react'

const LandingHeader = () => {

    const [menu, setMenu] = useState(false)

  return (

        <header className='fixed top-0 left-0 w-screen px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 h-20 flex items-center shadow-lg bg-white'>
            <Link href={'/'} className='font-black text-2xl text-blue-600 tracking-tight w-96'>TASK MASTER</Link>
            <FontAwesomeIcon icon={menu ? faXmark : faBars} className='text-2xl cursor-pointer absolute z-10 right-5 top-5 md:hidden' onClick={() => setMenu(prevData => !prevData)} />
            <ul className={`w-full justify-start md:justify-end items-start flex lg:items-center md:flex md:gap-8 ${menu ? 'gap-5 shadow-2xl flex fixed top-0 left-0 w-screen bg-white p-10 text-gray-600' : 'hidden'}`}>
                <Link href={'/login'}  className='px-6 py-2 border rounded-3xl bg-white text-blue-600 border-blue-500'>Log in</Link>
                <Link href={'/signup'} className='px-6 py-2 border rounded-3xl bg-blue-600 text-white'>Sign up</Link>
            </ul>
        </header>
        
    )
}

export default LandingHeader