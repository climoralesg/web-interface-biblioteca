/* eslint-disable array-callback-return */
import React, { Component } from "react";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import { Stack } from "@mui/material";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
  


class TableBooks extends Component{
    constructor(props){
        super(props);
        this.state={

          data:[{}],
          modalEdit:false,
          modalCreate:false,
          modalView:false,
          form:{
            isbn:"",
            title:"",
            edition:0,
            numberPages:0,
            idAuthor: '',
            idEditorial:'',
            idCategory:'',

          },
          formCreate:{
            isbn:"",
            title:"",
            edition:0,
            numberPages:0,
            idAuthor: '',
            idEditorial:'',
            idCategory:'',
          },

          formView:{
            isbn:"",
            title:"",
            edition:0,
            numberPages:0,
            authorName: "",
            editorialName:"",
            categoryName:"",
          },

          authors:[{}],
          categories:[{}],
          editorials:[{}]

        }

        this.deleteBook=this.deleteBook.bind(this);
        this.createBook=this.createBook.bind(this);
        this.editBook=this.editBook.bind(this);
        this.handleModalEdit=this.handleModalEdit.bind(this);
        this.handleModalCreate = this.handleModalCreate.bind(this);
        this.handleModalView = this.handleModalView.bind(this);
    }

    componentDidMount = ()=>{
        this.updateList();
    }

    createBook = async ()=>{
        await fetch(`http://localhost:4000/books`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
          },
          body:JSON.stringify({isbn:this.state.formCreate.isbn,
                                title:this.state.formCreate.title,
                                edition:this.state.formCreate.edition,
                                numberPages:this.state.formCreate.numberPages,
                                idAuthor:this.state.formCreate.idAuthor,
                                idEditorial:this.state.formCreate.idEditorial,
                                idCategory:this.state.formCreate.idCategory
                            }),
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
    
    updateList=async()=>{
        const response = await fetch (`http://localhost:4000/books`);
        const columns=await response.json();
        this.setState({
          data:columns.datos
        });
    }

    /*REALIZAR CAMBIO */
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

    handleModalView= async(isbn)=>{
      if(this.state.modalView===true){
        this.setState({
          modalView:false
        });
      }else{

        const response = await fetch (`http://localhost:4000/books/${isbn}`);
        const columns=await response.json();

        await this.setState({
          modalView:true,
          formView:columns.datos
        });
      }
    
    }


    handleModalEdit=(datos)=>{
      if(this.state.modalEdit===true){
        this.setState({
          modalEdit:false
        });
      }else{
        this.updateListAuthors();
        this.updateListEditorials();
        this.updateListCategories();
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
        this.updateListAuthors();
        this.updateListEditorials();
        this.updateListCategories();
        this.setState({
         
          modalCreate:true,
        
        });
      }
    }

    updateListAuthors=async()=>{
       const response = await fetch (`http://localhost:4000/authors`);
      const columns=await response.json();
      this.setState({
        authors:columns.datos
      });
    }

    updateListEditorials=async()=>{
      const response = await fetch (`http://localhost:4000/editorials`);
      const columns=await response.json();
      this.setState({
        editorials:columns.datos
      });
    }

    updateListCategories=async()=>{
      const response = await fetch (`http://localhost:4000/categories`);
      const columns=await response.json();
      this.setState({
        categories:columns.datos
      });
    }

    editBook = async()=>{
        await fetch(`http://localhost:4000/books/${this.state.form.isbn}`,{
          method:'PUT',
          headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
          },
          body:JSON.stringify({isbn:this.state.form.isbn,
            title:this.state.form.title,
            edition:this.state.form.edition,
            numberPages:this.state.form.numberPages,
            idAuthor:this.state.form.idAuthor,
            idEditorial:this.state.form.idEditorial,
            idCategory:this.state.form.idCategory}),
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

    deleteBook= async (value)=>{
      await fetch(`http://localhost:4000/books/${value}`,{
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
    
  

    render(){
        return(
            <div> 

     

            <Button variant="contained" onClick={(e)=>this.handleModalCreate()}>Agregar Libro</Button>  
    
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                  
              <TableHead>
                
                <TableRow>
                  
                  <TableCell>ISBN</TableCell>
                  <TableCell align="left">Nombre</TableCell>
                  <TableCell align="left">Acciones</TableCell>
                
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.data.map((row,i) => (
                  <TableRow key={i}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}> 
                    <TableCell key={row.isbn} component="th" scope="row">{row.isbn}</TableCell>
                    <TableCell>{row.title}</TableCell>
    
                    <TableCell>
                      <Stack spacing={2} direction="row">
                        <Button variant="contained" onClick={(e)=>this.handleModalEdit(row)}>Editar</Button>
                        <Button variant="contained" onClick={(e)=>this.handleModalView(row.isbn)}>Ver Información</Button>
                        <Button variant="contained" onClick={(e)=>this.deleteBook(row.isbn)}>Eliminar</Button>  
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
                      Editar Libro
                    </Typography>
                    <FormGroup>
                    <TextField id="outlined-helperText" name="title" value={this.state.form.title} onChange={this.handleChangeEdit}/>            
                    <TextField id="outlined-helperText" name="edition" value={this.state.form.edition} onChange={this.handleChangeEdit}/>            
                    <TextField id="outlined-helperText" name="numberPages" value={this.state.form.numberPages} onChange={this.handleChangeEdit}/>

                    {/* <TextField id="outlined-helperText" name="idAuthor" value={this.state.form.idAuthor} onChange={this.handleChangeEdit}/>             */}
                    {/* <TextField id="outlined-helperText" name="idCategory" value={this.state.form.idCategory} onChange={this.handleChangeEdit}/> */}
                    {/* <TextField id="outlined-helperText" name="idEditorial" value={this.state.form.idEditorial} onChange={this.handleChangeEdit}/>   */}


                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-helper-label">Autor</InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="selectAuthor"
                        value={this.state.form.idAuthor}
                        label="Autor"
                        name="idAuthor"
                        onChange={this.handleChangeEdit}
                      >

                        <MenuItem value="" disabled >
                          <em>Autor</em>
                        </MenuItem>

                        {this.state.authors.map((author,i) => (
                          <MenuItem value={author.id} key={i} >{author.name}</MenuItem>
                        ))}

                 
                      </Select>
                    </FormControl>

                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-helper-label">Editorial</InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="selectEditorial"
                        value={this.state.form.idEditorial}
                        label="Editorial"
                        name="idEditorial"
                        onChange={this.handleChangeEdit}
                      >

                        <MenuItem value="" disabled >
                          <em>Editorial</em>
                        </MenuItem>

                        {this.state.editorials.map((editorial,i) => (
                          <MenuItem value={editorial.id} key={i} >{editorial.name}</MenuItem>
                        ))}

                 
                      </Select>
                    </FormControl>


                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-helper-label">Categoria</InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="selectCategory"
                        value={this.state.form.idCategory}
                        label="Categoria"
                        name="idCategory"
                        onChange={this.handleChangeEdit}
                      >

                        <MenuItem value="" disabled >
                          <em>Categoria</em>
                        </MenuItem>

                        {this.state.categories.map((category,i) => (
                          <MenuItem value={category.id} key={i} >{category.name}</MenuItem>
                        ))}

                 
                      </Select>
                    </FormControl>


        
                    <Button variant="contained" onClick={this.editBook}>Editar</Button>  
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
                      Agregar Libro
                    </Typography>
                    <FormGroup>
                    <TextField id="outlined-helperText" placeholder="ISBN" name="isbn" onChange={this.handleChangeCreate}/>   
                    <TextField id="outlined-helperText" placeholder="Titulo" name="title" onChange={this.handleChangeCreate}/>    
                    <TextField id="outlined-helperText" placeholder="Edicion" name="edition" onChange={this.handleChangeCreate}/>    
                    <TextField id="outlined-helperText" placeholder="Numero de Paginas" name="numberPages" onChange={this.handleChangeCreate}/>    
                    {/*<TextField id="outlined-helperText" placeholder="Autor" name="idAuthor" onChange={this.handleChangeCreate}/>*/}    
                    {/* <TextField id="outlined-helperText" placeholder="Editorial" name="idEditorial" onChange={this.handleChangeCreate}/> */}
                    {/* <TextField id="outlined-helperText" placeholder="Categoria" name="idCategory" onChange={this.handleChangeCreate}/> */}

                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-helper-label">Autor</InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="selectAuthor"
                        value={this.state.formCreate.idAuthor}
                        label="Autor"
                        name="idAuthor"
                        onChange={this.handleChangeCreate}
                      >

                        <MenuItem value="" disabled >
                          <em>Autor</em>
                        </MenuItem>

                        {this.state.authors.map((author,i) => (
                          <MenuItem value={author.id} key={i} >{author.name}</MenuItem>
                        ))}

                 
                      </Select>
                    </FormControl>

                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-helper-label">Editorial</InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="selectEditorial"
                        value={this.state.formCreate.idEditorial}
                        label="Editorial"
                        name="idEditorial"
                        onChange={this.handleChangeCreate}
                      >

                        <MenuItem value="" disabled >
                          <em>Editorial</em>
                        </MenuItem>

                        {this.state.editorials.map((editorial,i) => (
                          <MenuItem value={editorial.id} key={i} >{editorial.name}</MenuItem>
                        ))}

                 
                      </Select>
                    </FormControl>


                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-helper-label">Categoria</InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="selectCategory"
                        value={this.state.formCreate.idCategory}
                        label="Categoria"
                        name="idCategory"
                        onChange={this.handleChangeCreate}
                      >

                        <MenuItem value="" disabled >
                          <em>Categoria</em>
                        </MenuItem>

                        {this.state.categories.map((category,i) => (
                          <MenuItem value={category.id} key={i} >{category.name}</MenuItem>
                        ))}

                 
                      </Select>
                    </FormControl>

                    <Button variant="contained" onClick={this.createBook}>Crear</Button>                  
                    </FormGroup>

                  </Box>
                </Fade>
              </Modal>
              {/*END MODAL CREATE*/}

              
              {/*START MODAL VIEW*/}
              <Modal 
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={this.state.modalView}
                onClose={this.handleModalView}
                closeAfterTransition={true}
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}>
    
                <Fade in={this.state.modalView}>
                  <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      Información de {this.state.formView.title}
                    </Typography>
                    <FormGroup>
                    <List>
                      <ListItem disablePadding>
                        <ListItemText>ISBN: {this.state.formView.isbn}</ListItemText>
                     </ListItem>

                     <ListItem disablePadding>
                     <ListItemText>Titulo: {this.state.formView.title}</ListItemText>

                     </ListItem>
                     
                     <ListItem disablePadding>
                     <ListItemText>Numero de Paginas: {this.state.formView.numberPages}</ListItemText>

                     </ListItem>
                     
                     <ListItem disablePadding>
                     <ListItemText>Edicion: {this.state.formView.edition}</ListItemText>

                     </ListItem>
                     
                      <ListItem disablePadding>
                        <ListItemText>Autor: {this.state.formView.authorName}</ListItemText>
                      </ListItem>
                     
                     <ListItem disablePadding>
                      <ListItemText>Categoria: {this.state.formView.categoryName}</ListItemText>
                     </ListItem>

                     <ListItem disablePadding>
                      <ListItemText>Editorial: {this.state.formView.editorialName}</ListItemText>
                     </ListItem>

                    </List>          
                    <Button variant="contained" onClick={this.handleModalView}>Cerrar</Button>
          
                    </FormGroup>
                  </Box>
                </Fade>
              </Modal>
              {/*END MODAL VIEW*/}


    
    
          </div>
        )
    }
}

export default TableBooks;