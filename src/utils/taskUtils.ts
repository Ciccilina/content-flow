import type { Task } from '../types/Task'

// Returns tasks that match the selected status
export function filterTasksByStatus(
  tasks: Task[],
  status: Task['status']
): Task[] {
  return tasks.filter((task) => task.status === status)
}
