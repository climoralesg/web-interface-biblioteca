import './style/main.css';
import TableAuthors from './components/Authors/TableAuthors';
import TableEditorials from './components/Editorials/TableEditorials';
import TableCategories from './components/Categories/TableCategories';
import TableBooks from './components/Books/TableBooks';

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import GroupIcon from '@mui/icons-material/Group';
import ClassIcon from '@mui/icons-material/Class';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import * as ReactDOM from "react-dom";
import { Routes,Route, BrowserRouter } from "react-router-dom";



const drawerWidth = 240;
let routes=[{
  name:'Autores',
  href:'/autores',
  element:<TableAuthors/>,
  icon:<GroupIcon/>  
},
{
  name:'Categorias',
  href:'/categorias',  
  element:<TableCategories/>,
  icon:<ClassIcon/>   
},
{
  name:'Libros',
  href:'/libros',
  element:<TableBooks/> ,
  icon:<LibraryBooksIcon/>  
},
{
  name:'Editoriales',
  href:'/editoriales',
  element:<TableEditorials/>,
  icon:<BorderColorIcon/>   
}];

function App() {
  return (
    <div className="App">
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            CRUD WEB BIBLIOTECA
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}>

        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {routes.map((text, index) => (
              <ListItem button key={text.name} component= {Link} href={text.href}>
                <ListItemIcon>
                  {text.icon}
                </ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
          <header className="App-header">
            <BrowserRouter>
              <Routes>

                {routes.map((route,index)=>(
                  <Route key={index} path={route.href} element={route.element} ></Route>
                ))}
          
              </Routes>
            </BrowserRouter>
          </header>
      </Box>
    </Box>

    </div>
  );
}

export default App;
