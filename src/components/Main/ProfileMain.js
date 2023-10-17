import React from 'react'
import '../../stylesheets/profile.css'

import stringAvatar from '../../utility/stringAvatar'
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

const ProfileMain = (props) => {
    return (
        <div className='profile-main'>
            <div className='profile-tab'>
                <Avatar {...stringAvatar(props.displayname)} className='my-avatar'/>
                <form className='my-info'>
                    <Typography variant='h4' className='my-info-title'>Manage my account</Typography>
                    <TextField
                        fullWidth
                        label="Email"
                        defaultValue={props.email}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                        className='my-info-text'
                    />
                    <TextField
                        fullWidth
                        required
                        label="Password"
                        defaultValue={props.password}
                        variant="standard"
                        className='my-info-text'
                    />
                    <TextField
                        fullWidth
                        required
                        label="Display Name"
                        defaultValue={props.displayname}
                        variant="standard"
                        className='my-info-text'
                    />
                    <Typography variant='h6' className='my-info-extra'>Note: Email cannot be changed.</Typography>
                    <Button type="submit" variant="contained" size="large" className='my-info-action'>Submit</Button>
                </form>
            </div>
        </div>
    )
}

export default ProfileMain