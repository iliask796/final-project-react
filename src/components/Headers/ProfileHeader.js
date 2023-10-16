import React from 'react'
import '../../stylesheets/header.css'

import Button from '@mui/material/Button/Button'
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import HeaderLogo from './HeaderUtil/HeaderLogo';
import { useNavigate } from 'react-router-dom';

const ProfileHeader = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/workspace")
    }

    return (
        <div className='header'>
            <HeaderLogo />
            <Button variant='outlined' size='Medium' endIcon={<WorkspacesIcon />} onClick={handleClick} className='action-button'>Back to Workspace</Button>
        </div>
    )
}

export default ProfileHeader