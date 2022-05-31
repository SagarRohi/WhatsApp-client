import {Routes, Route} from 'react-router-dom';
import LogIn from './LogIn';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import Protected from './ProtectedRoute';
import ProtectHome from './ProtectHome';
const App=()=>{
  return <Routes>
    <Route path='/' element={<Protected path="/"><LogIn/></Protected>}/>
    <Route path='/signup' element={<Protected path="/signup"><SignUp/></Protected>}/>
    <Route path='/signin' element={<Protected path="/signin"><SignIn/></Protected>}/>
    <Route path='/home' element={<ProtectHome><Home/></ProtectHome>}/>
  </Routes>
}

export default App;