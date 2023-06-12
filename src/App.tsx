import s from './App.module.css'
import { Todolist } from './Todolist';

export type TasksType = {
  id:number
  title:string
  isDone:boolean
}

function App() {
 
  let tasks1:TasksType[] = [
    {id:1, title:'CSS', isDone:true},
    {id:2, title:'JS', isDone:true},
    {id:3, title:'React', isDone:false},
  ]

  let tasks2:TasksType[] = [
    {id:1, title:'Terminator', isDone:true},
    {id:2, title:'XXX', isDone:false},
    {id:3, title:'Jentelments of fortune', isDone:true},
  ]

  return (
    <div className={s.app}>
      <Todolist tasks={tasks1} title='What to learn ?' />
      <Todolist tasks={tasks2} title='Movies' />
    </div>
  );
}


export default App;
