import * as React from 'react'
import { Role } from '../dataSchema'
import { Description, Schedule } from '@material-ui/icons'

type Menu = {
  icon: JSX.Element
  name: string
  role: Role
  link: string
}

const menus: Menu[] = [
  {
    icon: <Description />,
    name: 'Dokumen Pembelajaran',
    role: 'guru',
    link: '#/guru/upload',
  },
  {
    icon: <Description />,
    name: 'Daftar Dokumen',
    role: 'supervisor',
    link: '#/supervisor/daftar',
  },
  {
    icon: <Schedule />,
    name: 'Daftar Jadwal',
    role: 'kurikulum',
    link: '#/kurikulum/jadwal',
  },
  {
    icon: <Description />,
    name: 'Lihat Laporan',
    role: 'kepsek',
    link: '#/kepsek/laporan',
  },
]

export { menus }
