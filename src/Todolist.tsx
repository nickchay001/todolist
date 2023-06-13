import { FilterValuesType, TasksType } from "./App"

type PropsType = {
  title: string
  tasks: TasksType[]
  removeTask: (id:number) => void
  changeFilter:(value:FilterValuesType) => void
}
export const Todolist = (props: PropsType) => {

  const tasksList = props.tasks.map(t =>
    <li key={t.id}>
      <input type='checkbox' defaultChecked={t.isDone} />
      <span>{t.title}</span>
      <button onClick={() => { props.removeTask(t.id) }}>X</button>
    </li>
  )

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {tasksList}
      </ul>
      <div>
        <button onClick={() => {props.changeFilter('all')}}>All</button>
        <button onClick={() => {props.changeFilter('active')}}>Active</button>
        <button onClick={() => {props.changeFilter('complited')}}>Completed</button>
      </div>
    </div>
  )
}