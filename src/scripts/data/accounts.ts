import { Role } from '../dataSchema'

type Account = {
  role: Role
  username: string
  password: string
}

const accountList: Account[] = [
  { role: 'guru', username: 'guru@guru.com', password: 'guruguru' },
  { role: 'guru', username: 'guru2@guru.com', password: 'guruguru' },
  {
    role: 'supervisor',
    username: 'supervisor@supervisor.com',
    password: 'supervisorsupervisor',
  },
  {
    role: 'kurikulum',
    username: 'kurikulum@kurikulum.com',
    password: 'kurikulumkurikulum',
  },
  {
    role: 'kepsek',
    username: 'kepsek@kepsek.com',
    password: 'kepsekkepsek',
  },
]

export { accountList }
