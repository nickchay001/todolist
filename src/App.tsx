import { useState } from 'react';
import s from './App.module.css'
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';

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

type TasksStateType = {
  [key: string]: Array<TasksType>
}
function App() {


  const todolistId1 = v1()
  const todolistId2 = v1()
  let [tasksObj, setTasksObj] = useState<TasksStateType>({
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

  let removeTodolist = (todolistId: string) => {
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(filteredTodolist)
    delete tasksObj[todolistId]
    setTasksObj({ ...tasksObj })
  }

  const removeTask = (id: string, todolistId: string) => {
    debugger
    let tasks = tasksObj[todolistId]
    let resultTasks = tasks.filter(t => t.id !== id)
    tasksObj[todolistId] = resultTasks
    setTasksObj({ ...tasksObj })
  }

  const addTask = (title: string, todolistId: string) => {
    let newTask = { id: v1(), title: title, isDone: false }
    let tasks = tasksObj[todolistId]
    let newTasks = [newTask, ...tasks]
    tasksObj[todolistId] = newTasks
    setTasksObj({ ...tasksObj })
  }

  const changeIsDoneValue = (id: string, isDone: boolean, todolistId: string) => {
    let tasks = tasksObj[todolistId]
    let task = tasks.find(t => t.id === id)
    if (task) {
      task.isDone = !isDone
      setTasksObj({ ...tasksObj })
    }
  }

  const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
    let tasks = tasksObj[todolistId]
    let task = tasks.find(t => t.id === id)
    if (task) {
      task.title = newTitle
      setTasksObj({ ...tasksObj })
    }
  }

  const changeTodolistTitle = (id: string, newTitle: string) => {
    const todolist = todolists.find(tl => tl.id === id)
    if(todolist) {
      todolist.title = newTitle
      setTodolists([...todolists])
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
    { id: todolistId1, title: 'What to learn?', filter: 'all' },
    { id: todolistId2, title: 'What to buy?', filter: 'all' }
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
      <div className={s.todolist}>
        <Todolist
          changeTodolistTitle={changeTodolistTitle}
          changeTaskTitle={changeTaskTitle}
          removeTodolist={removeTodolist}
          key={tl.id} id={tl.id}
          filter={tl.filter}
          changeIsDoneValue={changeIsDoneValue}
          addTask={addTask} changeFilter={changeFilter}
          tasks={tasksForTodolist}
          title={tl.title}
          removeTask={removeTask} />
      </div>
    )
  })


  const addTodolist = (title: string) => {
    let todolist: TodolistsType = {
      id: v1(),
      filter: 'all',
      title: title
    }
    setTodolists([todolist, ...todolists])
    setTasksObj({
      ...tasksObj,
      [todolist.id]: []
    })
  }

  return (
    <div className={s.app}>
      <AddItemForm addItem={addTodolist} />
      <div className={s.todolists}>
        {todolistsMap}
      </div>
    </div>
  );
}


export default App;
