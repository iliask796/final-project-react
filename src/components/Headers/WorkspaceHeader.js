import '../../stylesheets/header.css'
import HeaderLogo from './HeaderUtil/HeaderLogo';
import UserAvatar from './HeaderUtil/UserAvatar';
import WorkspaceInfo from './HeaderUtil/WorkspaceInfo';

const WorkspaceHeader = (props) => {
    return (
        <div className='header'>
            <HeaderLogo />
            <WorkspaceInfo />
            <UserAvatar displayname={props.displayname} options={['Profile', 'Workspaces', 'Logout']} />
        </div>
    )
}

export default WorkspaceHeader