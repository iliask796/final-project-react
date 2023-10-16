import { Typography} from '@mui/material';

const HeaderLogo = () => {
  return (
    <div className='logo'>
        <Typography variant='h4' className='logo-text'>Clamsy</Typography>
        <img className='logo-img'
          src='clumsy.png'
          alt='clumsy-logo'
        />
      </div>
  )
}

export default HeaderLogo