import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button } from '@mui/material';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  price: number,
) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow hover  sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell align="center">{row.publisher.name}</TableCell>
        <TableCell align="center">{row.issued}</TableCell>
        <TableCell align="center"><Button target="_blank" href={row.landingPage}>Visit</Button></TableCell>
       
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table sx={{ backgroundColor: '#faf3f6' }} size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="center">License</TableCell>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="center">Keywords</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>                 
                    <TableRow   key={row.id}>
                      <TableCell align="center"component="th" scope="row">
                        {row.description}
                      </TableCell>
                      <TableCell align="center">{row.license}</TableCell>
                      <TableCell align="center">{row.id}</TableCell>
                      <TableCell align="center">
                        {row.keyword.join(", ")}
                      </TableCell>
                    </TableRow>
                
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function CollapsibleTable(data, error, loading) {
  console.log("data raw", data)
  console.log("loading", loading)
  console.log("eerror", error)
  console.log("eerror essage", error.message)
  if (loading) {return <div>Loading data</div>}
  if (!data.data) {return <div>No results</div>}
  
  if (error.message) {return <div>Error when loading data</div>}
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader  aria-label="collapsible table">
        <TableHead>
          <TableRow hover >
            <TableCell />
            <TableCell align="center"><h3>Title</h3></TableCell>
            <TableCell align="center"><h3>Publisher</h3></TableCell>
            <TableCell align="center"><h3>Issued</h3></TableCell>
            <TableCell align="center"><h3>Action</h3></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.data.resources3D.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  );
}
