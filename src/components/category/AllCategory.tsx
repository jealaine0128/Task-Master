import { Category } from '@/app/category/page'
import { faEllipsis, faPenToSquare, faSearch, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

interface Props {
    allCategory: Category[]
    setNewCategory: React.Dispatch<React.SetStateAction<boolean>>
    openUpdateCategory: (category: Category) => void
    deleteCategory: (e: any, ID: string) => Promise<void>
}

const AllCategory: React.FC<Props> = ({ allCategory, setNewCategory, openUpdateCategory, deleteCategory }) => {

    const [selectedCategory, setSelectedCategory] = useState('')

    const [searchQuery, setSearchQuery] = useState('')

    const filteredCategory = allCategory.filter(item => item.name.toUpperCase().includes(searchQuery.toUpperCase()))
    return (
        <div className='flex overflow-x-hidden gap-5 md:gap-10 flex-col justify-center px-5 sm:px-10 md:px-16 lg:px-56 xl:px-96 py-36 w-screen'>
            <div className='w-full flex items-center justify-center gap-8'>
                <div className='relative w-2/5'>
                    <FontAwesomeIcon icon={faSearch} className='absolute top-4 text-gray-600 left-3 text-lg' />
                    <input type="text" value={searchQuery} onChange={(e: any) => setSearchQuery(e.target.value)} placeholder='Search Category' className='w-full py-2.5 px-10 rounded-md border-2 outline-none' />
                </div>
                <button className='bg-blue-600 text-white px-5 py-2.5 rounded-md' onClick={() => setNewCategory(true)}>Create Category</button>
            </div>
            <div className='gap-5 md:gap-10 flex flex-wrap justify-center w-full'>
                {filteredCategory && filteredCategory.map(item => (
                    <div key={item.id} className='bg-white shadow-xl border-t flex flex-col gap-3 rounded-xl p-5 w-full border-blue-600 sm:w-1/4 relative'>
                        <h1 className='text-lg font-medium text-gray-700'>{item.name}</h1>
                        <div className='mt-auto pt-3 flex items-center justify-between'>
                            <small className='text-gray-500'>Created: {item.created_at}</small>
                            <div className='flex items-center gap-5'>
                                <FontAwesomeIcon icon={faEllipsis} className='text-3xl cursor-pointer hover:text-blue-600' onClick={() => {
                                    setSelectedCategory(item.id)
                                }} />
                                <ul className={`absolute bg-white p-4 flex-col gap-3 right-0 bottom-0 shadow-xl rounded-xl ${selectedCategory === item.id ? 'flex' : 'hidden'}`}>
                                    <li className='flex items-center text-gray-700 cursor-pointer gap-2 hover:text-blue-600' onClick={() => openUpdateCategory(item)}>Update <FontAwesomeIcon icon={faPenToSquare} /></li>
                                    <li className='flex items-center text-gray-700 cursor-pointer gap-2 hover:text-red-600' onClick={(e: any) => deleteCategory(e, item.id)}>Delete <FontAwesomeIcon icon={faTrash} /></li>
                                    <li className='mt-3 pt-3 border-t text-black cursor-pointer flex items-center gap-3' onClick={() => setSelectedCategory('')}>Close <FontAwesomeIcon icon={faXmark} className='text-xl' /></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllCategory