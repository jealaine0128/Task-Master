import { Task } from '@/app/task/page'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface Props {
    category: {
        id: string
        name: string
        created_at: string
        updated_at: string
        user_id: string
    }
    setViewCategory: React.Dispatch<React.SetStateAction<{
        id: string;
        name: string;
        created_at: string;
        updated_at: string;
        user_id: string;
    }>>
    allTask: Task[]
}

const ViewCategoryModal: React.FC<Props> = ({ category, setViewCategory, allTask }) => {

    const filteredTasks = allTask.filter(item => item.category_id === category.id);
    const categoryTaskLength = filteredTasks.length;

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

    function formatCreatedAtDate(created_at: string) {
        const createdDate = new Date(created_at);
        const day = createdDate.getDate().toString().padStart(2, "0");
        const month = (createdDate.getMonth() + 1).toString().padStart(2, "0");
        const year = createdDate.getFullYear();
        let hours = createdDate.getHours();
        let ampm = "AM";
      
        if (hours >= 12) {
          ampm = "PM";
          hours %= 12;
        }
      
        hours = hours === 0 ? 12 : hours;
      
        return `${day}/${month}/${year}, ${hours}${ampm}`;
      }

    return (
        <div className='fixed top-0 z-30 px-5 py-20 md:py-36 left-0 w-screen h-screen grid place-items-center bg-opacity-50 bg-black'>
            <div className='bg-white w-96 rounded-md shadow-xl flex flex-col p-10 gap-4 border-t-2 border-blue-600 relative'>
                <FontAwesomeIcon icon={faXmark} className='text-2xl absolute top-5 right-5 cursor-pointer' onClick={() => setViewCategory({
                    id: '',
                    name: '',
                    created_at: '',
                    updated_at: '',
                    user_id: ''
                })} />
                <strong className='text-gray-700 text-xl'>{category.name}</strong>
                <div className='flex pt-3 border-t mt-3 gap-1 w-full justify-between'>
                    <small className='flex flex-col items-center'><span className='font-bold text-gray-700'>Tasks: </span>{categoryTaskLength}</small>
                    <small className='flex flex-col'><span className='font-bold text-gray-700'>Created: </span>{formatCreatedAtDate(category.created_at)}</small>
                    <small className='flex flex-col'><span className='font-bold text-gray-700'>Updated: </span>{timeAgo(category.updated_at)}</small>
                </div>
            </div>
        </div >)
}

export default ViewCategoryModal