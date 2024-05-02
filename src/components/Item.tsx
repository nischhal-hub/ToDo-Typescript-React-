import React, { FC } from 'react';
import { Task } from '../interfaces';

interface Props{
    task:Task;
    deleteItem(id:number) : void;
    setIsEditing(v:boolean) : void;
    editItem(id:number):void;
}
const Item:FC<Props>= ({task,deleteItem, setIsEditing,editItem}) => {
    const handleClick = ()=>{
        setIsEditing(true);
        editItem(task.id);
    }
    return (
        <>
            <div className="item">
                <div className="text">
                    <p>{task.taskName}</p>
                    <span>Due Date :{task.date.toLocaleString().substring(0,8)}</span>
                </div>
                <div className="controls">
                    <button onClick={handleClick}>Edit</button>
                    <button onClick={()=>{deleteItem(task.id)}}>Delete</button>
                </div>
            </div>
        </>
    )
}

export default Item