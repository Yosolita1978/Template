import { useState, useEffect } from "react";
import Form from "./form";

function Students() {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetch("/api/students")
        .then((response) => response.json())
        .then(students =>{
            //setStudents((students[3]));
            //console.log("Testing", typeof students);
            setStudents(students);       
        })
        
    }, []);

    

    const addStudent = (newStudent) => {
        //console.log(newStudent);
        //postStudent(newStudent);
        setStudents((students) => [...students, newStudent]);
    }


    return (
      <div className="students">
        <h2> List of Students Cohort 2022 </h2>
        <ul>
            {students.map(student =>
                <li key={student.id}> {student.firstname} {student.lastname}</li>)}
        </ul>
        <Form addStudent={addStudent} />
      </div>
    );
  }
  
  export default Students;