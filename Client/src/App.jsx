import React from 'react'
import User from './getuser/User'
import {Route, Routes } from 'react-router-dom'
import AddUser from './adduser/AddUser'
import Update from './updateuser/Update'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element = {<User/>}/>
        <Route path='/add' element = {<AddUser/>}/>
        <Route path='/update/:id' element={<Update/>}/>
      </Routes>
    
    </div>
  )
}

export default App