import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


export class TaskFeature extends Component {
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

  
  handleSubmitTask = (event) => {
    event.preventDefault();
    console.log(this.state.inputValue);
    if (this.state.task.trim() === '') { // check if task is empty string after trimming whitespace
      return;
    }

    this.setState({
      tasks: [...this.state.tasks, this.state.task],
      task: '',
    });

  }

  handleDeleteTask = (index) => {
    const tasks = [...this.state.tasks];  // creates a copy of the tasks array
    tasks.splice(index, 1); // removes the task at the specified index
    this.setState({ tasks }); // updates the state with the new tasks array
  };

  onDragStart = () => {
    this.setState({ isDragging: true }
    );
  }

  onDragEnd = result => {
    this.setState({
      isDragging: false
    })


  const { destination, source } = result;


  if (!destination) {
    return;
  }

  const tasks = [...this.state.tasks];
  const [removed] = tasks.splice(source.index, 1);
  tasks.splice(destination.index, 0, removed);

  this.setState({ tasks });

}


 

  render() {
    return (
      <div className='TaskFeature'>  
          
        <div className='inputBox'>
          <input
            type='text'
            placeholder='Enter New Task'
            value={this.state.task}  // "state" allows handleSubmitTask to clear onClick
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmitTask}>Add task</button>
        </div>
           

        <br />
        <DragDropContext onDragEnd={this.onDragEnd}> 
          <Droppable droppableId="tasks">
            {(provided) => (
              <div className='tasks' {...provided.droppableProps} ref={provided.innerRef}>
                {this.state.tasks.map((task, index) => {  // allows each input to populate in separate div
                  return (
                    <Draggable key={task} draggableId={task} index={index}>
                      {(provided) => (
                      <section ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      >
                        <div className="pinkTask">
                          {task}
                          <button onClick={() => this.handleDeleteTask(index)} type="delete">X</button>
                        </div>
                      </section>
                      )}    
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div> 
            )}   
          </Droppable>
        </DragDropContext>
      </div>
    )
  }
}       
                

export default TaskFeature;