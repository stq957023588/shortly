export type UserRole = 'admin' | 'user' | 'owner'

export type UUID = `${string}-${string}-${string}-${string}-${string}`

export type User = {
  id: string
  fullname: string
  email: string
  username: string
  role: UserRole
  avatar: string
  projects: number[]
  notes: string
  active: boolean
}
