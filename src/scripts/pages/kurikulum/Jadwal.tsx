import * as React from 'react'
import {
  Container,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Button,
  makeStyles,
  createStyles,
  CircularProgress,
} from '@material-ui/core'
import { read, utils } from 'xlsx'
import HtmlParser from 'react-html-parser'
import { firestore } from 'firebase/app'

import { Jadwal, Days } from '../../dataSchema'
import { days } from '../../data/days'
import { useSpacingClasses } from '../../hooks/useSpacingClasses'

const useStyles = makeStyles(theme =>
  createStyles({
    dayMenu: {
      minWidth: 150,
      marginTop: theme.spacing(2),
    },
  })
)

const Jadwal: React.FC = () => {
  const [hari, setHari] = React.useState<Days | ''>('')
  const [table, setTable] = React.useState('')
  const [isLoading, setLoading] = React.useState(false)

  const classes = useStyles()
  const spacing = useSpacingClasses()

  React.useEffect(() => {
    if (hari) {
      setLoading(true)
      getJadwal(hari).then(result => {
        setLoading(false)
        const data = result.data() as Jadwal
        if (data) {
          setTable(data.html)
        } else {
          setTable('')
        }
      })
    }
  }, [hari])

  const getJadwal = (day: Days) =>
    firestore().collection('jadwal').doc(day).get()

  const updateJadwal = () => {
    const jadwal: Jadwal = { html: table }
    return firestore().collection('jadwal').doc(hari).set(jadwal)
  }

  const handleHari = (e: React.ChangeEvent<{ value: string }>) => {
    setHari(e.target.value as Days)
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files !== null) {
      const file = files[0]
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
          <FormControl className={classes.dayMenu}>
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
          <Grid item xs={12} className={spacing.marginTop2}>
            <Typography>
              <input type='file' onChange={handleFile} disabled={!!!hari} />
            </Typography>
          </Grid>

          <Grid item xs={12} className={spacing.marginTop2}>
            {isLoading ? (
              <CircularProgress
                variant='indeterminate'
                className={spacing.marginTop2}
              />
            ) : (
              HtmlParser(table)
            )}
          </Grid>

          <Grid item xs={12} className={spacing.marginTop2}>
            <Button
              fullWidth
              variant='outlined'
              disabled={!!!hari}
              onClick={updateJadwal}>
              Simpan
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export { Jadwal }
