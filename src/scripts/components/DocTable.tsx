import * as React from 'react'
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core'

type DocTableProps = {
  headers: string[]
}

const DocTable: React.FC<DocTableProps> = props => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {props.headers.map(header => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{props.children}</TableBody>
      </Table>
    </TableContainer>
  )
}

export { DocTable }
