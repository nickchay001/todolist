import { ChangeEvent, useState } from 'react'

type EditableSpanPropsType = {
    title: string
    onChange: (newValue:string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    const activeEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activeVievMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode
            ? <input onBlur={activeVievMode} onChange={onChangeTitleHandler} value={title} autoFocus />
            : <span onDoubleClick={activeEditMode}>{props.title}</span>
    )
}