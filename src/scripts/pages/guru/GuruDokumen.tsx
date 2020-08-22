import * as React from 'react'
import { DatePicker } from '@material-ui/pickers'
import {
  Container,
  Grid,
  Button,
  CircularProgress,
  makeStyles,
  createStyles,
} from '@material-ui/core'

import { storage, auth } from 'firebase/app'

import { FileEntry } from '../../components/FileEntry'
import { BasicTable } from '../../components/BasicTable'
import { UploadDialog } from '../../components/UploadDialog'

const useStyles = makeStyles(theme =>
  createStyles({
    loading: {
      alignSelf: 'center',
    },
  })
)

const GuruDokumen: React.FC = () => {
  const [selectedDate, setDate] = React.useState(
    Date.parse(new Date().toDateString())
  )
  const [files, setFiles] = React.useState<firebase.storage.Reference[]>([])
  const [isDialogOpen, setDialogOpen] = React.useState(false)
  const [isLoading, setLoading] = React.useState(false)

  const classes = useStyles()

  const closeDialog = () => setDialogOpen(false)
  const openDialog = () => setDialogOpen(true)

  const getFiles = () => {
    return storage()
      .ref()
      .child(auth().currentUser?.uid as string)
      .child(selectedDate.toString())
      .listAll()
  }

  const updateFiles = () => {
    setLoading(true)
    getFiles().then(listResult => {
      setLoading(false)
      setFiles(listResult.items)
    })
  }

  React.useEffect(() => {
    updateFiles()
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
          <Grid item xs={12} container justify='center'>
            {isLoading ? (
              <CircularProgress
                variant='indeterminate'
                className={classes.loading}
              />
            ) : (
              <BasicTable headers={['File', 'Status', 'Aksi']}>
                {files.map(file => (
                  <FileEntry
                    file={file}
                    deleteCallback={() =>
                      setFiles(files.filter(value => value !== file))
                    }
                    key={file.fullPath}
                  />
                ))}
              </BasicTable>
            )}
          </Grid>

          <Grid container item xs={12} justify='center' alignItems='center'>
            <Button color='primary' variant='outlined' onClick={openDialog}>
              Tambah File
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <UploadDialog
        onClose={closeDialog}
        open={isDialogOpen}
        selectedDate={selectedDate}
        uploadCallback={updateFiles}
      />
    </Container>
  )
}

export { GuruDokumen }
