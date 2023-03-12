import './App.css';
import React from 'react';
import { useState } from 'react';

function App() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [justAddedTasks, setJustAddedTasks] = useState([]);

  function handleChange(event) {
    setNewTask(event.target.value);
  }

  function handleNewTaskSubmit(event) {
    event.preventDefault();
    if (newTask.trim() !== '') {
      setJustAddedTasks([...tasks, newTask.trim()]);
      setNewTask("");
    }
  }

  function handleDragStart(event, index) {
    event.dataTransfer.setData('text', index);
    event.dataTransfer.setData('source', 'abc'); //source, source
  }
  
  function handleDrop(event, index, target) {
    event.preventDefault();
    const draggingIndex = event.dataTransfer.getData("text");
    const source = event.dataTransfer.getData("source");

    if (source === "abc") {
      const newTasks = tasks.filter((task, i) => i !== draggingIndex);
      newTasks.splice(index, 0, tasks[draggingIndex]);
      setTasks(newTasks);
    } else if (source === "justAddedTasks") {
      const newJustAddedTasks = justAddedTasks.filter((task, i) => i !== draggingIndex);
      setJustAddedTasks(newJustAddedTasks);

      const newTasks = [...tasks];
      newTasks.splice(index, 0, justAddedTasks[draggingIndex]);
      setTasks(newTasks);
    }
  }
  
  function handleDragOver(event, index) {
    event.preventDefault();
    const target = event.target;

    if (target.classList.contains("tasks")) {
      target.style.borderTop = "";
      target.style.borderBottom = "";

      const draggingIndex = event.dataTransfer.getData("text");
      const source = event.dataTransfer.getData("source");

      if (source === "abc") {
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

  return (
    <div className='App'>
      <section style={{ backgroundColor: 'white', width: '500px', height: '500px', border: '1px solid black' }}>
        <form onSubmit={handleNewTaskSubmit}>
          <input type="text"
            className='NewTask'
            id="NewTask"
            placeholder="Enter New Task"
            value={newTask}
            onChange={handleChange}
          />
          <button type="submit">Add task</button>
        </form>
        <div className="justAdded" onDragOver={(event) => handleDragOver(event, null, "justAdded")} onDrop={(event) => handleDrop(event, justAddedTasks.length, "justAdded")}>
        {justAddedTasks.map((task, index) => (
          <div
            className="tasks"
            key={index}
            draggable
            onDragStart={(event) => handleDragStart(event, index, "justAdded")}
            onDragOver={(event) => handleDragOver(event, index, "justAdded")}
            onDrop={(event) => handleDrop(event, index, "justAdded")}
            onDragEnd={(event) => {
              event.target.style.borderTop = "";
              event.target.style.borderBottom = "";
            }}
          >
            {task}
        </div>
        ))}
        </div>
        <div className="abc" onDragOver={(event) => handleDragOver(event, null, "abc")} onDrop={(event) => handleDrop(event, tasks.length, "abc")}>
        {tasks.map((task, index) => (
          <div
            className="tasks"
            key={index}
            draggable
            onDragStart={(event) => handleDragStart(event, index, "abc")}
            onDragOver={(event) => handleDragOver(event, index, "abc")}
            onDrop={(event) => handleDrop(event, index, "abc")}
            onDragEnd={(event) => {
              event.target.style.borderTop = "";
              event.target.style.borderBottom = "";
            }}
          >
            {task}
          </div>
        ))}
      </div>
    </section>
  </div>
  )
}

export default App;