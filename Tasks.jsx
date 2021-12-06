import React,{useState} from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import "react-day-picker/lib/style.css";
import dateFnsFormat from "date-fns/format"
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isToday from 'date-fns/isToday';
import addDays from 'date-fns/addDays';


const FORMAT = "dd/MM/yyyy";
function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale });
  }


const Add_Tasks = ({onCancel , onAdd}) => {
    
    const [text, settext] = useState("");
    const [date, setdate] = useState(null);    
    return(

        <div className="add-tsk-dial">
                <input value={text} onChange={(e)=>settext(e.target.value)}/>
            
            <div className="add-task-actions-container">

                <div>
                    <button className="add_tsk" disabled={!text} onClick={() => {onAdd(text,date);onCancel();settext("")}}>Add Task</button>
                    <button className="cnc" onClick={() => {onCancel();settext("")}}>Cancel</button>
                </div>
                <div className="icon-container">
                    <DayPickerInput onDayChange={(day) => setdate(day)} placeholder={`${dateFnsFormat(new Date(),FORMAT)}`} 
                    formatDate={formatDate}
                    format={FORMAT}
                    
                    dayPickerProps={{
                        modifiers:{
                            disabled:[
                                {before:new Date()}
                            ]
                        }
                    }}/>
                </div>

            </div>

            </div>
    )
    
}
let Task_Header_Map = {
    Index : "Inbox",
    today : "Today",
    next_7 : "next 7 days",
};

const Tasks = ({selectedtab}) => {
    

    const [showAddTask,setshowAddTask] =  useState(false);

    const [tasks, settasks] = useState([]);

       
        const addNewTask = (text,date) => {

            const newTask = {text, date: date || new Date()}
            settasks((prevState) => [...prevState , newTask]);
        }

        const handleToggle = () => {

            if(showAddTask){
                setshowAddTask(false);
            }
            else{
                setshowAddTask(true);
            }
        }

        return (
            <div className="tasks">
                <h1>{Task_Header_Map[selectedtab]}</h1>
                <div className="add-btn-task" onClick={handleToggle}>
                <span className="plus">+</span>
                <span className="add-task-text" >Add Tasks</span>
            </div>
            {showAddTask && <Add_Tasks onAdd={addNewTask}  onCancel={()=>setshowAddTask(false)}/>}
            
            {tasks.length > 0 ? <Show_Tasks tasks={tasks} selectedtab={selectedtab}/> : <p>No Tasks Yet!</p>}
            </div>            
        )
    
}

const Show_Tasks = ({tasks , selectedtab}) => {

    if(selectedtab === "next_7"){
        return(
            
           tasks.filter((task) => 
                        isAfter(task.date,new Date()) &&
                        isBefore(task.date ,addDays(new Date(), 7))
           ).map((task) => (
            <p>{task.text}{" "}{dateFnsFormat(new Date(task.date),FORMAT)}</p>
           ))

        );
    }
    if(selectedtab === "today"){
        return(

            tasks.filter((task) => isToday(task.date)).map((task) => <p>{task.text}{" "}{dateFnsFormat(new Date(task.date),FORMAT)}</p>)
        );
    }

    return(
        tasks.map((task) => <p>{task.text}{" "}{dateFnsFormat(new Date(task.date),FORMAT)}</p>)
    );
}

export default Tasks
