import React from 'react'
import DefaultHeader from '../components/Headers/DefaultHeader'
import LoginIcon from '@mui/icons-material/Login';
import HomeMain from '../components/Main/HomeMain';

const HomePage = () => {
    return (
        <>
            <DefaultHeader name={"Login"} icon={<LoginIcon />} location={'/user/1/workspaces'}/>
            <HomeMain />
        </>
    )
}

export default HomePage