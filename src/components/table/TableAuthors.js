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
import TextField from '@mui/material/TextField';


class TableAuthors extends Component {
  constructor(props){
    super(props);
    this.state={
      data:[{}]
    }
    this.deleteAuthor = this.deleteAuthor.bind(this);
  }

  componentDidMount = async()=>{
    const response = await fetch (`http://localhost:4000/autores`);
    const columns=await response.json();
    this.setState({
      data:columns.datos
    });
  }

  editAuthor=(value)=>{
    console.log("Editar: ",value);
  }

  deleteAuthor= async (value)=>{
    console.log("Eliminar: ", value);

    await fetch(`http://localhost:4000/autores/${value}`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      cache:'no-cache'
    }).then(async (result)=>{
      result = await result.json();
      this.setState({
        data:result.datos
      });
    })

  }

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
                {this.state.data.map((row,i) => (
                  <TableRow key={i}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}> 
                    
                    <TableCell>{row.id}</TableCell>
                    <TableCell>
                      <TextField key={row.nombre} id="outlined-helperText" defaultValue={row.nombre}/>
                    </TableCell>
                    
                    <TableCell>
                      <Stack spacing={2} direction="row">
                        <Button variant="contained" onClick={(e)=>this.editAuthor(row.id)}>Editar</Button>
                        <Button variant="contained" onClick={(e)=>this.deleteAuthor(row.id)}>Eliminar</Button>  
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

export default TableAuthors;
