import { useState, useContext } from 'react'
import '../../stylesheets/workspace.css'

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Tasklist from './MainUtil/Tasklist';
import DataContext from '../../DataContext';
import Popover from '@mui/material/Popover';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import { useParams } from 'react-router-dom';

const WorkspaceMain = () => {
    const { tasklists, setTasklists} = useContext(DataContext)
    const [title, setTitle] = useState('')
    const {id} = useParams()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const popId = open ? 'simple-popover' : undefined;

    const createList = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: title?title:'New List', position: tasklists.length!==0?(tasklists[tasklists.length-1].position)+1:1})
        }
        await fetch(`http://localhost:4000/workspaces/${id}/tasklists`, requestOptions).then(
            response => response.json()).then(
                dataSet => {
                    if (dataSet.status === 'success'){
                        tasklists.push(dataSet.data)
                        setTasklists([...tasklists])
                    }
                }
            )
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setTitle('')
        setAnchorEl(null);
    };

    const handleCreate = () => {
        createList().then(() => {
            setTitle('')
            setAnchorEl(null);
        })  
    }

    return (
        tasklists &&
        <div className='workspace'>
            <div className='list-container'>
                {
                    tasklists.map((list) => {
                        return <Tasklist key={list.tasklistId} list={list}/>
                    })
                }
                <IconButton edge="end" aria-label="add-list" className='list-add' onClick={handleClick}>
                        <AddIcon />
                </IconButton>
                <Popover
                    id={popId}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Paper elevation={3} sx={{p: 1, display:'flex', alignItems: 'center', justifyContent:'center'}}>
                        <TextField id="outlined-basic-1" label="Title" value={title} onChange={handleTitleChange} multiline variant="outlined" sx={{m:0.5}}/>
                        <Fab onClick={handleCreate} color='success' variant='extended' aria-label="delete" sx={{m:0.5, backgroundColor: "#00A36C"}}>
                            Create
                        </Fab>
                    </Paper>
                </Popover>
            </div>
        </div>
    )
}

export default WorkspaceMain