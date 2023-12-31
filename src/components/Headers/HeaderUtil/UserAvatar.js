import stringAvatar from '../../../utility/stringAvatar';
import { useContext, useState } from 'react';

import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import DataContext from '../../../utility/DataContext';


const UserAvatar = (props) => {
    const settings = props.options;
    const navigate = useNavigate();
    const {user, setCurrentWorkspaceId} = useContext(DataContext)

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOption = (setting) => {
        if (setting === 'Profile'){
            navigate(`/profile/${user.userId}`)
        } else if (setting === 'Workspaces') {
            navigate("/user/1/workspaces")
            setCurrentWorkspaceId(null)
        } else if (setting === 'Logout') {
            navigate("/")
        }
    }

    return (
        <div className='user-avatar'>
            <IconButton onClick={handleOpenUserMenu} className='avatar-frame'>
                <Avatar {...stringAvatar(props.displayname)} className='avatar'/>
            </IconButton>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleOption(setting)}>
                    <Typography sx={{width:'100%'}} textAlign="center">{setting}</Typography>
                </MenuItem>
                ))}
            </Menu>
        </div>
    )
}

export default UserAvatar