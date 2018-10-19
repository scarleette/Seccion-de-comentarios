import React, { Component } from 'react';
import './nota.css';

class Nota extends Component {
    constructor(props) {
        super(props);

        this.notaContent = props.notaContent;
        this.notaId = props.notaId;
    }


    handleRemove(id) {
       this.props.removeComentario(id);
    }
    render() {
        return (
            <div className = 'nota'>
            <span onClick = { () => this.handleRemove(this.notaId)} > &times; </span>
             <p> {this.notaContent} </p>


            </div>
        )
    }

}


export default Nota;