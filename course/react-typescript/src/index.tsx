import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider, Box, Heading } from '@chakra-ui/react'
import { request } from './server'
import { TaskList } from './components/TaskList'
import { TaskForm } from './components/TaskForm'

// TODOタスクの型
export type Task = { label: string; isDone: boolean }

const App: React.VFC = () => {
  // タスクリストを格納する
  const [tasks, setTasks] = useState<Task[]>([])
  // 追加前のタスクを格納する
  const [newTaskLabel, setNewTaskLabel] = useState<string>('')
  // ページマウント時にモックAPIからデータを取得
  useEffect(() => {
    request.fetchTasks((payload: Task[]) => setTasks(payload))
  }, [])

  return (
    <ChakraProvider>
      <div>
        {/* ヘッダー */}
        <Box w="100%" p={2} bg="azure">
          <Heading as="h1">Tutorial Works</Heading>
        </Box>
        <Heading size="lg">React Todo List</Heading>

        {/* 一覧表示 */}
        <TaskList {...{ tasks, setTasks }} />

        {/* タスク追加、削除 */}
        <TaskForm {...{ tasks, setTasks, newTaskLabel, setNewTaskLabel }} />
      </div>
    </ChakraProvider>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'))
