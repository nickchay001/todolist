import { useState } from 'react';
import s from './App.module.css'
import { Todolist } from './Todolist';
import { v1 } from 'uuid';

export type TasksType = {
  id: string
  title: string
  isDone: boolean
}
export type FilterValuesType = 'active' | 'all' | 'complited'

function App() {
  let [tasks, setTasks] = useState<TasksType[]>([
    { id: v1(), title: 'CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },
  ])
  let [filter, setFilter] = useState<FilterValuesType>('all')

  const removeTask = (id: string) => {
    let resultTasks = tasks.filter(t => t.id !== id)
    setTasks(resultTasks)
  }

  const addTasks = (title: string) => {
    let newTask = { id: v1(), title: title, isDone: false }
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

  const changeIsDoneValue = (id: string) => {
    let resultTasks = tasks.filter(t => {
      if (t.id === id){
        if(t.isDone === false) {
          t.isDone = true
        } else if (t.isDone === true) {
          t.isDone = false
        }
      } 
      return tasks
    })
    console.log(resultTasks)
    setTasks(resultTasks)
  }

  const changeFilter = (value: FilterValuesType) => {
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
      <Todolist changeIsDoneValue={changeIsDoneValue} addTasks={addTasks} changeFilter={changeFilter} tasks={tasksForTodolist} title='What to learn ?' removeTask={removeTask} />
    </div>
  );
}


export default App;
