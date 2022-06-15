import {Routes, Route} from 'react-router-dom';
import {LogIn,SignIn,SignUp,Home,ProtectHome,Protected} from './components';
const App=()=>{
  return <Routes>
    <Route path='/' element={<Protected path="/"><LogIn/></Protected>}/>
    <Route path='/signup' element={<Protected path="/signup"><SignUp/></Protected>}/>
    <Route path='/signin' element={<Protected path="/signin"><SignIn/></Protected>}/>
    <Route path='/home' element={<ProtectHome><Home/></ProtectHome>}/>
  </Routes>
}

export default App;