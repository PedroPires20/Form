export type Form = {
  id: string
  title: string
  description: string
}

export type FormState = {
  all: Form[]
  id: string | null
  title: string | null
  description: string | null
  loading: boolean;
}
