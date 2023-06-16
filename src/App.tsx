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

export type TodolistsType = {
  id: string
  title: string
  filter: FilterValuesType
}
function App() {


  const todolistId1 = v1()
  const todolistId2 = v1()
  let [tasksObj, setTasksObj] = useState({
    [todolistId1]: [
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'Redux', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: 'Bread', isDone: true },
      { id: v1(), title: 'Solt', isDone: true },
    ]
  })

  let removeTodolist = (todolistId:string) => {
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(filteredTodolist)
    delete tasksObj[todolistId]
    setTasksObj({...tasksObj})
  }

  const removeTask = (id: string, todolistId: string) => {
    debugger
    let tasks = tasksObj[todolistId]
    let resultTasks = tasks.filter(t => t.id !== id)
    tasksObj[todolistId] = resultTasks
    setTasksObj({ ...tasksObj })
  }

  const addTasks = (title: string, todolistId: string) => {
    let newTask = { id: v1(), title: title, isDone: false }
    let tasks = tasksObj[todolistId]
    let newTasks = [newTask, ...tasks]
    tasksObj[todolistId] = newTasks
    setTasksObj({ ...tasksObj })
  }

  const changeIsDoneValue = (id: string, isDone: boolean, todolistId: string) => {
    let tasks =  tasksObj[todolistId]
    let task = tasks.find(t => t.id === id)
    if (task) {
      task.isDone = !isDone
      setTasksObj({...tasksObj})
    }
  }




  const changeFilter = (value: FilterValuesType, todolistId: string) => {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.filter = value
      setTodolists([...todolists])
    }
  }



  let [todolists, setTodolists] = useState<TodolistsType[]>([
    { id: todolistId1, title: 'What to learn?', filter: 'active' },
    { id: todolistId2, title: 'What to buy?', filter: 'complited' }
  ])



  const todolistsMap = todolists.map(tl => {
    let tasksForTodolist = tasksObj[tl.id]
    if (tl.filter === 'complited') {
      tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
    }
    if (tl.filter === 'active') {
      tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
    }
    return (
      <div className={s.app}>
        <Todolist removeTodolist={removeTodolist} key={tl.id} id={tl.id} filter={tl.filter} changeIsDoneValue={changeIsDoneValue} addTasks={addTasks} changeFilter={changeFilter} tasks={tasksForTodolist} title={tl.title} removeTask={removeTask} />
      </div>
    )
  })
  return (
    <div className={s.app}>
      {todolistsMap}
    </div>
  );
}


export default App;
