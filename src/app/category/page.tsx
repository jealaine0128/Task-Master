/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import AllCategory from '@/components/category/AllCategory'
import NewCategoryModal from '@/components/category/NewCategoryModal'
import UpdateCategoryModal from '@/components/category/UpdateCategoryModal'
import ViewCategoryModal from '@/components/category/ViewCategoryModal'
import Header from '@/components/home/Header'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Task } from '../task/page'


export interface Category {
  id: string
  name: string
  created_at: string
  updated_at: string
  user_id: string
}

const Page = () => {

  const router = useRouter()

  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const [user, setUser] = useState({ name: '', token: '' })

  const [newCategory, setNewCategory] = useState(false)

  const [categoryForm, setCategoryForm] = useState('')

  const [viewCategory, setViewCategory] = useState({
    id: '',
    name: '',
    created_at: '',
    updated_at: '',
    user_id: ''
  })

  const [updateCategoryForm, setUpdateCategoryForm] = useState<Category>({
    id: '',
    name: '',
    created_at: '',
    updated_at: '',
    user_id: ''
  })

  const [isUpdating, setIsUpdating] = useState(false)

  const [allTask, setAllTask] = useState<Task[]>([])

  const [allCategory, setAllCategory] = useState<Category[]>([])

  const getAllCategory = async () => {
    try {

      const { data, status } = await axios.get(`${API_URL}/api/v1/categories`, {
        headers: {
          Authorization: user.token
        }
      })

      if (status === 401) {
        localStorage.clear()
        alert('session expired please sign in.')
        router.push('/')
      }

      setAllCategory(data)

    } catch (error) {

      console.log(error)

    }
  }

  const getAllTask = async () => {

    try {

      const { data, status } = await axios.get(`${API_URL}/api/v1/tasks`, {
        headers: {
          Authorization: user.token
        }
      })

      if (status === 401) {
        localStorage.clear()
        alert('session expired please sign in.')
        router.push('/')
      }

      setAllTask(data)

    } catch (error) {


      console.log(error)

    }

  }

  const createCategory = async (e: any) => {

    e.preventDefault()

    try {

      if (!categoryForm) return alert('Category name is required')
      if (categoryForm.length < 3) return alert('Category name is too short')


      const { data, status } = await axios.post(`${API_URL}/api/v1/categories`, {
        name: categoryForm
      }, {
        headers: {
          Authorization: user.token
        }
      })

      if (status === 401) {
        localStorage.clear()
        alert('session expired please sign in.')
        router.push('/')
      }

      await getAllCategory()

      setNewCategory(false)
      setCategoryForm('')

    } catch (error) {

      console.log(error)

    }
  }

  const updateCategory = async (e: any) => {

    e.preventDefault()

    try {

      if (!updateCategoryForm.name) return alert('Category name is required')

      const { data, status } = await axios.patch(`${API_URL}/api/v1/categories/${updateCategoryForm.id}`, {
        name: updateCategoryForm.name
      }, {
        headers: {
          Authorization: user.token
        }
      })

      if (status === 401) {
        localStorage.clear()
        alert('session expired please sign in.')
        router.push('/')
      }

      await getAllCategory()

      setCategoryForm('')
      setIsUpdating(false)

    } catch (error) {

      console.log(error)

    }
  }

  const deleteCategory = async (e: any, ID: string) => {

    e.preventDefault()

    try {

      const { data, status } = await axios.delete(`${API_URL}/api/v1/categories/${ID}`, {
        headers: {
          Authorization: user.token
        }
      })

      if (status === 401) {
        localStorage.clear()
        alert('session expired please sign in.')
        router.push('/')
      }
      await getAllCategory()

    } catch (error) {

      console.log(error)

    }
  }

  const openUpdateCategory = (category: Category) => {
    setIsUpdating(true)
    setUpdateCategoryForm(category)
  }

  const handleUpdateCategoryForm = (e: any) => {
    const { name, value } = e.target

    setUpdateCategoryForm(prevForm => ({
      ...prevForm, [name]: value
    }))

  }

  useEffect(() => {

    if (!user.name) {

      const currentUser = JSON.parse(localStorage.getItem('user') as any)

      if (!currentUser) {

        router.push('/login')

      } else {

        setUser(currentUser)

      }
    }

    if (user.name) {

      getAllCategory();

      getAllTask()

    }

  }, [user]);


  return (
    <div className='overflow-x-hidden'>

      <Header />

      <AllCategory setViewCategory={setViewCategory} deleteCategory={deleteCategory} openUpdateCategory={openUpdateCategory} allCategory={allCategory} setNewCategory={setNewCategory} />

      {newCategory && <NewCategoryModal setNewCategory={setNewCategory} createCategory={createCategory} setCategoryForm={setCategoryForm} />}

      {isUpdating && <UpdateCategoryModal updateCategoryForm={updateCategoryForm} setIsUpdating={setIsUpdating} handleUpdateCategoryForm={handleUpdateCategoryForm} updateCategory={updateCategory} />}

      {viewCategory.name && <ViewCategoryModal allTask={allTask} category={viewCategory} setViewCategory={setViewCategory} />}

    </div>
  )
}

export default Page