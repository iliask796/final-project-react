import { Route, Routes } from "react-router-dom";
import './stylesheets/app.css'
import HomePage from "./pages/HomePage";
import Workspace from "./pages/Workspace"
import Profile from "./pages/Profile"
import { useEffect, useState } from "react";
import DataContext from "./DataContext";

function App() {
  const [user, setUser] = useState(null)
  const [userLoad, setUserLoad] = useState(false)
  const [workspace, setWorkspace] = useState(null)
  const [tasklists, setTasklists] = useState(null)
  const [renderTasklists, setRenderTasklists] = useState(0)
  const [syncState, setSyncState] = useState(false)

  async function getUser() {
    const response = await fetch('http://localhost:4000/users/1')
    const json = await response.json()
    if (json.status === 'success'){
      setUser(json.data)
      setUserLoad(true)
    }
  }

  async function getWorkspace() {
    const url = 'http://localhost:4000/workspaces/' + user.workspace.workspaceId
    const response = await fetch(url)
    const json = await response.json()
    if (json.status === 'success'){
      setWorkspace(json.data)
    }
  }

  async function getTasklists() {
    const url = 'http://localhost:4000/workspaces/' + user.workspace.workspaceId + '/tasklists'
    const response = await fetch(url)
    const json = await response.json()
    if (json.status === 'success'){
      setTasklists(json.data)
    }
  }

  useEffect(() => {
    getUser()
  },[])

  useEffect(() => {
    if (userLoad){
      getWorkspace()
    }
  },[userLoad])

  useEffect(() => {
    if (userLoad){
      getTasklists()
    }
  },[userLoad, renderTasklists])

  const doRenderTasklists = () => {
    setRenderTasklists(renderTasklists + 1)
  }

  return (
    <div className='app'>
      <DataContext.Provider value = {{ user, workspace, tasklists, setTasklists, doRenderTasklists, syncState, setSyncState}}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workspace/:id" element={<Workspace />} />
          <Route path="/profile/:id" element={<Profile/>} />
        </Routes>
      </DataContext.Provider>
    </div>
  )
}

export default App;
