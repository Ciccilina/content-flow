import { expect, test } from '@jest/globals'
import type { Task } from './types/Task'
import { filterTasksByStatus } from './utils/taskUtils'

const tasks: Task[] = [
  {
    id: 1,
    title: 'Write product text',
    description: 'Create product description',
    category: 'content',
    priority: 'high',
    status: 'todo',
    dueDate: '2026-10-20',
  },
  {
    id: 2,
    title: 'Update webshop',
    description: 'Update product page',
    category: 'ecommerce',
    priority: 'medium',
    status: 'doing',
    dueDate: '2026-10-21',
  },
]

// Checks that only tasks with the selected status are returned
test('filters tasks by status', () => {
  const result = filterTasksByStatus(tasks, 'todo')

  expect(result).toHaveLength(1)
  expect(result[0].title).toBe('Write product text')
})

// Checks that an empty array is returned when no tasks match the status
test('returns an empty array when no tasks match the status', () => {
  const result = filterTasksByStatus(tasks, 'done')

  expect(result).toHaveLength(0)
})

// Checks that tasks with the doing status are returned correctly
test('filters tasks with doing status', () => {
  const result = filterTasksByStatus(tasks, 'doing')

  expect(result).toHaveLength(1)
  expect(result[0].title).toBe('Update webshop')
})