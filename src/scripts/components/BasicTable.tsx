import * as React from 'react'
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core'

type BasicTableProps = {
  headers: string[]
}

const BasicTable: React.FC<BasicTableProps> = props => {
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

export { BasicTable }
