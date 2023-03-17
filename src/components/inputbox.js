import React from 'react';

const InputBox = (props) => {
  return (
    <div className='inputBox'>
      <input
        type='text'
        placeholder='Enter New Task'
        value={props.task}
        onChange={props.handleChange}
      />
      <button onClick={props.handleSubmitTask}>Add task</button>
    </div>
  );
};

export default InputBox;