import { Typography} from '@mui/material';
import Logo from '../../../utility/images/clumsy.png'

const HeaderLogo = () => {
  return (
    <div title='Clamsy is a sample full-stack project developed by Ilias Kalamatas' className='logo'>
        <Typography variant='h4' className='logo-text'>Clamsy</Typography>
        <img className='logo-img'
          src={Logo}
          alt='clumsy-logo'
        />
      </div>
  )
}

export default HeaderLogo