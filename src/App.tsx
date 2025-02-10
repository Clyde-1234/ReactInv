import SignInUI from './pages/Sign-in';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import Error404 from './pages/Error404';
import Home from './pages/Home'
import './App.css'
import { sessionAtom } from "./atoms";
import { useAtom } from "jotai";

interface MainProps{
    children: ReactNode
}

function ProtectedRoute({ children }: MainProps) {
  const [session, setSession] = useAtom(sessionAtom);

  if (session === null) {
    setSession(null); // Ensure session stays null
    return <Navigate to="/" replace />;
  }

  return children;
}


function App() {
  // router for page change via components
  return(
    <BrowserRouter>
      <Routes>
        <Route index element={<SignInUI/>}/>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<Error404/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}


export default App