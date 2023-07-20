'use client'
import { Category } from '@/app/category/page'
import { faEye, faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faEllipsis, faSearch, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'


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

interface Props {
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

const AllTask: React.FC<Props> = ({ allCategory, setNewTask, updateCompleted, task, searchQuery, setSearchQuery, setViewTask, deleteTask, openUpdateTask }) => {

    const [completed, setCompleted] = useState(false)

    const [selectedTask, setSelectedTask] = useState('')

    const [categoryID, setCategeoryID] = useState('')

    const filterByCategory = categoryID ? task.filter(item => item.category_id == categoryID) : task

    const filteredTask = completed ? filterByCategory.filter(item => item.completed === true) : filterByCategory

    return (
        <div className='flex overflow-x-hidden gap-5 md:gap-10 flex-col justify-center px-5 sm:px-10 md:px-16 lg:px-56 xl:px-96 py-36 w-screen'>
            <div className='w-full flex-col flex items-center justify-center gap-8 xl:flex-row'>
                <div className='relative w-full xl:w-2/5'>
                    <FontAwesomeIcon icon={faSearch} className='absolute top-4 text-gray-600 left-3 text-lg' />
                    <input type="text" value={searchQuery} onChange={(e: any) => setSearchQuery(e.target.value)} placeholder='Search Task' className='w-full py-2.5 px-10 rounded-md border-2 outline-none' />
                </div>
                <div className='flex items-center gap-5 w-full xl:w-1/2'>
                    <button className='bg-blue-600 text-white px-5 py-2.5 rounded-md' onClick={() => setNewTask(true)}>Create Task</button>
                    <select className='border-b border-blue-600 py-2.5 px-3 outline-none bg-slate-50' value={categoryID} onChange={(e: any) => setCategeoryID(e.target.value)}>
                        <option value="">All Category</option>
                        {allCategory.map(item => (
                            <option value={item.id} key={item.id}>{item.name}</option>
                        ))}
                    </select>
                    <div className='flex items-center gap-3'>
                        <label htmlFor="completed" className='cursor-pointer'>Completed</label>
                        <input id='completed' type="checkbox" className='w-4 h-4 cursor-pointer' checked={completed ? true : false} onChange={(e) => setCompleted(prevData => !prevData)} />
                    </div>

                </div>
            </div>
            <div className='gap-5 md:gap-10 flex flex-wrap justify-center w-full'>
                {filteredTask && filteredTask.map(item => (
                    <div key={item.id} className='bg-white shadow-xl border-t flex flex-col gap-3 rounded-xl p-5 w-full border-blue-600 sm:w-2/5 relative'>
                        <h1 className='text-lg font-medium text-gray-700'>{item.name}</h1>
                        <p>{item.description}</p>
                        <div className='mt-auto pt-3 flex items-center justify-between'>
                            <small className='text-gray-500'>{item.created_at}</small>
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
        </div>
    )
}




export default AllTask