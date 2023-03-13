import './App.css';
import React from 'react';
import { useState } from 'react';

function App() {
  const [task, setTask] = useState('');
  const [index, setIndex] = useState(0); // define index state variable
  const [newTask, setNewTask] = useState('');
  const [justAddedTasks, setJustAddedTasks] = useState([]);

  // allows user to continue typing in text box (it won't blank-out)
  function handleChange(event) {
    setNewTask(event.target.value);
  }

  // allows the new task that was just typed in to be added to the justAdded div
  function handleTaskSubmit(event) {
    event.preventDefault();
    if (newTask.trim() !== '') {
      setJustAddedTasks([...task, newTask.trim()]); // adds new task to task list
      setNewTask(""); // clears textbox
    }
  }

  function handleDragStart(event, index) {
    event.preventDefault();
    event.dataTransfer.setData('text', index); // grabs the text and index from just added task
    this.style.opacity = '0.6';
  }
  
  function handleDrag(event, index) {
    event.dataTransfer.setData("text", event.target.id);
  }
  
  function handleDrop(event, index) {
    event.preventDefault();
    const target = event.target;
  
    if (target.classList.contains("secondBox")) {
      target.style.border = "";   
  
      const draggingIndex = event.dataTransfer.getData("text");
      const source = event.dataTransfer.getData("source");

  
      if (source === "justAdded") {
      const newJustAddedTasks = justAddedTasks.filter((task, i) => i !== draggingIndex);
      setJustAddedTasks(newJustAddedTasks);
    }

    const newTasks = [...task];
    newTasks.splice(index, 0, justAddedTasks[draggingIndex]);
    setTask(newTasks);
  }
}



  return (
    <div className='App'>
      <section style={{ backgroundColor: 'white', width: '500px', height: '500px', border: '1px solid black' }}>
        {/* form for user input */}
        <form onSubmit={handleTaskSubmit}>
          <input type="text"
            id="taskInput"
            name="task"
            placeholder="Enter New Task"
            value={newTask}
            onChange={handleChange} // allows the textbox to not clear as user types
          />
          <button type="submit">Add task</button>
        </form>

        {/* div for just added tasks box/section */}
        <div className="box">
          {/* maps the newly added task so that it can be dragged  */}
          <div className="firstBox" 
            onDragOver={(event) => handleDrag(event, null, "justAdded")} 
            onDrop={(event) => handleDrop(event, justAddedTasks.length, "justAdded")}
          >
            {justAddedTasks.map((task, index) => (
              
              <div
                className="tasks"
                id="someNewTask"
                draggable
                key={index}
                // prop responsible for setting the data that will be transferred when the element is dropped
                dragStart={(event) => handleDragStart(event, index, "justAdded")}
                // prop function that is called when element is being dragged over (to drop target)
                handleDrag={(event) => handleDrag(event, index, "justAdded")}
                // prop function that is called when element is dropped in valid drop target
                handleDrop={(event) => handleDrop(event, "justAdded")}
                // prop function needed to reset drag capability
                dragEnd={(event) => {
                  event.target.style.borderTop = "";
                  event.target.style.borderBottom = "";
                }}  
              > 
                {task}
              </div>
            ))}
          </div>
          
          {/* div for task list */}
          <div className="secondBox" 
            onDragOver={(event) => handleDrag(event, null, "justAdded")} 
            onDrop={(event) => handleDrop(event, justAddedTasks.length, "justAdded")}
          >
            {justAddedTasks.map((task, index) => (
              <div
                className="tasks" 
                id="someNewTask"
                draggable
                key={index}
                onDrop={(event) => handleDrop(event, "justAdded")}
                onDragOver={(event) => event.preventDefault()}
              >
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
