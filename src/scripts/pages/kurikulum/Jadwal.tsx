import * as React from 'react'
import {
  Container,
  Grid,
  Fab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Button,
} from '@material-ui/core'
import { read, utils } from 'xlsx'
import HtmlParser from 'react-html-parser'
import * as firebase from 'firebase/app'

import { Jadwal } from '../../dataSchema'

const days: string[] = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

const Jadwal: React.FC = () => {
  const [hari, setHari] = React.useState('')
  const [table, setTable] = React.useState('')

  React.useEffect(() => {
    if (hari) {
      firebase
        .firestore()
        .collection('jadwal')
        .doc(hari)
        .get()
        .then(result => {
          const data = result.data() as Jadwal
          if (data) {
            setTable(data.html)
            console.log('data diambli')
          } else {
            setTable('')
          }
        })
    }
  }, [hari])

  const handleHari = (e: React.ChangeEvent<{ value: string }>) => {
    setHari(e.target.value)
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = e => {
        if (e.target !== null) {
          const data = new Uint8Array(e.target.result as ArrayBuffer)
          const workbook = read(data, { type: 'array' })

          setTable(utils.sheet_to_html(workbook.Sheets[workbook.SheetNames[0]]))
        }
      }

      reader.readAsArrayBuffer(file)
    }
  }

  return (
    <Container>
      <Grid container>
        <Grid item lg={2} xs={12}>
          <FormControl style={{ minWidth: 120 }}>
            <InputLabel id='hari'>Pilih Hari</InputLabel>
            <Select labelId='hari' onChange={handleHari} value={hari}>
              {days.map(day => (
                <MenuItem key={day} value={day}>
                  {day}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid container item xs={12} lg={10}>
          <Grid item xs={12} style={{ marginTop: 8 }}>
            <Typography>
              <input
                type='file'
                name='jadwalInput'
                id='jadwalInput'
                onChange={handleFile}
                disabled={!!!hari}
              />
            </Typography>
          </Grid>

          <Grid item xs={12}>
            {HtmlParser(table)}
          </Grid>

          <Grid item xs={12} style={{ marginTop: 8 }}>
            <Button
              fullWidth
              variant='outlined'
              disabled={!!!hari}
              onClick={() => {
                firebase.firestore().collection('jadwal').doc(hari).set({
                  html: table,
                })
              }}>
              Simpan
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export { Jadwal }
