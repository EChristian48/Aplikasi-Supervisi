import * as React from 'react'
import {
  TableRow,
  TableCell,
  Button,
  Typography,
  Link,
} from '@material-ui/core'
import { auth, storage, firestore } from 'firebase/app'

type FileEntryProps = {
  file: storage.Reference
  deleteCallback?: (value: [any, void]) => any
}

const FileEntry: React.FC<FileEntryProps> = props => {
  const [urlString, setUrlString] = React.useState<string>()

  React.useEffect(() => {
    props.file.getDownloadURL().then(result => {
      setUrlString(result)
    })
  }, [])

  const deleteFile = () => {
    return Promise.all([
      props.file.delete(),
      firestore()
        .collection('guru')
        .doc(auth().currentUser?.uid)
        .collection('files')
        .doc(props.file.fullPath.split('/').join())
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
      <TableCell>
        <Button onClick={() => deleteFile().then(props.deleteCallback)}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  )
}

export { FileEntry }
