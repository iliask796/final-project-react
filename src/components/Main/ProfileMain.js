import React, { useContext, useState } from 'react'
import '../../stylesheets/profile.css'
import { useParams } from 'react-router-dom';

import stringAvatar from '../../utility/stringAvatar'
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DataContext from '../../utility/DataContext';

const ProfileMain = (props) => {
    const {user, setUser} = useContext(DataContext)
    const [display, setDisplay] = useState(user.displayName)
    const {id} = useParams()

    const handleChange = (event) => {
        setDisplay(event.target.value)
    }

    const updateDisplayName = async (event) => {
        event.preventDefault()
        setUser({...user, displayName: display})
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: user.email, displayName: user.displayName})
        }
        await fetch(`http://localhost:4000/users/${id}`, requestOptions)
    }

    return (
        user &&
        <div className='profile-main'>
            <div className='profile-tab'>
                <Avatar {...stringAvatar(user.displayName)} className='my-avatar'/>
                <form className='my-info'>
                    <Typography variant='h4' className='my-info-title'>Manage my account</Typography>
                    <TextField
                        fullWidth
                        label="Email"
                        defaultValue={user.email}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                        className='my-info-text'
                    />
                    <TextField
                        fullWidth
                        required
                        label="Display Name"
                        value={display}
                        variant="standard"
                        className='my-info-text'
                        onChange={handleChange}
                    />
                    <Typography variant='h6' className='my-info-extra'>Note: Email cannot be <br/>changed at the moment.</Typography>
                    <Button type="submit" variant="contained" size="large" className='my-info-action' onClick={updateDisplayName}>Save</Button>
                </form>
            </div>
        </div>
    )
}

export default ProfileMain