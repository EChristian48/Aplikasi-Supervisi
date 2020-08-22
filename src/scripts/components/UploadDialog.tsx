import * as React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  LinearProgress,
} from '@material-ui/core'

import { auth, storage, firestore } from 'firebase/app'

import { GuruFile } from '../dataSchema'
import { useVisibilityClasses } from '../hooks/useVisibilityClasses'
import { useSpacingClasses } from '../hooks/useSpacingClasses'

type UploadDialogProps = {
  onClose: (event?: {}, reason?: 'backdropClick' | 'escapeKeyDown') => void
  open: boolean
  selectedDate: number
  uploadCallback?: () => any
}

type UploadState = {
  visible: boolean
  progress: number
}

const UploadDialog: React.FC<UploadDialogProps> = props => {
  const [uploadStatus, setUploadStatus] = React.useState<UploadState>({
    visible: false,
    progress: 0,
  })

  const fileInput = React.useRef<HTMLInputElement>(null)

  const visibilityClasses = useVisibilityClasses()
  const spacingClasses = useSpacingClasses()

  const onUpload = () => {
    const fileList = fileInput.current?.files
    if (fileList) {
      const file = fileList[0]
      uploadFile(file)
    }
  }

  const createDbRecord = async (fileRef: storage.Reference) => {
    const firestoreRef = firestore()
      .collection('guru')
      .doc(auth().currentUser?.uid)
      .collection('files')
      .doc(getFirestorePath(fileRef))

    const downloadUrl = await fileRef.getDownloadURL()

    const fileRecord: GuruFile = {
      accepted: false,
      date: props.selectedDate,
      downloadUrl: downloadUrl,
      fullPath: fileRef.fullPath,
      name: fileRef.name,
      uploaderName: auth().currentUser?.displayName || 'No Name',
      uploader: auth().currentUser?.uid || 'No ID',
    }

    return firestoreRef.set(fileRecord)
  }

  const uploadFile = async (file: File) => {
    const fileRef = storage()
      .ref()
      .child(auth().currentUser?.uid as string)
      .child(props.selectedDate.toString())
      .child(file.name)

    const uploadTask = fileRef.put(file)

    const uploadObserver = (snapshot: storage.UploadTaskSnapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      setUploadStatus({
        visible: true,
        progress: progress,
      })
    }

    const uploadComplete = () => {
      props.onClose()
      createDbRecord(fileRef).then(props.uploadCallback)
    }

    uploadTask.on(
      storage.TaskEvent.STATE_CHANGED,
      uploadObserver, // Observer
      error => {}, // On Error
      uploadComplete // On Complete
    )
  }

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Upload File</DialogTitle>

      <DialogContent>
        <DialogContentText>Plis lah jangan hina design-nya</DialogContentText>

        <input type='file' name='upload' id='upload' ref={fileInput} />

        <LinearProgress
          variant='determinate'
          value={uploadStatus.progress}
          className={`${
            uploadStatus.visible
              ? visibilityClasses.visible
              : visibilityClasses.hidden
          } ${spacingClasses.marginTop2}`}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onUpload}>Upload</Button>
      </DialogActions>
    </Dialog>
  )
}

const getFirestorePath = (fileRef: storage.Reference) =>
  fileRef.fullPath.split('/').join()

export { UploadDialog, getFirestorePath }
