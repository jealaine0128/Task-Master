'use client'
import { faBars, faBoxesStacked, faHome, faHouse, faListCheck, faRightFromBracket, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Header: React.FC = ({ }) => {

    const router = useRouter()

    const [user, setUser] = useState({ name: '', token: '' })

    const [open, setIsOpen] = useState(false)

    const [menu, setMenu] = useState(false)

    const logout = async (e: any) => {

        e.preventDefault()

        try {

            const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
                headers: {
                    Authorization: user.token
                }
            })

            localStorage.clear()

            router.push('/')

        } catch (error) {

            console.log(error);

        }
    }

    useEffect(() => {

        if (!user.name) {
            const currentUser = JSON.parse(localStorage.getItem('user') as any)

            if (currentUser) {
                setUser(currentUser)
            }
        }

    }, [user])

    return (
        <header className='fixed bg-white z-20 top-0 left-0 w-screen h-20 shadow-lg px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 flex items-center'>
            <h1 className='text-blue-600 w-80 text-2xl md:text-3xl tracking-tight font-black'>TASK MASTER</h1>
            <FontAwesomeIcon icon={menu ? faXmark : faBars} className='text-2xl cursor-pointer absolute z-10 right-5 top-5 md:hidden' onClick={() => setMenu(prevData => !prevData)} />
            <ul className={`w-full justify-end md:flex lg:items-center md:gap-8 ${menu ? 'gap-5 shadow-2xl flex flex-col fixed top-0 left-0 w-screen bg-white p-10 text-gray-600' : 'hidden'}`}>
                
                <Link href={'/'} className='flex items-center gap-2 cursor-pointer text-gray-700 hover:text-blue-600'>
                    <div>Home</div>
                    <FontAwesomeIcon icon={faHome} />
                </Link>

                <Link href={'/task'} className='flex items-center gap-2 cursor-pointer text-gray-700 hover:text-blue-600'>
                    <div>Task</div>
                    <FontAwesomeIcon icon={faListCheck} />
                </Link>

                <Link href={'/category'} className='flex items-center gap-2 cursor-pointer text-gray-700 hover:text-blue-600'>
                    <div>Category</div>
                    <FontAwesomeIcon icon={faBoxesStacked} />
                </Link>

                <li className='relative'>
                    <button onClick={() => setIsOpen(prevData => !prevData)} className=" outline-none rounded-lg px-5 py-2.5 flex items-center">{user.name}<svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg></button>
                    <ul className={`py-2 absolute bg-white shadow ${!open && 'hidden'}`}>
                        <li className='flex items-center gap-3 px-3 text-gray-700 cursor-pointer hover:text-blue-600' onClick={(e: any) => logout(e)}>
                            Logout
                            <FontAwesomeIcon icon={faRightFromBracket} />
                        </li>
                    </ul>
                </li>
            </ul>
        </header>

    )
}

export default Header