import { User } from '../users/types'

export type UUID = `${string}-${string}-${string}-${string}-${string}`

export type Project = {
  id: number
  project_name: string
  project_owner: User['id']
  team: string[]
  // status: 'important' | 'completed' | 'archived' | 'in progress'
  status: string
  created_at: string
}

export type EmptyProject = Omit<Project, 'id' | 'project_owner' | 'created_at' | 'status'> & {
  project_owner: Project['project_owner'] | undefined
  status: Project['status'] | undefined
}
