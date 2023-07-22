/* eslint-disable react/no-unescaped-entities */
'use client'
import { Category } from '@/app/category/page'
import { faEye, faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faEllipsis, faSearch, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

interface Task {
    id: string
    deadline: string
    name: string
    description: string
    created_at: string
    updated_at: string
    completed: boolean
    category_id: string
    user_id: string
}

interface Props {

    todayTask: Task[]
    task: Task[]
    searchQuery: string

    setSearchQuery: React.Dispatch<React.SetStateAction<string>>

    setViewTask: React.Dispatch<React.SetStateAction<Task>>

    deleteTask: (ID: string) => Promise<void>

    openUpdateTask: (task: Task) => void

    setNewTask: React.Dispatch<React.SetStateAction<boolean>>

    updateCompleted: (e: any, task: Task) => Promise<void>

    allCategory: Category[]

}

const AllTask: React.FC<Props> = ({ allCategory, setNewTask, updateCompleted, task, searchQuery, setSearchQuery, setViewTask, deleteTask, openUpdateTask, todayTask }) => {

    const [completed, setCompleted] = useState(false)

    const [selectedTask, setSelectedTask] = useState('')

    const [categoryID, setCategeoryID] = useState('')

    const [today, setToday] = useState(false)

    const filterByCategory = categoryID ? task.filter(item => item.category_id == categoryID) : task

    const filterTodayByCategoryTask = categoryID ? todayTask.filter(item => item.category_id === categoryID) : todayTask

    const filterTodayCompletedTask = completed ? filterTodayByCategoryTask.filter(item => item.completed === true) : filterTodayByCategoryTask

    const filteredCompletedTask = completed ? filterByCategory.filter(item => item.completed === true) : filterByCategory

    function timeAgo(dateString: string) {
        const createdDate: any = new Date(dateString);
        const currentDate: any = new Date();

        const timeDifferenceInSeconds = Math.floor((currentDate - createdDate) / 1000);

        if (timeDifferenceInSeconds < 60) {
            return `${timeDifferenceInSeconds} second${timeDifferenceInSeconds !== 1 ? 's' : ''} ago`;
        } else if (timeDifferenceInSeconds < 3600) {
            const minutes = Math.floor(timeDifferenceInSeconds / 60);
            return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        } else if (timeDifferenceInSeconds < 86400) {
            const hours = Math.floor(timeDifferenceInSeconds / 3600);
            return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        } else {
            const days = Math.floor(timeDifferenceInSeconds / 86400);
            return `${days} day${days !== 1 ? 's' : ''} ago`;
        }
    }


    return (
        <div className='flex overflow-x-hidden gap-5 md:gap-10 flex-col justify-center px-5 sm:px-10 md:px-16 lg:px-56 xl:px-96 py-36 w-screen'>
            <div className='w-full flex-col flex items-center justify-center gap-8 xl:flex-row'>
                <div className='relative w-full xl:w-2/5'>
                    <FontAwesomeIcon icon={faSearch} className='absolute top-4 text-gray-600 left-3 text-lg' />
                    <input type="text" value={searchQuery} onChange={(e: any) => setSearchQuery(e.target.value)} placeholder='Search Task' className='w-full py-2.5 px-10 rounded-md border-2 outline-none' />
                </div>
                <div className='flex items-center gap-5 w-full xl:w-auto'>
                    <button className='bg-blue-600 text-white px-2 text-sm py-2 sm:px-5 sm:py-2.5 md:text-base rounded-md' onClick={() => setNewTask(true)}>Create Task</button>
                    {!today ? <button className='text-blue-600 bg-white border border-blue-600 px-2 text-sm py-2 sm:px-5 sm:py-2.5 md:text-base rounded-md' onClick={() => setToday(prevState => !prevState)}>Today Task</button>
                        : <button className='text-blue-600 b-white border border-blue-600 px-2 text-sm py-2 sm:px-5 sm:py-2.5 md:text-base rounded-md' onClick={() => setToday(prevState => !prevState)}>All Task</button>
                    }
                    <select className='border-b border-blue-600 py-2.5 px-2 md:px-3 md:text-base text-sm outline-none bg-slate-50' value={categoryID} onChange={(e: any) => setCategeoryID(e.target.value)}>
                        <option value="">All Category</option>
                        {allCategory.map(item => (
                            <option value={item.id} key={item.id}>{item.name}</option>
                        ))}
                    </select>
                    <div className='flex items-center gap-3'>
                        <label htmlFor="completed" className='cursor-pointer text-sm md:text-base'>Completed</label>
                        <input id='completed' type="checkbox" className='w-3 h-3 md:w-4 md:h-4 cursor-pointer' checked={completed ? true : false} onChange={(e) => setCompleted(prevData => !prevData)} />
                    </div>

                </div>
            </div>
            {today && <div className='w-full flex flex-col gap-10'>
                <h1 className='font-light lg:font-extralight text-2xl md:text-3xl xl:text-4xl lg:px-16 xl:px-28'>Let's Get It Done, Today!</h1>
                <div className='gap-5 md:gap-10 flex flex-wrap justify-center w-full'>
                    {filterTodayCompletedTask && filterTodayCompletedTask.map(item => (
                        <div key={item.id} className='bg-white shadow-xl border-t flex flex-col gap-3 rounded-xl p-5 w-full border-blue-600 sm:w-2/5 relative'>
                            <h1 className='text-lg font-medium text-gray-700'>{item.name}</h1>
                            <p>{item.description}</p>
                            <div className='mt-auto pt-3 flex items-center justify-between'>
                                <div className='flex flex-col gap-1'>
                                    <small className='text-gray-500'><span className='font-bold'>Deadline: </span>{item.deadline && item.deadline}</small>
                                    <small className='text-gray-500'><span className='font-bold'>Created: </span>{timeAgo(item.created_at)}</small>
                                </div>
                                <div className='flex items-center gap-5'>
                                    <span className={`w-4 h-4 rounded-full cursor-pointer ${item.completed ? 'bg-green-500' : 'bg-red-600'}`} onClick={(e: any) => updateCompleted(e, item)}></span>
                                    <FontAwesomeIcon icon={faEllipsis} className='text-3xl cursor-pointer hover:text-blue-600' onClick={() => {
                                        setSelectedTask(item.id)
                                    }} />
                                    <ul className={`absolute bg-white p-4 flex-col gap-3 right-0 bottom-0 shadow-xl rounded-xl ${selectedTask === item.id ? 'flex' : 'hidden'}`}>
                                        <li className='flex items-center text-gray-700 cursor-pointer gap-2 hover:text-green-500' onClick={() => setViewTask(item)}>View <FontAwesomeIcon icon={faEye} /></li>
                                        <li className='flex items-center text-gray-700 cursor-pointer gap-2 hover:text-blue-600' onClick={() => openUpdateTask(item)}>Update <FontAwesomeIcon icon={faPenToSquare} /></li>
                                        <li className='flex items-center text-gray-700 cursor-pointer gap-2 hover:text-red-600' onClick={() => deleteTask(item.id)}>Delete <FontAwesomeIcon icon={faTrash} /></li>
                                        <li className='mt-3 pt-3 border-t text-black cursor-pointer flex items-center gap-3' onClick={() => setSelectedTask('')}>Close <FontAwesomeIcon icon={faXmark} className='text-xl' /></li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>}
            {!today && <div className='w-full flex flex-col gap-10'>
                <h1 className='font-light lg:font-extralight text-2xl md:text-3xl xl:text-4xl lg:px-16 xl:px-28'>All Task Overview</h1>
                <div className='gap-5 md:gap-10 flex flex-wrap justify-center w-full'>
                    {filteredCompletedTask && filteredCompletedTask.map(item => (
                        <div key={item.id} className='bg-white shadow-xl border-t flex flex-col gap-3 rounded-xl p-5 w-full border-blue-600 sm:w-2/5 relative'>
                            <h1 className='text-lg font-medium text-gray-700'>{item.name}</h1>
                            <p>{item.description}</p>
                            <div className='mt-auto pt-3 flex items-center justify-between'>
                                <div className='flex flex-col gap-1'>
                                    <small className='text-gray-500'><span className='font-bold'>Deadline: </span>{item.deadline && item.deadline}</small>
                                    <small className='text-gray-500'><span className='font-bold'>Created: </span> {timeAgo(item.created_at)}</small>
                                </div>
                                <div className='flex items-center gap-5'>
                                    <span className={`w-4 h-4 rounded-full cursor-pointer ${item.completed ? 'bg-green-500' : 'bg-red-600'}`} onClick={(e: any) => updateCompleted(e, item)}></span>
                                    <FontAwesomeIcon icon={faEllipsis} className='text-3xl cursor-pointer hover:text-blue-600' onClick={() => {
                                        setSelectedTask(item.id)
                                    }} />
                                    <ul className={`absolute bg-white p-4 flex-col gap-3 right-0 bottom-0 shadow-xl rounded-xl ${selectedTask === item.id ? 'flex' : 'hidden'}`}>
                                        <li className='flex items-center text-gray-700 cursor-pointer gap-2 hover:text-green-500' onClick={() => setViewTask(item)}>View <FontAwesomeIcon icon={faEye} /></li>
                                        <li className='flex items-center text-gray-700 cursor-pointer gap-2 hover:text-blue-600' onClick={() => openUpdateTask(item)}>Update <FontAwesomeIcon icon={faPenToSquare} /></li>
                                        <li className='flex items-center text-gray-700 cursor-pointer gap-2 hover:text-red-600' onClick={() => deleteTask(item.id)}>Delete <FontAwesomeIcon icon={faTrash} /></li>
                                        <li className='mt-3 pt-3 border-t text-black cursor-pointer flex items-center gap-3' onClick={() => setSelectedTask('')}>Close <FontAwesomeIcon icon={faXmark} className='text-xl' /></li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>}
        </div>
    )
}




export default AllTask