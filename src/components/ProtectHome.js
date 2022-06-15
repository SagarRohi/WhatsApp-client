import { Navigate } from "react-router-dom";
const ProtectHome=({children})=>{
    const user=localStorage.getItem('user');
    if(!user) return <Navigate to='/'/>
    return children;
}

export default ProtectHome;