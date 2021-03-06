import * as React from 'react'

import { firestore } from 'firebase/app'

import { Container, Grid, TableCell, TableRow } from '@material-ui/core'
import { BasicTable } from '../../components/BasicTable'
import { User } from '../../dataSchema'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { ListDokumen } from './ListDokumen'
import { LoadingBanner } from '../../components/LoadingBanner'

const ListGuru: React.FC = () => {
  const [gurus, setGurus] = React.useState<User[]>([])
  const [isLoading, setLoading] = React.useState(true)
  const match = useRouteMatch<{ id: string }>()

  const getGurus = () =>
    firestore().collection('users').where('role', '==', 'guru').get()

  React.useEffect(() => {
    getGurus().then(result => {
      setLoading(false)
      setGurus(result.docs.map(doc => doc.data() as User))
    })
  }, [])

  return (
    <>
      {' '}
      <Container>
        <Grid container>
          <Switch>
            <Route path={`${match.path}/:id`}>
              <ListDokumen />
            </Route>

            <Route path={`${match.path}`}>
              <Grid item xs={12}>
                <BasicTable headers={['Nama Guru', 'Mata Pelajaran', 'E-Mail']}>
                  {gurus.map(guru => (
                    <TableRow
                      key={guru.uid}
                      hover
                      onClick={() =>
                        (location.href = `#${match.path}/${guru.uid}`)
                      }>
                      <TableCell>{guru.name}</TableCell>
                      <TableCell>{guru.mapel}</TableCell>
                      <TableCell>{guru.email}</TableCell>
                    </TableRow>
                  ))}
                </BasicTable>
              </Grid>
            </Route>
          </Switch>
        </Grid>
      </Container>
      <LoadingBanner open={isLoading} />
    </>
  )
}

export { ListGuru }
