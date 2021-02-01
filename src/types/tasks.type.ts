export type themeList = {
  id: string
  name: string
  description: string
  level: 0
}

export type taskList = [
  {
    id: string
    player_id: string
    tasks: string[]
    autogenerated: boolean
    title: string
    published: string
  }
]

export type task = {
  id: string
  theme_id: string
  answer_type: number
  description: string
  answer: string
  image?: string | null
  difficulty: number
  position: number
  is_solved: boolean
  attempts: number
  attempts_remains: 0 | 1 | 2
}

export type taskTemplate = {
  id?: string
  theme_id: string
  template: string[]
  params?: [{ name: string; min: number; max: number }] | null
  answer: string[]
  position?: number
  image?: string | null
}
