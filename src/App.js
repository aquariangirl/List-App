import './App.css';
import React, { Component } from "react";
import { Draggable } from "react-drag-reorder";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
      tasks: [],
      
    };
  }
 
  handleChange = (event) => {
    this.setState({ task: event.target.value });
  };

  // handleChange = ({target:{value}}) => this.setState({
  //   task: value
  // })

  handleSubmit = (event) => {
    event.preventDefault();
    // this.setState({ tasks: this.state.task, task: "" });
    this.setState({
      tasks: [...this.state.tasks, this.state.task],
      task: ''
    })
  };




  render() {
    const task = this.state.task;
    const tasks = this.state.tasks;


    return (
      <div className='App'> 
    
      <section style={{ backgroundColor: 'white', width: '500px', height: '500px', border: '1px solid black' }}>
        {/* form for user input */}
        <br></br>
          <input 
            type="text"
            placeholder="Enter New Task"
            value={this.state.task}
            onChange={this.handleChange} // allows the textbox to not clear as user types
            draggable
          />
          <button onClick={this.handleSubmit}type="submit">Add task</button>
        <br></br>

        {/* div for just added tasks box/section */}
        <div className="appContainer">
          <div className="firstBox">

            {/* <ul>
              {this.state.tasks.map((li,key) => <li {...{key}}>{li}</li>)}
            </ul> */}

    
              <div
                className="container"
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", task);
                }
              }
              > 
              {this.state.tasks.map((li,key) =>     
              <div className="taskContainer" {...{key}}>{li}</div>  // this allows each input to populate in separate div
              )}

              {/* {tasks.map((task, index)=>(
                  <React.Fragment>
                    <h3 draggable droppable onDragStart={e=> D_Start(e,index)} onDragEnter={e=> D_Enter(e,index)} onDragEnd={e=> D_End(e,index)} style={{textDecoration: todo.complete ? "line-through" : "none", background: todo.complete ? "red" : null}} onClick={e=> handleTodoClicks(e, index)} className="todo-item-text">{todo.todo}</h3>
                    {todo.isDragging ?  <div className="drag-indicator"></div> : null}
                  </React.Fragment>
              ))
              
              } */}
                  
              </div>
          </div>
        </div>
      </section>
    </div>

       
    );
  }
}

export default App;