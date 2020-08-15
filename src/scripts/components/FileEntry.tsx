import * as React from 'react'
import {
  TableRow,
  TableCell,
  Button,
  Typography,
  Link,
} from '@material-ui/core'

type FileEntryProps = {
  file: firebase.storage.Reference
  deleteCallback: () => any
}

const FileEntry: React.FC<FileEntryProps> = props => {
  const [urlString, setUrlString] = React.useState<string>()

  React.useEffect(() => {
    props.file.getDownloadURL().then(result => {
      setUrlString(result)
    })
  }, [])

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
        <Button
          onClick={() => {
            props.file.delete().then(props.deleteCallback)
          }}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  )
}

export { FileEntry }
