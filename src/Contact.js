
import {setActiveChat} from './reducer';
import {useDispatch} from 'react-redux';
import { setWantToChat } from './reducer';
const Contact=({contact})=>{
    const dispatch=useDispatch();
    const handleClick=()=>{
            dispatch(setActiveChat(contact))  
            dispatch(setWantToChat(true));
    }
    return <div onClick={handleClick} className="flex gap-4 items-center cursor-pointer
    bg-white p-2 shadow-gray-300 md:shadow-gray-500 shadow-sm rounded md:mx-1 mx-2.5">
        <img src='./images/avatar1.avif' alt='contact' className=" h-12 w-12  md:h-8 md:w-8 lg:h-12 rounded-full lg:w-12 object-cover"/>
        <div>
        <p className=" text-lg md:text-lg lg:text-xl capitalize">{contact.username}</p>
        <p className='text-md opacity-50'>{contact.phone}</p>
        </div>
    </div>
}

export default Contact;