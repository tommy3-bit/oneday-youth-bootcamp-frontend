import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider, Box, Heading } from '@chakra-ui/react'
import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
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
  const [filterState, setFilterState] = useState('all')

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
        <Box m={2}>
          <Heading size="lg" mb={2}>
            React Todo List
          </Heading>

          <Box mb={2}>
            {/* 一覧表示 */}
            <RadioGroup onChange={setFilterState} value={filterState}>
              <Stack spacing={10} direction="row">
                <Radio value="all">全て</Radio>
                <Radio value="undone">未完了</Radio>
                <Radio value="done">完了</Radio>
              </Stack>
            </RadioGroup>
            <TaskList {...{ tasks, setTasks, filterState }} />
          </Box>
        </Box>
        <Box m={2}>
          <Heading size="lg" mb={2}>
            Form
          </Heading>
          {/* タスク追加、削除 */}
          <TaskForm {...{ tasks, setTasks, newTaskLabel, setNewTaskLabel }} />
        </Box>
      </div>
    </ChakraProvider>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'))
