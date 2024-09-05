import React, { Component } from 'react'

class TodoList extends Component {

    //created a constructor
    constructor(props){

        super(props);

        this.state = {
            tasks: [],
            newTask: '',
            editIndex: null
        }

        // ensuring "this" inside these methods
        this.getItem = this.getItem.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.addOReditTask = this.addOReditTask.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
        this.editTask = this.editTask.bind(this)
    }


    // get the item from the local storage
    getItem(){
        const storedTask = localStorage.getItem('tasks');
        const parsedTask = storedTask ? JSON.parse(storedTask) : [];

        this.setState({tasks: parsedTask});
    }

    // updating the newTask with the current input value
    handleInputChange(event){
        this.setState({newTask: event.target.value})
    }

    // this is for adding or editing the Tasks
    addOReditTask(){
        const trimmedTask = this.state.newTask.trim().toLowerCase()
        if(trimmedTask !== ''){
            const taskExists = this.state.tasks.some((task, index) => task.toLowerCase() === trimmedTask && index !== this.state.editIndex);
            if(!taskExists){
            if(this.state.editIndex !== null){
                const updatingTask = [...this.state.tasks]
                updatingTask[this.state.editIndex] = this.state.newTask.trim()
                this.setState({tasks: updatingTask});
                this.setState({editIndex: null});
            }else{
                this.setState({tasks: [...this.state.tasks,this.state.newTask]});
            }
            this.setState({newTask: ''});
          }else{
            alert("Task already exists!");
          }
        }
    }

    // this is for updating the editTask and editIndex
    editTask(index){
        const editingTask = this.state.tasks[index];
        this.setState({newTask: editingTask});
        this.setState({editIndex: index});
    }

    // this is for updating after the deleting the tasks
    deleteTask(index){
        const updatingTask = this.state.tasks.filter((_, i) => i !== index)
        this.setState({tasks: updatingTask});
    }

    // this is to update the local storage with task
    updateLocalStorage(){
        localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    }

    // while starting mount this will call the getItem to get the data from localStorage
    componentDidMount(){
        this.getItem();
    }

    //  whent ever the state change the task want to update into the local storage
    componentDidUpdate(prevProps, prevState){
        if(prevState.tasks !== this.state.tasks){
            this.updateLocalStorage();
        }
    }

    // this is for catch the Error and log it to console
    componentDidCatch(error, info){
        console.log('Error: ',error);
        console.log('Info: ',info);
    }


    render() {
        return(
            <div className='to-do-list'>

                <div>
                <input type="text" 
                placeholder='Enter a Task....' 
                value={this.state.newTask}
                onChange={this.handleInputChange}/>

                <button className='add-button' onClick={this.addOReditTask}>
                    { this.state.editIndex !== null ? 'Save' : 'Add' }
                    </button>
                </div>

                <ol>
                {
                    this.state.tasks.map((task, index) => 
                       
                            <li key={index}>
                                <span className='text'>{task}</span>
                                <button className='edit-button' onClick={() => this.editTask(index)}>Edit</button>
                                <button className='delete-button' onClick={() => this.deleteTask(index)}>Delete</button>
                            </li>
                    )
                }
                </ol>

            </div>
        )
    }
}
export default TodoList;