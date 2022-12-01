import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from './store/authContext'

import Header from "./components/Header";
import Home from './components/Home'
import Auth from './components/Auth'
import Form from './components/workouts/Form'
import Profile from './components/Profile'
import Exercises from "./components/exercises/Exercises";

function App() {
  const authCtx = useContext(AuthContext)

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/exercises' element={<Exercises />} />
        <Route path='/auth' element={authCtx.token ? <Navigate to='/'/> : <Auth/> }/>
        <Route path='/form' element={authCtx.token ? <Form/> : <Navigate to='/auth'/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='*' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;