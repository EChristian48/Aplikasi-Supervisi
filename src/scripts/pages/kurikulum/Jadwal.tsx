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

const days: string[] = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

const Jadwal: React.FC = () => {
  const [hari, setHari] = React.useState()

  const handleHari = (e: React.ChangeEvent<{ value: string }>) => {
    console.log(e.target.value)
  }

  return (
    <Container className='mt-2'>
      <Grid container>
        <Grid item xs={6}>
          <FormControl style={{ minWidth: 120 }}>
            <InputLabel id='hari'>Pilih Hari</InputLabel>
            <Select labelId='hari' onChange={handleHari}>
              {days.map(day => (
                <MenuItem key={day} value={day}>
                  {day}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            Upload XLSX: <input type='file' name='' id='' />
          </Typography>
          <Button>Kirim</Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          {/* TODO: Kasih XLSX */}
          <Typography>Belom beres gan</Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export { Jadwal }
