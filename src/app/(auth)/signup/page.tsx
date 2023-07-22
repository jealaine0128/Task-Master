'use client'
import SignupForm from '@/components/auth/SignupForm'
import LandingHeader from '@/components/landing/LandingHeader'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {

  
  const router = useRouter()

  const [user, setUser] = useState({ name: '', token: '' })

  useEffect(() => {

    if (!user.name) {
        const currentUser = JSON.parse(localStorage.getItem('user') as any)

        if (currentUser) {
            setUser(currentUser)
        }
    }

    if(user.name) {
      alert('You already logged in')
      router.push('/task')
    }

}, [user])

  return (
        <>
        <LandingHeader />
        <SignupForm />
        </>
    )
}

export default Page