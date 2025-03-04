import SignInUI from './pages/SignIn';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import Error404 from './pages/Error404';
import Home from './pages/Home'
import './App.css'
import { sessionAtom } from "./atoms";
import { useAtom } from "jotai";
import Inventory from './pages/Inventory';
import ItemGroups from './pages/ItemGroups';
import ClientPage from './pages/ClientPage';
import StoreHouse from './pages/StoreHouse';
import Signup from './pages/SignUp';
import Prelim from './componentPrelimsFiles/page/prelim';

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
        <Route
          path="/clients"
          element={
            <ProtectedRoute>
              <ClientPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/itemgroups"
          element={
            <ProtectedRoute>
              <ItemGroups />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/storehouse"
          element={
            <ProtectedRoute>
              <StoreHouse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <Signup />
          }
        />
        <Route
          path='/prelim'
          element={
            <Prelim/>
          }
        
        />
        <Route path='*' element={<Error404/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}


export default App