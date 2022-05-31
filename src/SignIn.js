import { useRef,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn=()=>{
    const phoneRef=useRef();
    const passwordRef=useRef();
    const navigate=useNavigate();
    const [error,setError]=useState("");
    const handleClick=(e)=>{
        e.preventDefault();
        const phone=phoneRef.current.value;
        const password=passwordRef.current.value;
        axios.post("https://whatsgoingclone.herokuapp.com/user/authenticate",{
            phone,password
        }).then((response)=>{
            const {success,user,message}=response.data;
            if(success){
                localStorage.setItem('user',JSON.stringify(user._id));
                navigate('/home');
            }else{
                setError(message);
            }
        })
    }
    return <div className='w-screen h-screen relative bg-green-400'>
        <img src='/images/signin.jpg' alt='signin' className='w-full h-full md:opacity-0'/>
        <form className='absolute top-0 bottom-0 right-0 left-0 
        flex flex-col justify-center items-center'>
            <input ref={phoneRef} type='text' placeholder='Phone Number' className=' w-5/6 px-4 py-2 text-lg outline-none shadow-lg md:w-1/3 mb-4'/>
            {error&&<div className="text-red-600 text-md tracking-wide font-medium mb-2">{error}</div>}
            <input ref={passwordRef} type='text' placeholder='Password' className=' w-5/6 px-4 py-2 text-lg outline-none shadow-lg md:w-1/3 mb-4'/>
            <button onClick={handleClick} className='bg-green-700 text-white px-8 py-2 tracking-wider rounded shadow-lg m-4 text-lg'>Enter</button>
        </form>
    </div>
}

export default SignIn;