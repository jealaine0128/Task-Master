import { Category } from '@/app/category/page'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface Props {
    setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>
    updateCategory: (e: any) => Promise<void>
    handleUpdateCategoryForm: (e: any) => void
    updateCategoryForm: Category
}

const UpdateCategoryModal: React.FC<Props> = ({ setIsUpdating, updateCategory, handleUpdateCategoryForm, updateCategoryForm }) => {

    return (
        <div className='fixed top-0 px-5 py-20 md:py-36 z-30 left-0 w-screen h-screen grid place-items-center bg-opacity-50 bg-black'>
            <form onSubmit={updateCategory} className='w-full md:w-1/2 lg:w-1/4 bg-white gap-3 rounded-md shadow-xl relative px-10 py-5 flex flex-col items-center'>
                <FontAwesomeIcon onClick={() => setIsUpdating(false)} icon={faXmark} className='absolute text-2xl cursor-pointer text-gray-700 right-7 top-7' />
                <h1 className='text-gray-800 text-2xl font-bold'>Update Category</h1>
                <div className='flex flex-col w-full h-full gap-3 my-5'>
                    <input type="text" placeholder='Category name' name='name' value={updateCategoryForm.name} onChange={handleUpdateCategoryForm} className='border-b border-blue-600 px-3 text-lg py-2 outline-blue-600' />
                </div>
                <button className='bg-blue-600 rounded-md py-2.5 text-lg text-white w-full'>Update Category</button>
            </form>
        </div>
    )
}

export default UpdateCategoryModal