import { ChangeEvent, FC, FormEvent, useState } from 'react'
import './App.css'
import Item from './components/Item'
import { Task } from './interfaces'

const App: FC = () => {
  const [taskName, setTaskName] = useState<string>("");
  const [date, setDate] = useState(new Date());
  const [list, setList] = useState<Task[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editID,setEditID] = useState<number>()

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.name === "task")
      setTaskName(e.target.value)
    else
      setDate(new Date(e.target.value))
  }

  const handleSubmit=(e: FormEvent<HTMLFormElement>):void=>{
    if(isEditing){
      let newList = list.map(item =>{
        if(item.id === editID){
          return {...item, taskName:taskName, date:date}
        }
        return item;
      })
      setList(newList)
      e.preventDefault()
      setIsEditing(false)
      setTaskName("")
      setDate(new Date())
    }
    else{
      let newTask:Task = {id:Number(new Date().getTime()),taskName:taskName, date:date}
      e.preventDefault();
      setList([...list, newTask])
      setTaskName("")
      setDate(new Date())
    }
  }

  const deleteItem = (id:number):void=>{
    let newList = list.filter(item=>item.id !== id)
    setList(newList);
  }

  const editItem = (id:number):void=>{
    const editTask= list.find(item=>item.id === id)
    setEditID(id)
    setTaskName(editTask?.taskName ?? "")
    setDate(editTask?.date ?? new Date())
  }

  return (
    <>
      <h2 className='title'>TODO</h2>
      <div className="toppart">
        <form onSubmit={handleSubmit}>
          <div className="input">
            <input type="text" placeholder='Eg. Do homework' name='task' value={taskName} onChange={handleChange} />
            <div className="date">
            <p>Due </p>
            <input type="date" name="date" value={date.toISOString().substring(0, 10)} onChange={handleChange} />
            </div>
          </div>
          <button type='submit' className="comic-button" >{isEditing?`Edit task`:`Add task`}</button>
        </form>
      </div>
      <div className="task">
        {
          list.map((item:Task,index:number)=>{
            return<>
            <Item key={index} task={item} deleteItem={deleteItem} setIsEditing={setIsEditing} editItem={editItem}/>
            </>
          })
        }
      </div>
    </>
  )
}

export default App
