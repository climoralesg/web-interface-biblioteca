import React, { Component } from "react";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack } from "@mui/material";


class Tableinformation extends Component {
  render() {
    return (
      <div>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" >
              <TableHead>
                <TableRow >
                  <TableCell>ID</TableCell>
                  <TableCell align="left">Nombre</TableCell>
                  <TableCell align="left">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.data.map((row,i) => (
                  <TableRow key={i}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}> 
                    
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.nombre}</TableCell>

                    <TableCell>
                      <Stack spacing={2} direction="row">
                        <Button variant="contained">Editar</Button>
                        <Button variant="contained">Eliminar</Button>  
                      </Stack>
                    </TableCell>
                    
                  </TableRow>
                ))}                
              </TableBody>
        </Table>
        </TableContainer>

      </div>
    );
  }
}

export default Tableinformation;
