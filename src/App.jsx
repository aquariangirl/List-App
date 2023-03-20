import './App.css';
import React, { Component } from "react";
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// component imports
// import { Login, Register } from './components/Login/index';
import TaskFeature from './components/TaskFeature';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
      tasks: [],  
    };
  }

  
  
  render() {
    return (
      <div className='App' style={{ backgroundColor: 'white', width: '500px', height: '500px', border: '1px solid black' }}>  

        <TaskFeature 
          task={this.props.task}
        />
      </div>
    )
  } 
}      
                

export default App;