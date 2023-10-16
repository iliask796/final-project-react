import '../../stylesheets/header.css'

import Button from '@mui/material/Button/Button'
import LoginIcon from '@mui/icons-material/Login';
import HeaderLogo from './HeaderUtil/HeaderLogo';
import { useNavigate } from 'react-router-dom';

const HomeHeader = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/workspace")
  }

  return (
    <div className='header'>
      <HeaderLogo />
      <Button variant='outlined' size='Medium' endIcon={<LoginIcon />} onClick={handleClick} className='action-button'>Login</Button>
    </div>
  )
}

export default HomeHeader