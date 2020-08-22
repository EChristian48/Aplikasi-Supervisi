import * as React from 'react'
import {
  Container,
  Grid,
  Button,
  Backdrop,
  CircularProgress,
  TableRow,
  TableCell,
  Typography,
} from '@material-ui/core'
import { useRouteMatch } from 'react-router-dom'
import * as firebase from 'firebase/app'
import { BasicTable } from '../../components/BasicTable'
import { GuruFile, Jadwal } from '../../dataSchema'
import HtmlParser from 'react-html-parser'

type KepsekLaporProps = {
  hideAppBar: (state: boolean) => void
}

const KepsekLapor: React.FC<KepsekLaporProps> = props => {
  const match = useRouteMatch()
  const [isLoading, setLoading] = React.useState(true)
  const [files, setFiles] = React.useState<GuruFile[]>([])
  const [jadwalEntries, setJadwalEntries] = React.useState<
    { hari: string; jadwal: Jadwal }[]
  >([])
  const [isButtonVisible, hideButton] = React.useState(false)

  React.useEffect(() => {
    Promise.all([
      firebase.firestore().collectionGroup('files').get(),
      firebase.firestore().collection('jadwal').get(),
    ]).then(([fileResults, jadwalResult]) => {
      setLoading(false)
      setFiles(fileResults.docs.map(doc => doc.data() as GuruFile))
      setJadwalEntries(
        jadwalResult.docs.map(doc => {
          return {
            hari: doc.id,
            jadwal: doc.data() as Jadwal,
          }
        })
      )
    })
  }, [])

  return (
    <>
      <Container style={{ marginTop: 20 }}>
        <Grid container>
          <Grid item xs={12}>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              onClick={() => {
                props.hideAppBar(true)
                hideButton(true)
                setTimeout(window.print, 500)
                setTimeout(() => {
                  props.hideAppBar(false)
                  hideButton(false)
                }, 2000)
              }}
              style={{ display: isButtonVisible ? 'none' : 'block' }}>
              Print Gan
            </Button>
          </Grid>

          <Grid item xs={12}>
            {jadwalEntries.map(jadwalEntry => (
              <React.Fragment key={jadwalEntry.hari}>
                <Typography>{jadwalEntry.hari}</Typography>
                {HtmlParser(jadwalEntry.jadwal.html)}
              </React.Fragment>
            ))}
          </Grid>

          <Grid item xs={12}>
            <BasicTable headers={['Nama File', 'Tanggal', 'Status']}>
              {files.map(file => (
                <TableRow key={file.fullPath}>
                  <TableCell>{file.name}</TableCell>
                  <TableCell>{new Date(file.date).toDateString()}</TableCell>
                  <TableCell>
                    {file.accepted ? 'Diterima' : 'Belum Diterima'}
                  </TableCell>
                </TableRow>
              ))}
            </BasicTable>
          </Grid>
        </Grid>
      </Container>

      <Backdrop open={isLoading}>
        <CircularProgress />
      </Backdrop>
    </>
  )
}

export { KepsekLapor }
