type User = {
  uid: string
  name: string | undefined | null
  email: string | undefined | null
  photoUrl: string | undefined | null
  role: Role
  mapel?: string
}

type Role = 'guru' | 'supervisor' | 'kurikulum' | 'kepsek' | undefined

type GuruFile = {
  uploader: string | undefined | null
  uploaderName: string | undefined | null
  name: string
  downloadUrl: string
  fullPath: string
  accepted: boolean
  date: number
}

type Jadwal = {
  html: string
}

export { User, Role, GuruFile, Jadwal }
