import { useState } from 'react';
import s from './App.module.css'
import { Todolist } from './Todolist';

export type TasksType = {
  id: number
  title: string
  isDone: boolean
} 
export type FilterValuesType = 'active' | 'all' | 'complited'

function App() {
  let [tasks, setTasks] = useState<TasksType[]>([
    { id: 1, title: 'CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'React', isDone: false },
    { id: 4, title: 'Redux', isDone: false },
  ])
  let [filter, setFilter] = useState<FilterValuesType>('all')
 
  const removeTask = (id: number) => {
    let resultTasks = tasks.filter(t => t.id !== id)
    setTasks(resultTasks)
  }

  const changeFilter = (value:FilterValuesType) => {
    setFilter(value)
  }

  let tasksForTodolist = tasks
  if (filter === 'complited') {
    tasksForTodolist = tasks.filter(t => t.isDone === true)
  }
  if (filter === 'active') {
    tasksForTodolist = tasks.filter(t => t.isDone === false)
  }

 


  return (
    <div className={s.app}>
      <Todolist changeFilter={setFilter} tasks={tasksForTodolist} title='What to learn ?' removeTask={removeTask} />
    </div>
  );
}


export default App;
