import React from 'react'
import { Task } from '../'
import { Input, Button } from '@chakra-ui/react'

type Props = {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  newTaskLabel: string
  setNewTaskLabel: React.Dispatch<React.SetStateAction<string>>
}

export const TaskForm: React.FC<Props> = ({ tasks, setTasks, newTaskLabel, setNewTaskLabel }) => {
  // フォームの値を保持する
  const handleNewTaskLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskLabel(e.target.value)
  }
  // Taskの登録
  const handleAddTask = () => {
    const newTask = { label: newTaskLabel, isDone: false }
    setTasks([...tasks, newTask])
    setNewTaskLabel('')
  }
  // 完了したTaskを削除する
  const handleClearTasks = () => {
    const newTasks = tasks.filter((task) => !task.isDone)
    setTasks(newTasks)
  }
  return (
    <>
      <Input
        onChange={handleNewTaskLabel}
        type="text"
        value={newTaskLabel}
        placeholder="Enter the task"
        w="300px"
        size="sm"
        mr={2}
        mb={2}
      />
      <Button onClick={handleAddTask} colorScheme="blue" size="sm">
        Add
      </Button>
      <br />
      <Button onClick={handleClearTasks} colorScheme="red" size="sm">
        Clear
      </Button>
    </>
  )
}
