import Contact from "./Contact";
import { useState,useRef } from "react";
import axios from "axios";
import {setActiveChat} from './reducer';
import {useDispatch} from 'react-redux';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SideBar=({user})=>{
  const navigate=useNavigate();
   const activeChat=useSelector((state)=>state.activeChat);
   const wantToChat=useSelector((state)=>state.wantToChat);
   const [addContact,setAddContact]=useState(false);
   const contactRef=useRef();
   const dispatch=useDispatch();
   const handleClick=()=>{
       const contact=contactRef.current.value;
       if(contact===user.phone){
        setAddContact(false);
        return;
       }
      axios.post('https://whatsgoingclone.herokuapp.com/user/addcontact',{sender: user.phone, receiver:contact}).then((response)=>{
        const failure=response.data.failure;
        setAddContact(false);
        if(failure){
          toast.error("Phone Number Does not Exist!",{
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
      })
   }

   const logOut=()=>{
    localStorage.removeItem('user');
    navigate('/')
  }


   const {username,contacts,phone}=user;
  if(contacts.length>0&&!activeChat) dispatch(setActiveChat(contacts[0]));
    return <div className={` ${activeChat&&wantToChat?"hidden":"flex"}  w-full md:w-1/4 h-full bg-white sm:flex flex flex-col`}>
        <div>
          <div className="p-1 border-green-800 border-b-2 flex gap-2 items-center">
            <img src='./images/avatar.webp' alt="avatar" className=" h-12 object-cover rounded-full"/>
            <div>
            <p className=" text-xl capitalize">{username}</p>
            <p className='text-md opacity-50'>{phone}</p>
            </div>
            <button onClick={logOut} className="ml-auto px-6 py-2  sm:hidden
             text-white bg-green-600 shadow-lg rounded tracking-wider">LogOut</button>
          </div>
          <p onClick={()=>setAddContact(!addContact)}
           className="bg-green-800 text-lg cursor-pointer md:text-lg lg:text-xl md:font-thin  outline-none shadow-xl text-white  p-4 md:p-2 uppercase">
            ADD New Contact
          </p>
          <ToastContainer />
        </div>
          {addContact&&<div className="origin-top h-full flex flex-col justify-center items-center p-8 bg-green-300 gap-4">
              <input ref={contactRef} type='text' placeholder='Phone Number'  className="px-4 py-2 outline-none rounded shadow-md shadow-gray-500 border-2 text-black"/>
              <button onClick={handleClick} className="px-4 py-2 bg-green-600 w-max rounded">Add</button>
          </div>}
        {!addContact&&<div className="overflow-x-scroll scrollbar-hide space-y-2.5 md:space-y-4 my-2 flex-1">
                   {contacts.length>0?contacts.map((contact,id)=>{
                     return <Contact contact={contact} key={id}/>
                   }):<img src='/images/new.svg' alt='svfff' className="sm:hidden block h-52 my-28 mx-auto" />}
        </div>}
    </div>
}

export default SideBar;