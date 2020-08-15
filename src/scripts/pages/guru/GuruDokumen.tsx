import * as React from 'react'
import { DatePicker } from '@material-ui/pickers'
import {
  Container,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core'

import * as firebase from 'firebase/app'

import { FileEntry } from '../../components/FileEntry'
import { DocTable } from '../../components/DocTable'

const GuruDokumen: React.FC = () => {
  const [selectedDate, setDate] = React.useState(
    Date.parse(new Date().toDateString())
  )
  const [files, setFiles] = React.useState<firebase.storage.Reference[]>([])
  const [isDialogOpen, setDialogOpen] = React.useState(false)

  const closeDialog = () => {
    setDialogOpen(false)
  }

  const openDialog = () => {
    setDialogOpen(true)
  }

  const getFiles = () => {
    return firebase
      .storage()
      .ref()
      .child(firebase.auth().currentUser?.uid as string)
      .child(`${selectedDate}`)
      .listAll()
  }

  const updateFiles = () => {
    getFiles().then(listResult => {
      setFiles(listResult.items)
    })
  }

  const uploadFile = () => {
    if (fileInput.current?.files) {
      return firebase
        .storage()
        .ref()
        .child(firebase.auth().currentUser?.uid as string)
        .child(`${selectedDate}`)
        .child(`${fileInput.current?.files[0].name}`)
        .put(fileInput.current?.files[0])
    } else {
      console.log('mana wei')
    }
  }

  const createDbRecord = (snapshot: firebase.storage.UploadTaskSnapshot) => {
    return snapshot.ref.getDownloadURL().then(url => {
      firebase
        .firestore()
        .collection('guru')
        .doc(firebase.auth().currentUser?.uid)
        .collection('files')
        .doc(snapshot.ref.fullPath.split('/').join())
        .set({
          downloadUrl: url,
          fullPath: snapshot.ref.fullPath,
          accepted: false,
          name: snapshot.ref.name,
          date: selectedDate,
        })
    })
  }

  const fileInput = React.useRef<HTMLInputElement>(null)

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
          <Grid item xs={12}>
            <DocTable headers={['File', 'Aksi']}>
              {files.map(file => (
                <FileEntry
                  file={file}
                  deleteCallback={() => {
                    firebase
                      .firestore()
                      .collection('guru')
                      .doc(firebase.auth().currentUser?.uid)
                      .collection('files')
                      .doc(file.fullPath.split('/').join())
                      .delete()
                      .then(() =>
                        setFiles(files.filter(value => value !== file))
                      )
                  }}
                  key={file.fullPath}
                />
              ))}
            </DocTable>
          </Grid>

          <Grid container item xs={12} justify='center' alignItems='center'>
            <Button color='primary' variant='outlined' onClick={openDialog}>
              Tambah File
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>Upload File</DialogTitle>
        <DialogContent>
          <DialogContentText>Plis lah jangan hina design-nya</DialogContentText>
          <input type='file' name='upload' id='upload' ref={fileInput} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              if (fileInput.current?.files) {
                firebase
                  .storage()
                  .ref()
                  .child(firebase.auth().currentUser?.uid as string)
                  .child(`${selectedDate}`)
                  .child(`${fileInput.current?.files[0].name}`)
                  .put(fileInput.current?.files[0])
                  .then(snapshot => {
                    createDbRecord(snapshot)
                    closeDialog()
                    updateFiles()
                  })
              }
            }}>
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export { GuruDokumen }
