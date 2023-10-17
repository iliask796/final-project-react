import { Typography} from '@mui/material';

const HeaderLogo = () => {
  return (
    <div title='Clamsy is a sample full-stack project developed by Ilias Kalamatas' className='logo'>
        <Typography variant='h4' className='logo-text'>Clamsy</Typography>
        <img className='logo-img'
          src='clumsy.png'
          alt='clumsy-logo'
        />
      </div>
  )
}

export default HeaderLogo