/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import NewCategoryModal from '@/components/category/NewCategoryModal'
import Header from '@/components/home/Header'
import AllTask from '@/components/task/AllTask'
import TaskModal from '@/components/task/NewTaskModal'
import UpdateTaskModal from '@/components/task/UpdateTaskModal'
import ViewTaskModal from '@/components/task/ViewTaskModal'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Category } from '../category/page'


interface User {
    name: string
    token: string
}

interface Task {
    id: string
    name: string
    description: string
    created_at: string
    updated_at: string
    completed: boolean
    category_id: string
    user_id: string
}

const Page = () => {

    const API_URL = process.env.NEXT_PUBLIC_API_URL

    const router = useRouter()

    const [user, setUser] = useState<User>({ name: '', token: '' });

    const [newTask, setNewTask] = useState(false)

    const [searchQuery, setSearchQuery] = useState('')

    const [allTask, setAllTask] = useState<Task[]>([])

    const [allCategory, setAllCategory] = useState<Category[]>([])
    
    const [taskForm, setTaskForm] = useState({
        name: '',
        description: '',
        category_id: ''
    })

    const [updateTaskForm, setUpdateTaskForm] = useState<Task>({
        id: '',
        name: '',
        description: '',
        category_id: '',
        created_at: '',
        updated_at: '',
        user_id: '',
        completed: false,
    })

    const [viewTask, setViewTask] = useState<Task>({
        id: '',
        name: '',
        description: '',
        created_at: '',
        updated_at: '',
        completed: false,
        category_id: '',
        user_id: ''
    })

    const [isUpdating, setIsUpdating] = useState(false)

    const getAllTask = async () => {

        try {

            const { data } = await axios.get(`${API_URL}/api/v1/tasks`, {
                headers: {
                    Authorization: user.token
                }
            })

            setAllTask(data)

        } catch (error) {


            console.log(error);

        }

    }

    const getAllCategory = async () => {
        try {

            const { data } = await axios.get(`${API_URL}/api/v1/categories`, {
                headers: {
                    Authorization: user.token
                }
            })

            setAllCategory(data)

        } catch (error) {

            console.log(error);

        }
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

            getAllTask();
            getAllCategory()
        }

    }, [user]);


    const filterSearch = allTask.filter(item => item.name.toUpperCase().includes(searchQuery.toUpperCase()))

    const createTask = async (e: any) => {

        e.preventDefault()

        const { name, description, category_id } = taskForm

        try {

            const { data } = await axios.post(`${API_URL}/api/v1/tasks`, { name, description, category_id }, {
                headers: {
                    Authorization: user.token
                }
            })

            await getAllTask()

            setNewTask(false)
            setTaskForm({
                name: '',
                description: '',
                category_id: ''
            })

        } catch (error) {

            console.log(error);

        }
    }

    const deleteTask = async (ID: string) => {

        try {

            const { data } = await axios.delete(`${API_URL}/api/v1/tasks/${ID}`, {
                headers: {
                    Authorization: user.token
                }
            })

            await getAllTask()

        } catch (error) {

            console.log(error);

        }
    }

    const handleTaskForm = (e: any) => {
        const { name, value } = e.target;
        setTaskForm((prevTaskForm) => ({
            ...prevTaskForm,
            [name]: value,
        }));
    };
    const handleUpdateTaskForm = (e: any) => {
        const { name, value, type, checked } = e.target;

        // For checkboxes, use 'checked' instead of 'value' to get the boolean value
        const newValue = type === 'checkbox' ? checked : value;

        setUpdateTaskForm(prevData => ({
            ...prevData,
            [name]: newValue,
        }));
    };

    const openUpdateTask = (task: Task) => {
        setUpdateTaskForm(task)
        setIsUpdating(true)
    }

    const closeUpdateTask = () => {

        setIsUpdating(false)
        setUpdateTaskForm({
            id: '',
            name: '',
            description: '',
            category_id: '',
            created_at: '',
            updated_at: '',
            completed: false,
            user_id: ''
        })
    }

    const updateTask = async (e: any) => {

        e.preventDefault()

        const { id, completed, name, description, category_id } = updateTaskForm
        try {

            const { data } = await axios.patch(`${API_URL}/api/v1/tasks/${id}`, {
                completed, name, description, category_id
            }, {
                headers: {
                    Authorization: user.token
                }
            })

            await getAllTask()

            setUpdateTaskForm({
                id: '',
                name: '',
                description: '',
                category_id: '',
                created_at: '',
                updated_at: '',
                user_id: '',
                completed: false,
            })

            setIsUpdating(false)

        } catch (error) {

            console.log(error);

        }
    }

    const updateCompleted = async (e: any, task: Task) => {

        e.preventDefault()

        try {

            const { data } = await axios.patch(`${API_URL}/api/v1/tasks/${task.id}`, {
                completed: !task.completed
            }, {
                headers: {
                    Authorization: user.token
                }
            })

            await getAllTask()

        } catch (error) {

            console.log(error);

        }
    }
    return (
        <div className='overflow-x-hidden'>

            <Header />

            <AllTask allCategory={allCategory} updateCompleted={updateCompleted} setNewTask={setNewTask} openUpdateTask={openUpdateTask} task={filterSearch} deleteTask={deleteTask} setViewTask={setViewTask} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            {newTask && <TaskModal setTaskForm={setTaskForm} handleTaskForm={handleTaskForm} allCategory={allCategory} setNewTask={setNewTask} taskForm={taskForm} createTask={createTask} />}

            {viewTask.name && <ViewTaskModal task={viewTask} allCategory={allCategory} setViewTask={setViewTask} />}

            {isUpdating && <UpdateTaskModal updateTask={updateTask} closeUpdateTask={closeUpdateTask} taskForm={updateTaskForm} handleUpdateTaskForm={handleUpdateTaskForm} allCategory={allCategory} />}
        </div>
    )
}

export default Page