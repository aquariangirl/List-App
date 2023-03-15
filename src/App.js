import './App.css';
import React, { Component } from "react";
import { Draggable } from "react-drag-reorder";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
      justAddedTasks: [],
    };
  }
 
  handleChange = (event) => {
    this.setState({ task: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ justAddedTasks: this.state.task, task: "" });
  };

  



  render() {
    const task = this.state.task;

    return (
      <div className='App'> 
    
      <section style={{ backgroundColor: 'white', width: '500px', height: '500px', border: '1px solid black' }}>
        {/* form for user input */}
        <br></br>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text"
            placeholder="Enter New Task"
            value={this.state.task}
            onChange={this.handleChange} // allows the textbox to not clear as user types
            draggable
          />
          <button type="submit">Add task</button>
        </form> 
        <br></br>

        {/* div for just added tasks box/section */}
        <div className="box">
          <div className="firstBox">
              {/* <Draggable> */}
              <div
                className="task"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", task);
                }}
              > 
              {this.state.justAddedTasks ? <p>{this.state.justAddedTasks}</p> : <p>No text submitted yet.</p>}
        
              </div>
              {/* </Draggable> */}
          </div>
        
          {/* div for task list */}
          <div className="secondBox">
              <div
                className="target" 
                id="someNewTask"
                draggable
                // key={index}
              >
                Drop target
                {/* <span>{task}</span> */}
              </div>
          </div>
        </div>
      </section>
    </div>

       
    );
  }
}

export default App;