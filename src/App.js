import React, { Component } from 'react';
import Nota from './components/nota/Nota';
import firebase from 'firebase';
import 'firebase/database';
import { DB_CONFIG } from './components/config/config';
import Formulario from './components/formulario/Formulario';
import './App.css';




class App extends Component {
  constructor() {
    super();

    this.state = {
      notas: [
        // { notaId : 1, notaContent: 'nota 1'},
        // { notaId : 2 ,notaContent: 'nota 2'},
      ]
    }
    this.app = firebase.initializeApp(DB_CONFIG);
    this.db = this.app.database().ref().child('notas');
    this.agregarComentario = this.agregarComentario.bind(this);
    this.removeComentario = this.removeComentario.bind(this)
  }

  componentDidMount() {
    const { notas } = this.state;
    this.db.on('child_added', snap => {
      notas.push( { 
        notaId: snap.key,
        notaContent: snap.val().notaContent
      })
      this.setState({ notas });
    })
    
    this.db.on('child_removed', snap => {
      for(let i = 0; i< notas.length; i++) {
        if (notas[i].notaId = snap.key ) {
          notas.splice(i, 1);
        }
      }
      this.setState({ notas });
    })
  }
  removeComentario(notaId) {
    this.db.child(notaId).remove();
  }

  agregarComentario(nota) {
     
    // let { notas } = this.state;
    // notas.push({
    //   notaId: notas.length +1,
    //   notaContent: nota
    // })
    
    // this.setState({ notas })

    this.db.push().set({ notaContent: nota});

  }

  
  render() {
    return (
      <div className="notaContainer">

        <div className="notasHeader">
          <h1>Seccion de Comentarios</h1>
        </div>

        <div className="notasBody">
        <div>
          <Formulario agregarComentario = {this.agregarComentario}/>
        </div>
        <ul>
          {
            this.state.notas.map((nota) => {
              return (
                <Nota 
                notaContent = { nota.notaContent }
                notaId = {nota.notaId }
                key = {nota.notaId}
                removeComentario = {this.removeComentario}
                />
              )
            })
          }
        </ul>
      </div>

        <div className="notasFooter">
        </div>
      </div>
    );
  }
}

export default App;
