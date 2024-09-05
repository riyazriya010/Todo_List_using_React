import React, { useState, useEffect } from 'react';

function TodoList() {
    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    });
    const [newTask, setNewTask] = useState("");
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addOrEditTask() {
        const trimmedTask = newTask.trim().toLowerCase();
    
        if (trimmedTask !== "") {
            const taskExists = tasks.some((task, index) => task.toLowerCase() === trimmedTask && index !== editIndex);
    
            if (!taskExists) {
                if (editIndex !== null) {
                    
                    const updatedTasks = [...tasks];
                    updatedTasks[editIndex] = newTask.trim();
                    setTasks(updatedTasks);
                    setEditIndex(null);
                } else {
                   
                    setTasks(t => [...t, newTask.trim()]);  // Adding Task Back
                    // setTasks(t => [newTask.trim(), ...t]); // Adding Task Top
                }
                setNewTask("");
            } else {
                
                alert("Task already exists!");
            }
        }
    }
    
    

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function editTask(index) {
        setNewTask(tasks[index]);
        setEditIndex(index);
    }

    return (
        <div className='to-do-list'>
            <h1>To-Do-List</h1>
            
            <div>
                <input 
                    type="text"
                    placeholder='Enter task...'
                    value={newTask}
                    onChange={handleInputChange} 
                />
                <button
                    className='add-button'
                    onClick={addOrEditTask}
                >
                    {editIndex !== null ? "Save" : "Add"}
                </button>
            </div>

            <ol>
                {tasks.map((task, index) =>
                    <li key={index}>
                        <span className='text'>{task}</span>
                        <button className='edit-button' onClick={() => editTask(index)}>Edit</button>
                        <button className='delete-button' onClick={() => deleteTask(index)}>Delete</button>
                    </li>
                )}
            </ol>
        </div>
    );
}

export default TodoList;
