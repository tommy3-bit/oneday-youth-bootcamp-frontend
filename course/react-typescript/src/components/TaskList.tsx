import React from 'react'
import { List, ListItem } from '@chakra-ui/react'
import { Task } from '../'

type Props = {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  filterState: string
}

export const TaskList: React.FC<Props> = ({ tasks, setTasks, filterState }) => {
  // Taskの状態を切り替える
  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const newTasks = tasks.map((task, _i) => {
      return _i === i ? { ...task, isDone: e.target.checked } : task
    })
    setTasks(newTasks)
  }

  const filterTasks = () => {
    if (filterState === 'all') return tasks
    if (filterState === 'undone') return tasks.filter(task => task.isDone === false)
    if (filterState === 'done') return tasks.filter(task => task.isDone === true)
  }

  return (
    <>
      <List spacing={2}>
        {filterTasks().map((task, index) => (
          <ListItem key={`todo-${index}`}>
            {task.isDone ? <s>{task.label}</s> : task.label}
            <input onChange={(e) => handleCheckBox(e, index)} type="checkbox" checked={task.isDone} />
          </ListItem>
        ))}
      </List>
    </>
  )
}
