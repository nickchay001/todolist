import { FilterValuesType, TasksType } from "./App"
import { ChangeEvent } from 'react'
import s from './App.module.css'
import { AddItemForm } from "./AddItemForm"
import { EditableSpan } from "./EditableSpan"

type PropsType = {
  title: string
  tasks: TasksType[]
  removeTask: (id: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeIsDoneValue: (id: string, isDone: boolean, todolistId: string) => void
  changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
  filter: FilterValuesType
  id: string
  removeTodolist: (todolistId: string) => void
  changeTodolistTitle: (id:string, newTitle:string) => void
}
export const Todolist = (props: PropsType) => {

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

  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }

  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle)
  }

  const tasksList = props.tasks.map(t => {
    const onRemoveHandler = () => {
      props.removeTask(t.id, props.id)
    }
    const onChangeIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeIsDoneValue(t.id, e.currentTarget.defaultChecked, props.id)
    }
    const onChangeTitleHandler = (newValue: string) => {
      props.changeTaskTitle(t.id, newValue, props.id)
    }
    return (
      <li className={t.isDone === true ? s.is_done : ''} key={t.id}>
        <input type='checkbox' defaultChecked={t.isDone}
          onChange={onChangeIsDoneHandler}
        />
        <EditableSpan onChange={onChangeTitleHandler} title={t.title} />
        <button onClick={onRemoveHandler}>X</button>
      </li>
    )
  }
  )

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodolistTitle} />
        <button onClick={removeTodolist}>x</button>
      </h3>
      <AddItemForm addItem={addTask} />
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



