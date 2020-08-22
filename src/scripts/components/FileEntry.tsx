import * as React from 'react'
import {
  TableRow,
  TableCell,
  Button,
  Typography,
  Link,
  CircularProgress,
} from '@material-ui/core'
import { auth, storage, firestore } from 'firebase/app'
import { getFirestorePath } from './UploadDialog'
import { GuruFile } from '../dataSchema'

type FileEntryProps = {
  file: storage.Reference
  deleteCallback?: (value: [any, void]) => any
}

const FileEntry: React.FC<FileEntryProps> = props => {
  const [urlString, setUrlString] = React.useState<string>()
  const [status, setStatus] = React.useState('Loading...')
  const [isDeleting, setDeleting] = React.useState(false)

  React.useEffect(() => {
    props.file.getDownloadURL().then(result => {
      setUrlString(result)
    })

    getFile().then(doc => {
      const data = doc.data() as GuruFile
      const status = data.accepted ? 'Diterima' : 'Belum Diterima'
      setStatus(status)
    })
  }, [])

  const getFile = () =>
    firestore()
      .collection('guru')
      .doc(auth().currentUser?.uid)
      .collection('files')
      .doc(getFirestorePath(props.file))
      .get()

  const deleteFile = () => {
    setDeleting(true)
    return Promise.all([
      props.file.delete(),
      firestore()
        .collection('guru')
        .doc(auth().currentUser?.uid)
        .collection('files')
        .doc(getFirestorePath(props.file))
        .delete(),
    ])
  }

  return (
    <TableRow>
      <TableCell>
        <Typography>
          {urlString ? (
            <Link href={urlString}>{props.file.name}</Link>
          ) : (
            `${props.file.name} (Loading link...)`
          )}
        </Typography>
      </TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>
        {isDeleting ? (
          <CircularProgress variant='indeterminate' />
        ) : (
          <Button onClick={() => deleteFile().then(props.deleteCallback)}>
            Delete
          </Button>
        )}
      </TableCell>
    </TableRow>
  )
}

export { FileEntry }
