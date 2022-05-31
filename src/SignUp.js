import { useRef,useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
const SignUp=()=>{
    const navigate=useNavigate();
    const phoneRef=useRef();
    const usernameRef=useRef();
    const passwordRef=useRef();
    const [error,setError]=useState('');
    const handleClick=(e)=>{
      e.preventDefault();
      const phone=phoneRef.current.value;
      if(phone.length>10){
        setError("Phone Number Should Contain 10 Digits Only");
        return;
      }
      const username=usernameRef.current.value;
      const password=passwordRef.current.value;
      axios.post('https://whatsgoingclone.herokuapp.com/user/create',{
        phone,username,password,
      }).then((response)=>{
         let {success,user,message}=response.data;
         if(success) {
             localStorage.setItem('user',JSON.stringify(user._id));
             navigate('/home');
         }
         else setError(message?message:"Something Went Wrong");
      })
    }
    return <div className='w-screen h-screen relative bg-green-400'>
    <img src='/images/signin.jpg' alt='signin' className='w-full h-full sm:opacity-0'/>
    <form className='absolute top-0 bottom-0 right-0 left-0 
    flex flex-col justify-center items-center'>
        <input type='text' ref={phoneRef} placeholder='Phone Number'  className='w-5/6 md:w-6/12 px-4 py-2 text-lg outline-none shadow-lg lg:w-2/6 mb-4'/>
        {error&&<div className="text-red-600 text-md tracking-wide font-medium mb-2">{error}</div>}
        <input type='text' ref={usernameRef} placeholder='Username'  className=' w-5/6 px-4 py-2 text-lg outline-none shadow-lg md:w-6/12 lg:w-2/6 mb-4'/>
        <input type='password' ref={passwordRef} placeholder='Password'  className=' w-5/6 px-4 py-2 text-lg outline-none shadow-lg md:w-6/12  lg:w-2/6 mb-4'/>
        <button onClick={handleClick} className='bg-green-700 text-white px-8 py-2 tracking-wider rounded shadow-lg m-2 text-lg'>Create</button>
    </form>
  </div>
}

export default SignUp;