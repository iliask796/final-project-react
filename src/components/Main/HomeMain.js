import React from 'react'
import '../../stylesheets/main.css'
import { Typography } from '@mui/material'
import Image1 from '../../utility/images/home-image-1.jpg'
import Image2 from '../../utility/images/home-image-2.jpg'
import Image3 from '../../utility/images/home-image-3.jpg'
import Image4 from '../../utility/images/home-image-4.jpg'

const HomeMain = () => {
    return (
        <div className='main'>
            <div className='img-area-1'>
                <img
                    title='TACKLE TO-DO LISTS WITH EASE'
                    src = {Image2}
                    alt = 'home-img-2'
                    className='img'
                />
                <img
                    title='STAY ORGANISED ON THE GO'
                    src = {Image4}
                    alt = 'home-img-4'
                    className='img'
                />
            </div>
            <div className='description'>
                <Typography className='home-text'>
                    <u>Clamsy</u> is a visual tool for organizing your work and life. 
                </Typography>
                <Typography className='home-text'>
                    <br/>Whether you're planning a work/school project or a vacation 
                </Typography>
                <Typography className='home-text'>
                    Clamsy will suit your needs.
                </Typography>
                <Typography className='home-text'>
                    <br/><i>-- TACKLE TO-DO LISTS WITH EASE --</i>
                </Typography>
                <Typography className='home-text'>
                    <i>-- MINIMIZE THE MENTAL LOAD --</i>
                </Typography>
                <Typography className='home-text'>
                    <i>-- STAY ORGANISED ON THE GO  --</i>
                </Typography>
                <Typography className='home-text'>
                    <br/>Trade in the sticky notes (and mental notes) for <u>Clamsy</u>.
                </Typography>
                <Typography className='home-link'>
                    <br/>Register here today!
                </Typography>
            </div>
            <div className='img-area-2'>
                <img
                    title='MINIMIZE THE MENTAL LOAD'
                    src = {Image3}
                    alt = 'home-img-3'
                    className='img'
                />
                <img
                    title='TRADE IN STICKY NOTES FOR CLAMSY'
                    src = {Image1}
                    alt = 'home-img-1'
                    className='img'
                />
            </div>
        </div>
    )
}

export default HomeMain