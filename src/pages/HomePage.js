import React from 'react'
import DefaultHeader from '../components/Headers/DefaultHeader'
import LoginIcon from '@mui/icons-material/Login';

const HomePage = () => {
    return (
        <>
            <DefaultHeader name={"Login"} icon={<LoginIcon />}/>
        </>
    )
}

export default HomePage