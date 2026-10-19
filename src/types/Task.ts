export interface Task {
    id: number
    title: string
    description: string
    category: 'content' | 'ecommerce' | 'marketing' | 'web'
    priority: 'low' | 'medium' | 'high'
    status: 'todo' | 'doing' | 'done'
    dueDate: string
}