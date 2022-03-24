import React, { Component } from "react";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Modal from '@mui/material/Modal';
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
      modalCreate:false,
      form:{
        id:"",
        name:"",
      },
      formCreate:{
        name:"",
      }
    }
    this.deleteAuthor = this.deleteAuthor.bind(this);
    this.createAuthor = this.createAuthor.bind(this);
    this.editAuthor = this.editAuthor.bind(this);
    this.handleModalEdit = this.handleModalEdit.bind(this);
    this.handleModalCreate = this.handleModalCreate.bind(this);

  }

  componentDidMount = ()=>{
    this.updateList();
  }

  createAuthor = async ()=>{
    await fetch(`http://localhost:4000/authors`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body:JSON.stringify({name:this.state.formCreate.name}),
      cache:'no-cache'

    }).then(
      response=>response.json()
    ).then((response)=>{
      this.updateList();
      this.setState({
        modalCreate:false
      });
    }) 
    
    
    
    this.updateList();
  }

  updateList=async ()=>{
    const response = await fetch (`http://localhost:4000/authors`);
    const columns=await response.json();
    this.setState({
      data:columns.datos
    });
  }

  handleChangeEdit=(e)=>{
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  }

  handleChangeCreate=(e)=>{
    this.setState({
      formCreate:{
        ...this.state.formCreate,
        [e.target.name]: e.target.value
      }
    });
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

  handleModalCreate=()=>{
    if(this.state.modalCreate===true){
      this.setState({
        modalCreate:false
      });
    }else{
      this.setState({
        modalCreate:true,
      });
    }
  }
  
  


  editAuthor = async()=>{
    await fetch(`http://localhost:4000/authors/${this.state.form.id}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body:JSON.stringify({id:this.state.form.id,name:this.state.form.name}),
      cache:'no-cache'
    }).then(
      response=>response.json()
    ).then((response)=>{
      this.updateList();
      this.setState({
        modalEdit:false
      });
    }) 
  }
  
  deleteAuthor= async (value)=>{
    await fetch(`http://localhost:4000/authors/${value}`,{
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
        <Button variant="contained" onClick={(e)=>this.handleModalCreate()}>Agregar Autor</Button>  

        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" >
              
          <TableHead>
            
            <TableRow>
              
              <TableCell>ID</TableCell>
              <TableCell align="left">Nombre</TableCell>
              <TableCell align="left">Acciones</TableCell>
            
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map((row,i) => (
              <TableRow key={i}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}> 
                <TableCell key={row.id} component="th" scope="row">{row.id}</TableCell>
                <TableCell >{row.name}</TableCell>

                <TableCell>
                  <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={(e)=>this.handleModalEdit(row)}>Editar</Button>
                    <Button variant="contained" onClick={(e)=>this.deleteAuthor(row.id)}>Eliminar</Button>  
                  </Stack>
                  </TableCell>
              </TableRow>
            ))}                
          </TableBody>
        </Table>
        </TableContainer>

        {/*START MODAL EDIT*/}
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
                <TextField id="outlined-helperText" name="name" placeholder="Nombre" value={this.state.form.name} onChange={this.handleChangeEdit}/>            
                <Button variant="contained" onClick={this.editAuthor}>Editar</Button>  
                <Button variant="contained" onClick={this.handleModalEdit}>Cancelar</Button>
                </FormGroup>
              </Box>
            </Fade>
          </Modal>
          {/*END MODAL EDIT*/}

          {/*START MODAL CREATE*/}
          <Modal 
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={this.state.modalCreate}
            onClose={this.handleModalCreate}
            closeAfterTransition={true}
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}>

            <Fade in={this.state.modalCreate}>
              <Box sx={style}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  Agregar Autor
                </Typography>
                <FormGroup>
                <TextField id="outlined-helperText" name="name" placeholder="Nombre" onChange={this.handleChangeCreate}/>            
                <Button variant="contained" onClick={this.createAuthor}>Crear</Button>                  
                </FormGroup>
              </Box>
            </Fade>
          </Modal>
          {/*END MODAL CREATE*/}


      </div>
    );
  }
}

export default TableAuthors;

