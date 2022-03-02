import React, { Component } from "react";
import TableAuthors from "./table/TableAuthors";



class Busqueda extends Component {
  constructor(props){
    super (props);
    this.state={
      data:[{}]
    }
  }


  componentDidMount = async()=>{
    const response = await fetch (`http://localhost:4000/autores`);
    const columns=await response.json()
    this.setState({
      data:columns.datos
    });
  }

  render() {    
    return (
        <div>
            <TableAuthors data={this.state.data}></TableAuthors>
        </div>
    );
  }
}

export default Busqueda;
