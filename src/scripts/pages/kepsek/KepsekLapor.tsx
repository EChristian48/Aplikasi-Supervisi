import * as React from 'react'
import {
  Container,
  Grid,
  Button,
  TableRow,
  TableCell,
  Typography,
} from '@material-ui/core'

import { firestore } from 'firebase/app'
import { BasicTable } from '../../components/BasicTable'
import { GuruFile, Jadwal } from '../../dataSchema'
import HtmlParser from 'react-html-parser'
import { useVisibilityClasses } from '../../hooks/useVisibilityClasses'
import { useSpacingClasses } from '../../hooks/useSpacingClasses'
import { LoadingBanner } from '../../components/LoadingBanner'

type KepsekLaporProps = {
  setAppBarShown: (state: boolean) => void
  isAppBarShown: boolean
}

const KepsekLapor: React.FC<KepsekLaporProps> = ({
  setAppBarShown,
  isAppBarShown,
}) => {
  const [isLoading, setLoading] = React.useState(true)
  const [files, setFiles] = React.useState<GuruFile[]>([])
  const [jadwalEntries, setJadwalEntries] = React.useState<
    { hari: string; jadwal: Jadwal }[]
  >([])
  const [isButtonShown, setButtonShown] = React.useState(true)

  const visibility = useVisibilityClasses()
  const spacing = useSpacingClasses()

  const getFiles = () => firestore().collectionGroup('files').get()
  const getJadwal = () => firestore().collection('jadwal').get()

  React.useEffect(() => {
    Promise.all([getFiles(), getJadwal()]).then(
      ([fileResults, jadwalResult]) => {
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
      }
    )
  }, [])

  React.useEffect(() => {
    if (!isButtonShown && !isAppBarShown) {
      window.print()
      setAppBarShown(true)
      setButtonShown(true)
    }
  }, [isButtonShown, isAppBarShown])

  const zenMode = () => {
    setAppBarShown(false)
    setButtonShown(false)
  }

  return (
    <>
      <Container className={spacing.marginTop2}>
        <Grid container>
          <Grid item xs={12}>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              onClick={zenMode}
              className={
                isButtonShown ? visibility.visible : visibility.hidden
              }>
              Print Gan
            </Button>
          </Grid>

          <Grid item xs={12}>
            {jadwalEntries.map(jadwalEntry => (
              <React.Fragment key={jadwalEntry.hari}>
                <Typography className={spacing.marginTop2}>
                  {jadwalEntry.hari}
                </Typography>
                {HtmlParser(jadwalEntry.jadwal.html)}
              </React.Fragment>
            ))}
          </Grid>

          <Grid item xs={12} className={spacing.marginTop2}>
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

      <LoadingBanner open={isLoading} />
    </>
  )
}

export { KepsekLapor }
