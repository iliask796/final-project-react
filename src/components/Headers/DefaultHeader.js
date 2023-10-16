import '../../stylesheets/header.css'

import Button from '@mui/material/Button/Button'
import HeaderLogo from './HeaderUtil/HeaderLogo';
import { useNavigate } from 'react-router-dom';

const DefaultHeader = (props) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/workspace")
  }

  return (
    <div className='header'>
      <HeaderLogo />
      <Button variant='outlined' size='Medium' endIcon={props.icon} onClick={handleClick} className='action-button'>{props.name}</Button>
    </div>
  )
}

export default DefaultHeader