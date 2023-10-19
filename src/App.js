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

  async function getUser() {
    const response = await fetch('http://localhost:4000/users/1')
    const json = await response.json()
    if (json.status === 'success'){
      setUser(json.data)
      setUserLoad(true)
    }
  }

  async function getWorkspaceData() {
    const url = 'http://localhost:4000/workspaces/' + user.workspace.workspaceId
    const response = await fetch(url)
    const json = await response.json()
    if (json.status === 'success'){
      setWorkspace(json.data)
    }
    const url2 = 'http://localhost:4000/workspaces/' + user.workspace.workspaceId + '/tasklists'
    const response2 = await fetch(url2)
    const json2 = await response2.json()
    if (json2.status === 'success'){
      setTasklists(json2.data)
    }
  }

  useEffect(() => {
    getUser()
  },[])

  useEffect(() => {
    if (userLoad){
      getWorkspaceData()
    }
  },[userLoad])

  return (
    <div className='app'>
      <DataContext.Provider value = {{ user, workspace, tasklists }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </DataContext.Provider>
    </div>
  )
}

export default App;
