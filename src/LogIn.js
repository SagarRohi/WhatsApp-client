import { Link } from "react-router-dom";

const LogIn=()=>{
    return <div className='w-screen h-screen'>
        <img src='/images/undraw.svg' className='mx-auto h-2/4 md:h-3/4 ' alt='login'/>
        <Link  to='/signin' className='text-white px-8 py-2 
        bg-green-800 mt-8 block mx-auto uppercaser rounded text-xl tracking-wider w-max'>Enter</Link>
        <Link to='/signup' className='text-teal-9000 bg-white text-lg px-4 
        py-2 block w-max mx-auto mt-8 md:mt-4 rounded border-2 border-gray-400'> Create New Account</Link>
    </div>
}
export default LogIn;