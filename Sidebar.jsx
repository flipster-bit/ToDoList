import React from 'react';
import {FaInbox,FaRegCalendarAlt,FaRegCalendar} from 'react-icons/fa';

const Sidebar = ({selectedtab,setselectedtab}) => {
    
    return (
        <div className="sidebar">
            <div className= {selectedtab === "Index" ? "active" : ""} onClick={() => setselectedtab("Index")}>
                <FaInbox className="icon"/>
                Inbox
            </div>
            <div className= {selectedtab === "today" ? "active" : ""} onClick={()=>setselectedtab("today")}>
            <FaRegCalendarAlt className="icon" />
                Today
            </div>
            <div className= {selectedtab === "next_7" ? "active" : ""} onClick={() => setselectedtab("next_7")}>
                <FaRegCalendar className="icon"/>
                Next 7 days
            </div>
        </div>
    )
}

export default Sidebar
