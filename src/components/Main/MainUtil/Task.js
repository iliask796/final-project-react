import {useContext, useState} from 'react'

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';
import swapElements from '../../../utility/swapElements';
import DataContext from '../../../utility/DataContext';

const Task = (props) => {
    const {taskId, name, description, position} = props.task;
    const {tasklistId} = props.task.tasklist
    const {listOfTasks} = props
    const {tasklists, tasks, setTasks} = useContext(DataContext)
    const [title, setTitle] = useState(name)
    const [desc, setDesc] = useState(description)
    const [syncState, setSyncState] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const popId = open ? 'simple-popover' : undefined;

    const updateTaskOrder = async (newPos) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: title, position: newPos, description: desc})
        }
        await fetch(`http://localhost:4000/tasks/${taskId}`, requestOptions)
    }

    const updateTask = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: title, position: position, description: desc})
        }
        await fetch(`http://localhost:4000/tasks/${taskId}`, requestOptions).then(
            response => response.json()).then(
                dataSet => {
                    if (dataSet.status === 'success'){
                        const taskIndex = tasks.findIndex(task => task.taskId === dataSet.data.taskId)
                        tasks[taskIndex].name = title
                        tasks[taskIndex].description = desc
                        setTasks([...tasks])
                    }
                })
    }

    const deleteTask = async () => {
        const requestOptions = {
            method: 'DELETE',
        }
        await fetch(`http://localhost:4000/tasks/${taskId}`, requestOptions)
    } 
    
    const moveTask = async (id, listId) => {
        const requestOptions = {
            method: 'PUT',
        }
        await fetch(`http://localhost:4000/tasks/${id}/move/${listId}`, requestOptions).then(
            response => response.json()).then(
                dataSet => {
                    if (dataSet.status === 'success'){
                        const tasksWithUpdate = tasks.map(task => {
                            if (task.taskId === id){
                                task.tasklist.tasklistId = listId
                                task.position = dataSet.data.position
                            }
                            return task
                        })
                        tasksWithUpdate.sort((task1,task2) => task1.position - task2.position)
                        setTasks([...tasksWithUpdate])
                    }
                })
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleDescChange = (event) => {
        setDesc(event.target.value)
    }

    const handleShiftUp = () => {
        if (position === listOfTasks[0].position){
            return
        }
        if (!syncState){
            setSyncState(true)
            const thisIndexFromList = listOfTasks.findIndex(task => task.position === position)
            const prevTaskId = listOfTasks[thisIndexFromList-1].taskId
            const prevIndexFromTasks = tasks.findIndex(task => task.taskId === prevTaskId)
            const prevPos = tasks[prevIndexFromTasks].position
            const thisIndexFromTasks = tasks.findIndex(task => task.taskId === taskId)
            swapElements(tasks, thisIndexFromTasks, prevPos, prevIndexFromTasks, position)
            setTasks([...tasks])
            updateTaskOrder(prevPos).then(setSyncState(false))
        }
    }

    const handleShiftDown = () => {
        if (position === listOfTasks[listOfTasks.length-1].position){
            return
        }
        if (!syncState){
            setSyncState(true)
            const thisIndexFromList = listOfTasks.findIndex(task => task.position === position)
            const nextTaskId = listOfTasks[thisIndexFromList+1].taskId
            const nextIndexFromTasks = tasks.findIndex(task => task.taskId === nextTaskId)
            const nextPos = tasks[nextIndexFromTasks].position
            const thisIndexFromTasks = tasks.findIndex(task => task.taskId === taskId)
            swapElements(tasks, thisIndexFromTasks, nextPos, nextIndexFromTasks, position)
            setTasks([...tasks])
            updateTaskOrder(nextPos).then(setSyncState(false))
        }
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        updateTask().then(setAnchorEl(null))
    };

    const handleMoveLeft = () => {
        if (tasklistId === tasklists[0].tasklistId){
            setAnchorEl(null)
            return
        }
        if (!syncState){
            setSyncState(true)
            const thisIndex = tasklists.findIndex(list => list.tasklistId === tasklistId)
            const prevListId = tasklists[thisIndex-1].tasklistId
            moveTask(taskId, prevListId).then(setSyncState(false))
        }
    }

    const handleMoveRight = () => {
        if (tasklistId === tasklists[tasklists.length-1].tasklistId){
            setAnchorEl(null)
            return
        }
        if (!syncState){
            setSyncState(true)
            const thisIndex = tasklists.findIndex(list => list.tasklistId === tasklistId)
            const nextListId = tasklists[thisIndex+1].tasklistId
            moveTask(taskId, nextListId).then(setSyncState(false))
        }
    }

    const handleDelete = () => {
        deleteTask().then(() => {
            const deleteIndex = tasks.findIndex(task => task.taskId === taskId)
            tasks.splice(deleteIndex,1)
            setTasks([...tasks])
            setAnchorEl(null);
        })  
    }

    return (
        <>
            <ListItem 
                key={taskId}
                className='list-item'
                secondaryAction={
                    <>
                        <IconButton edge="end" aria-label="shift-up" onClick={handleShiftUp}>
                            <KeyboardArrowUpIcon fontSize='small'/>
                        </IconButton>
                        <IconButton edge="end" aria-label="shift-down" onClick={handleShiftDown}>
                            <KeyboardArrowDownIcon fontSize='small'/>
                        </IconButton>
                    </>
                }
            >
                <ListItemText
                    primary={name}
                    secondary= {
                        description ?
                        <SpeakerNotesIcon fontSize='small' /> :
                        <SpeakerNotesOffIcon fontSize='small'/>
                        }
                    className='list-item-text'
                    onClick={handleClick}
                />
            </ListItem>
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
                    <TextField id="outlined-basic-1" label="Title" value={title} multiline variant="outlined" sx={{m:0.5}} onChange={handleTitleChange}/>
                    <TextField id="outlined-basic-2" label="Description" value={desc?desc:''} multiline variant="outlined" sx={{m:0.5}} onChange={handleDescChange}/>
                    <Fab onClick={handleMoveLeft} color='success' variant='extended' aria-label="move-left" sx={{m:0.5, backgroundColor: "#00A36C"}}>
                        Move Left
                    </Fab>
                    <Fab onClick={handleMoveRight} color='success' variant='extended' aria-label="move-right" sx={{m:0.5, backgroundColor: "#00A36C"}}>
                        Move Right
                    </Fab>
                    <Fab onClick={handleDelete} color='success' variant='extended' aria-label="delete" sx={{m:0.5, backgroundColor: "#00A36C"}}>
                        Delete
                    </Fab>
                </Paper>
            </Popover>
        </>
    )
}

export default Task