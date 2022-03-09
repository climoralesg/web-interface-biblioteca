import React, { Component } from "react";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import { Stack } from "@mui/material";
import TextField from '@mui/material/TextField';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


class TableAuthors extends Component {
  constructor(props){
    super(props);
    this.state={
      data:[{}],
      modalEdit:false,
      form:{
        id:"",
        nombre:"",
      }
    }
    this.deleteAuthor = this.deleteAuthor.bind(this);
    this.editAuthor = this.editAuthor.bind(this);
    this.handleModalEdit = this.handleModalEdit.bind(this);
  }

  handleModalEdit=(datos)=>{



    if(this.state.modalEdit===true){
      this.setState({
        modalEdit:false
      });
    }else{
      this.setState({
        modalEdit:true,
        form:datos
      });
    }
  }
  
  

  componentDidMount = async()=>{
    const response = await fetch (`http://localhost:4000/autores`);
    const columns=await response.json();
    this.setState({
      data:columns.datos
    });
  }

  editAuthor = async(id,name)=>{

    await fetch(`http://localhost:4000/autores/${id}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body:JSON.stringify({id:id,nombre:name}),
      cache:'no-cache'
    }).then(
      response=>response.json()
    ).then((response)=>{
      console.log("Registrado", response)
      console.log("Realizado")
    })
    
  }

  deleteAuthor= async (value)=>{
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
                    <TableCell key={row.id}>{row.id}</TableCell>
                    <TableCell>
                      <TextField key={row.nombre} id="outlined-helperText" defaultValue={row.nombre} onChange={ (event) => this.changeName(event,row.id)} />
                    </TableCell>
                    
                    <TableCell>
                      <Stack spacing={2} direction="row">
                        <Button variant="contained" onClick={(e)=>this.handleModalEdit(row)}>Actualizar</Button>
                        {/*<Button variant="contained" onClick={(e)=>this.editAuthor(row.id,row.nombre)}>Actualizar</Button>*/}
                        <Button variant="contained" onClick={(e)=>this.deleteAuthor(row.id)}>Eliminar</Button>  
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}                
              </TableBody>
        </Table>
        </TableContainer>

        {/*INICIO MODAL*/}
        <Modal 
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={this.state.modalEdit}
            onClose={this.handleModalEdit}
            closeAfterTransition={true}
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}>

            <Fade in={this.state.modalEdit}>
              <Box sx={style}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  Editar Autor
                </Typography>
                <FormGroup>
                <TextField id="outlined-helperText" defaultValue={this.state.form.nombre}/>            
                <Button variant="contained">Editar</Button>  
                <Button variant="contained" onClick={this.handleModalEdit}>Cancelar</Button>
                </FormGroup>
              </Box>
            </Fade>
          </Modal>
          {/*TERMINO MODAL*/}
      </div>
    );
  }
}

export default TableAuthors;

