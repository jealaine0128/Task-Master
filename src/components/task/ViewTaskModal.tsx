import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'



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
    task: {
        id: string
        name: string
        description: string
        created_at: string
        updated_at: string
        completed: boolean
        category_id: string
    }
    allCategory: {
        id: string
        name: string
        created_at: string
        updated_at: string
        user_id: string
    }[]

    setViewTask: React.Dispatch<React.SetStateAction<Task>>
}
const ViewTaskModal: React.FC<Props> = ({ task, allCategory, setViewTask }) => {

    const category = allCategory.find((item) => item.id === task.category_id);

    return (
        <div className='fixed top-0 z-30 px-5 py-20 md:py-36 left-0 w-screen h-screen grid place-items-center bg-opacity-50 bg-black'>
            <div className='bg-white w-96 rounded-md shadow-xl flex flex-col p-10 gap-4 border-t-2 border-blue-600 relative'>
                <FontAwesomeIcon icon={faXmark} className='text-2xl absolute top-5 right-5 cursor-pointer' onClick={() => setViewTask({
                    id: '',
                    name: '',
                    description: '',
                    created_at: '',
                    updated_at: '',
                    completed: false,
                    category_id: '',
                    user_id: ''
                })} />

                <strong className='text-gray-700 text-xl'>{task.name}</strong>
                <p>{task.description}</p>
                <div className='flex items-center w-full justify-between'>
                    <small>{task.created_at}</small>
                    <small className='flex items-center gap-3'>Completed: <span className={`w-5 h-5 ${task.completed ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></span></small>
                </div>
                <strong>Category: {category?.name}</strong>
            </div>
        </div>
    )
}

export default ViewTaskModal