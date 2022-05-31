
import SideBar from "./Sidebar";
import Chat from './Chat';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {  setUser } from "./reducer";
import { useDispatch } from "react-redux";
import axios from "axios";

const Home=()=>{
    const dispatch=useDispatch(); 
    const user=useSelector((state)=>state.user);
    useEffect(()=>{
        const id=JSON.parse(localStorage.getItem('user'));
        axios.get(`https://whatsgoingclone.herokuapp.com/user/?id=${id}`)
          .then(function ({data}) {
            const {user}=data;
            dispatch(setUser(user));
          })
    },[])

    
    return <div className="w-screen h-screen bg-home flex justify-center items-center">
        <div className=" w-full md:w-11/12 h-full md:h-5/6 shadow-lg shadow-gray-400 bg-white
         flex ">
         {user&&<SideBar user={user}/>}
        {user&&<Chat user={user}/>}
        </div>
    </div>
}

export default Home;