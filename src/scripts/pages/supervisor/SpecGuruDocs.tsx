import * as React from 'react'
import { DatePicker } from '@material-ui/pickers'
import {
  Container,
  Grid,
  Button,
  TableRow,
  TableCell,
  Typography,
  Link,
} from '@material-ui/core'

import * as firebase from 'firebase/app'

import { BasicTable } from '../../components/BasicTable'
import { useRouteMatch } from 'react-router-dom'
import { GuruFile } from '../../dataSchema'

const SpecGuruDocs: React.FC = () => {
  const [selectedDate, setDate] = React.useState(
    Date.parse(new Date().toDateString())
  )
  const match = useRouteMatch<{ id: string }>()
  const [files, setFiles] = React.useState<
    firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]
  >([])

  const getGuruFiles = (id: string) => {
    return firebase
      .firestore()
      .collection('guru')
      .doc(id)
      .collection('files')
      .where('date', '==', selectedDate)
      .get()
      .then(result => {
        return result.docs
      })
  }

  React.useEffect(() => {
    getGuruFiles(match.params.id).then(result => setFiles(result))
  }, [selectedDate])

  return (
    <Container className='mt-2'>
      <Grid container>
        <Grid
          item
          container
          xs={12}
          md={6}
          justify='center'
          alignItems='center'>
          <DatePicker
            value={selectedDate}
            variant='static'
            onChange={e => {
              if (e !== null) setDate(e.getTime())
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} container>
          <Grid item xs={12}>
            <BasicTable headers={['File', 'Status', 'Aksi']}>
              {files.map(file => {
                const data = file.data() as GuruFile

                return (
                  <TableRow key={file.id}>
                    <TableCell>
                      <Typography>
                        <Link href={data.downloadUrl}>{data.name}</Link>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {data.accepted ? 'Diterima' : 'Belum Diterima'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          file.ref
                            .update({ ...data, accepted: !data.accepted })
                            .then(() =>
                              getGuruFiles(match.params.id).then(result =>
                                setFiles(result)
                              )
                            )
                        }}>
                        {data.accepted ? 'Batalkan' : 'Terima'}
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </BasicTable>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export { SpecGuruDocs }
