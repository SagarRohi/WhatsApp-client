import { Navigate } from "react-router-dom";
const Protected=({children,path})=>{
    const user=localStorage.getItem('user');
    if(user) return <Navigate to='/home'/>
    if(path==='/home') return <Navigate to='/'/>
   return children; 
}

export default Protected;