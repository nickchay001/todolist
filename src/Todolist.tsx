import { FilterValuesType, TasksType } from "./App"
import { ChangeEvent, KeyboardEvent, useState } from 'react'

type PropsType = {
  title: string
  tasks: TasksType[]
  removeTask: (id: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTasks: (title: string) => void
  changeIsDoneValue: (id: string) => void
}
export const Todolist = (props: PropsType) => {
  let [newTaskTitle, setNewTaskTitle] = useState('')

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }
  const onNewTitleKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      props.addTasks(newTaskTitle)
      setNewTaskTitle('')
    }
  }
  const addTasks = () => {
    props.addTasks(newTaskTitle)
    setNewTaskTitle('')
  }
  const onAllClickHandler = () => {
    props.changeFilter('all')
  }
  const onActiveClickHandler = () => {
    props.changeFilter('active')
  }
  const onComplitedClickHandler = () => {
    props.changeFilter('complited')
  }

  const tasksList = props.tasks.map(t => {
    const onRemoveHandler = () => {
      props.changeIsDoneValue(t.id)
    }
    return (
      <li key={t.id}>
        <input type='checkbox' defaultChecked={t.isDone}
          onClick={onRemoveHandler}
        />
        <span>{t.title}</span>
        <button onClick={() => { props.removeTask(t.id) }}>X</button>
      </li>
    )
  }
  )

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyDown={onNewTitleKeyDownHandler}
        />
        <button onClick={addTasks}>+</button>
      </div>
      <ul>
        {tasksList}
      </ul>
      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onComplitedClickHandler}>Completed</button>
      </div>
    </div>
  )
}