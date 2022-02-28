import React, { Component } from "react";
import Tableinformation from "./table/Tableinformation";



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
            <Tableinformation data={this.state.data}></Tableinformation>
        </div>
    );
  }
}

export default Busqueda;
