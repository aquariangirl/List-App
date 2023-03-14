import './App.css';
import React from 'react';
import { useState } from 'react';


function handleTargetDragOver(event) {
  event.preventDefault();
  event.target.style.backgroundColor = "lightgray";
}

function handleTargetDrop(event) {
  event.preventDefault();
  event.target.style.backgroundColor = "";
  const taskId = event.dataTransfer.getData("text");
  const taskElement = document.getElementById(taskId);
  event.target.appendChild(taskElement);
}

function App() {
  const [task, setTask] = useState('');
  const [setIndex] = useState(0); // define index state variable
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
    // this.style.opacity = '0.6'; // dragged item has reduced opacity
    event.dataTransfer.setData('text', index); // grabs the text and index from just added task
    event.dataTransfer.setData('source', 'secondBox');
  }
  
  function handleDragOver(event, index) {
    event.preventDefault();
    event.dataTransfer.setData("text", event.target.id);

    const target = event.target;

    if (target.classList.contains("task")) {
      target.style.borderTop = "";
      target.style.borderBottom = "";

      const draggingIndex = event.dataTransfer.getData("task"); // text?
      const source = event.dataTransfer.getData("source");

      if (source === "secondBox") {
        const targetIndex = Array.from(target.parentNode.children).indexOf(target);
        if (draggingIndex < targetIndex) {
          target.style.borderTop = "solid black 2px";
        } else {
          target.style.borderBottom = "solid black 2px";
        }
       } else if (source === "justAdded") {
        target.style.borderBottom = "solid black 2px";
      }
    }
  }

  function handleDrop(event, index, target) {
    event.stopPropagation(); 
    // event.preventDefault();
    const draggingIndex = event.dataTransfer.getData("task"); // text?
    const source = event.dataTransfer.getData("source");

    if (source === "secondBox") {
      const newTasks = task.filter((task, i) => i !== draggingIndex);
      newTasks.splice(index, 0, task[draggingIndex]);
      setTask(newTasks);
    } else if (source === "justAddedTasks") {
      const newJustAddedTasks = justAddedTasks.filter((task, i) => i !== draggingIndex);
      setJustAddedTasks(newJustAddedTasks);

      const newTasks = [...task];
      newTasks.splice(index, 0, justAddedTasks[draggingIndex]);
      setTask(newTasks);
      setIndex(0); // reset the index
  }

  
  

}

  return (
    
    <div className='App'> 
    
      <section style={{ backgroundColor: 'white', width: '500px', height: '500px', border: '1px solid black' }}>
        {/* form for user input */}
        <br></br>
        <form onSubmit={handleTaskSubmit}>
          <input 
            type="text"
            id="taskInput"
            name="task"
            placeholder="Enter New Task"
            value={newTask}
            onChange={handleChange} // allows the textbox to not clear as user types
            draggable
            onDragStart={() => {
              setIndex(justAddedTasks.length);
            }}
          />
          <button type="submit">Add task</button>
        </form> 
        <br></br>

        {/* div for just added tasks box/section */}
        <div className="box">
          {/* maps the newly added task so that it can be dragged  */}
          <div className="firstBox" 
            onDragOver={(event) => handleDragOver(event, null, "justAdded")} 
            onDrop={(event) => handleDrop(event, justAddedTasks.length, "justAdded")}
          >
            {justAddedTasks.map((task, index) => (
              
              <div
                className="task"
                id="someNewTask"
                draggable
                key={index}

                // prop responsible for setting the data that will be transferred when the element is dropped
                handleDragStart={(event) => handleDragStart(event, index, "task")}
                // prop function that is called when element is being dragged over (to drop target)
                handleDragOver={(event) => handleDragOver(event, index, "task")}
                // prop function that is called when element is dropped in valid drop target
                handleDrop={(event) => handleDrop(event, "task")}
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
            onDragOver={(event) => handleDragOver(event, null, "justAdded")} 
            onDrop={(event) => handleDrop(event, justAddedTasks.length, "secondBox")}
          >
            {/* edit line */}
            {justAddedTasks.map((justAddedTasks, index) => (
              <div
                className="target" 
                id="someNewTask"
                draggable
                key={index}
                onDragOver={handleTargetDragOver}
                // prop function that is called when element is dropped in valid drop target
                handleDrop={(event) => handleDrop(event, "task")}
                onDrop={handleTargetDrop}                
              >
                Drop target
                {/* <span>{task}</span> */}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
