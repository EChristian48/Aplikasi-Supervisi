import * as React from 'react'

import * as firebase from 'firebase/app'

import { Container, Grid, TableCell, TableRow } from '@material-ui/core'
import { DocTable } from '../../components/DocTable'
import { User } from '../../dataSchema'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { SpecGuruDocs } from './SpecGuruDocs'

const SuperDocs: React.FC = () => {
  const [gurus, setGurus] = React.useState<User[]>()
  const match = useRouteMatch<{ id: string }>()

  React.useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .where('role', '==', 'guru')
      .get()
      .then(result => {
        const gurus: User[] = []
        result.forEach(doc => {
          gurus.push(doc.data() as User)
        })
        setGurus(gurus)
      })
  }, [])

  return (
    <Container>
      <Grid container>
        <Switch>
          <Route path={`${match.path}/:id`}>
            <SpecGuruDocs />
          </Route>

          <Route path={`${match.path}`}>
            <Grid item xs={12}>
              <DocTable headers={['Nama Guru', 'Mata Pelajaran', 'E-Mail']}>
                {gurus?.map(guru => (
                  <TableRow
                    key={guru.uid}
                    hover
                    onClick={() =>
                      (location.href = `#${match.path}/${guru.uid}`)
                    }>
                    <TableCell>{guru.name}</TableCell>
                    <TableCell>{guru.uid}</TableCell>
                    <TableCell>{guru.email}</TableCell>
                  </TableRow>
                ))}
              </DocTable>
            </Grid>
          </Route>
        </Switch>
      </Grid>
    </Container>
  )
}

export { SuperDocs }
