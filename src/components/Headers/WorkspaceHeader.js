import '../../stylesheets/header.css'
import HeaderLogo from './HeaderUtil/HeaderLogo';
import UserAvatar from './HeaderUtil/UserAvatar';
import WorkspaceInfo from './HeaderUtil/WorkspaceInfo';

const WorkspaceHeader = (props) => {
    return (
    <div className='header'>
        <HeaderLogo />
        <WorkspaceInfo title={'My Management Tool'} date={'10-31-2023'}/>
        <UserAvatar displayname={props.displayname} options={['Profile', 'Logout']} />
    </div>
    )
}

export default WorkspaceHeader