import React, { Component } from 'react';
import './formulario.css';

class Formulario extends Component {
    constructor() {
        super();

        this.agregarComentario = this.agregarComentario.bind(this);
    }

    agregarComentario (){
        // return console.log(this.inputText.value);
        this.props.agregarComentario(this.inputText.value)
        this.inputText.value = '';
        
    }
    render() {
        return (
            <div className="formulario">
            <input 
            ref= { input => {this.inputText = input; }}
            placeholder= 'En que estas pensando'
            type="text"/>
            <button onClick = { this.agregarComentario }> Agregar Nota </button>
            </div>

        )
    }
};

export default Formulario;
