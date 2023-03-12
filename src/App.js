import './App.css';
import React from 'react';
import { useState } from 'react';

function App() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);

  function handleChange(event) {
    setNewTask(event.target.value);
  }

  function handleNewTaskSubmit(event) {
    event.preventDefault();
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask.trim()]);
      setNewTask('');
    }
  }

  function handleDragStart(event, index) {
    event.dataTransfer.setData('text', index);
  }
  
  function handleDrop(event, index) {
    event.preventDefault();
    const draggingIndex = event.dataTransfer.getData('text');
    const newTasks = tasks.filter((task, i) => i !== draggingIndex);
    newTasks.splice(index, 0, tasks[draggingIndex]);
    setTasks(newTasks);
  }
  
  function handleDragOver(event, index) {
    event.preventDefault();
    // const draggingIndex = event.dataTransfer.getData('text');
    // if (draggingIndex !== index) {
    //   const targetElement = event.target;
    //   const targetRect = targetElement.getBoundingClientRect();
    //   const targetCenter = targetRect.y + targetRect.height / 2;
    //   if (event.clientY - targetCenter > 0) {
    //     targetElement.style.borderBottom = 'solid black 2px';
    //     targetElement.style.borderTop = '';
    //   } else {
    //     targetElement.style.borderTop = 'solid black 2px';
    //     targetElement.style.borderBottom = '';
    //   }
    // }
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
        <div className='justAdded'>
          
        </div>
        <div className='abc'>
        {tasks.map((task, index) => (
          <div className='tasks' key={index}
            draggable
            onDragStart={(event) => handleDragStart(event, index)}
            onDragOver={(event) => handleDragOver(event, index)}
            onDrop={(event) => handleDrop(event, index)}
            onDragEnd={(event) => {
              event.target.style.borderTop = '';
              event.target.style.borderBottom = '';
            }}
          >
            {task}
          </div>
        ))}
      </div>
      </section>
    </div>
  );
}

export default App;