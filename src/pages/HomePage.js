import React from 'react'
import DefaultHeader from '../components/Headers/DefaultHeader'
import LoginIcon from '@mui/icons-material/Login';
import HomeMain from '../components/Main/HomeMain';

const HomePage = () => {
    return (
        <>
            <DefaultHeader name={"Login"} icon={<LoginIcon />}/>
            <HomeMain />
        </>
    )
}

export default HomePage