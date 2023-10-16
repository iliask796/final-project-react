import { Route, Routes } from "react-router-dom";
import './stylesheets/app.css'
import HomePage from "./pages/HomePage";
import Workspace from "./pages/Workspace"
import Profile from "./pages/Profile"

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App;
