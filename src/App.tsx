import SignInUI from './pages/Sign-in';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Error404 from './pages/Error404';
import Home from './pages/Home'
import './App.css'
import Card from './components/Card';

function App() {
  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<SignInUI/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route/>
        <Route path='*' element={<Error404/>}/>
      </Routes>
    </BrowserRouter>
    </>
    
  )
}


export default App