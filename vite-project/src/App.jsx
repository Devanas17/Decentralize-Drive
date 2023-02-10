import { useState, useContext } from 'react'
import './App.css'
import Feed from './components/Feed'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { AppContext } from './context/context'


function App() {
const {addFile} = useContext(AppContext)
const name = "Aman"
const img = "https://images.pexels.com/photos/14567053/pexels-photo-14567053.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
  return (
    <div className="App">
        <Navbar />
      <main className="flex">
        <Sidebar />
        <Feed />
      </main>
    </div>
  )
}

export default App
