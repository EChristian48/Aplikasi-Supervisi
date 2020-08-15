interface User {
  uid: string
  name: string | undefined | null
  email: string | undefined | null
  photoUrl: string | undefined | null
  role: Role
}

type Role = 'guru' | 'supervisor' | 'kurikulum' | 'kepsek' | undefined

type GuruFile = {
  name: string
  downloadUrl: string
  fullPath: string
  accepted: boolean
  date: number
}

export { User, Role, GuruFile }
