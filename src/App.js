import { Route, Routes } from "react-router-dom";
import './stylesheets/app.css'
import HomePage from "./pages/HomePage";
import Workspace from "./pages/Workspace"
import Profile from "./pages/Profile"
import { useEffect, useState } from "react";
import DataContext from "./utility/DataContext";
import UserWorkspaces from "./pages/UserWorkspaces";

function App() {
  const [user, setUser] = useState(null)
  const [userLoad, setUserLoad] = useState(false)
  const [listOfWorkspaces, setListOfWorkspaces] = useState(null)
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState(null)
  const [workspace, setWorkspace] = useState(null)
  const [tasklists, setTasklists] = useState(null)
  const [tasks, setTasks] = useState(null)

  async function getUser() {
    const response = await fetch('http://localhost:4000/users/1')
    const json = await response.json()
    if (json.status === 'success'){
      setUser(json.data)
      setUserLoad(true)
    }
  }

  async function getWorkspacesList() {
    const response = await fetch('http://localhost:4000/users/1/workspaces')
    const json = await response.json()
    if (json.status === 'success'){
      setListOfWorkspaces(json.data)
    }
  }

  async function getWorkspace() {
    const url = 'http://localhost:4000/workspaces/'+currentWorkspaceId
    const response = await fetch(url)
    const json = await response.json()
    if (json.status === 'success'){
      setWorkspace(json.data)
    }
  }

  async function getTasklists() {
    const url = `http://localhost:4000/workspaces/${currentWorkspaceId}/tasklists`
    const response = await fetch(url)
    const json = await response.json()
    if (json.status === 'success'){
      setTasklists(json.data)
    }
  }

  async function getTasks() {
    const url = 'http://localhost:4000/tasks'
    const response = await fetch(url)
    const json = await response.json()
    if (json.status === 'success'){
        setTasks([...json.data])
    }
  }

  useEffect(() => {
    getUser()
  },[])

  useEffect(() => {
    if (userLoad){
      getWorkspacesList()
      
    }
  },[userLoad])

  useEffect(() => {
    if (currentWorkspaceId){
      getWorkspace()
      getTasklists()
    } else {
      setWorkspace(null)
      setTasklists(null)
    }
  },[currentWorkspaceId])

  useEffect(() => {
    getTasks()
  },[])

  return (
    <div className='app'>
      <DataContext.Provider value = {{ user, listOfWorkspaces, setListOfWorkspaces, currentWorkspaceId, setCurrentWorkspaceId, workspace, setWorkspace, tasklists, setTasklists, tasks, setTasks}}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/:id/workspaces" element={<UserWorkspaces/>} />
          <Route path="/workspace/:id" element={<Workspace />} />
          <Route path="/profile/:id" element={<Profile/>} />
        </Routes>
      </DataContext.Provider>
    </div>
  )
}

export default App;
