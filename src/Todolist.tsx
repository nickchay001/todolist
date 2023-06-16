import { FilterValuesType, TasksType } from "./App"
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import s from './App.module.css'

type PropsType = {
  title: string
  tasks: TasksType[]
  removeTask: (id: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTasks: (title: string, todolistId: string) => void
  changeIsDoneValue: (id: string, isDone: boolean, todolistId: string) => void
  filter: FilterValuesType
  id: string
  removeTodolist:(todolistId:string) => void
}
export const Todolist = (props: PropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }
  const addTasks = () => {
    if (newTaskTitle.trim() !== '') {
      props.addTasks(newTaskTitle.trim(), props.id)
      setNewTaskTitle('')
    } else {
      setError('Title is required')
    }
  }
  const onNewTitleKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.code === 'Enter') {
      addTasks()
    }
  }
  const onAllClickHandler = () => {
    props.changeFilter('all', props.id)
  }
  const onActiveClickHandler = () => {
    props.changeFilter('active', props.id)
  }
  const onComplitedClickHandler = () => {
    props.changeFilter('complited', props.id)
  }

  const removeTodolist = () => {
    props.removeTodolist(props.id)
  }


  const tasksList = props.tasks.map(t => {
    const onRemoveHandler = () => {
      props.removeTask(t.id, props.id)
    }
    const onChangeIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeIsDoneValue(t.id, e.currentTarget.defaultChecked, props.id)
    }
    return (
      <li className={t.isDone === true ? s.is_done : ''} key={t.id}>
        <input type='checkbox' defaultChecked={t.isDone}
          onChange={onChangeIsDoneHandler}
        />
        <span>{t.title}</span>
        <button onClick={onRemoveHandler}>X</button>
      </li>
    )
  }
  )

  return (
    <div>
      <h3>{props.title}<button onClick={removeTodolist}>x</button></h3>
      <div>
        <input value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyDown={onNewTitleKeyDownHandler}
          className={error ? s.error : ''}
        />
        <button onClick={addTasks}>+</button>
        {error && <div className={s.error_message}>{error}</div>}
      </div>
      <ul>
        {tasksList}
      </ul>
      <div>
        <button className={props.filter === 'all' ? s.active_filter : ''} onClick={onAllClickHandler}>All</button>
        <button className={props.filter === 'active' ? s.active_filter : ''} onClick={onActiveClickHandler}>Active</button>
        <button className={props.filter === 'complited' ? s.active_filter : ''} onClick={onComplitedClickHandler}>Completed</button>
      </div>
    </div>
  )
}