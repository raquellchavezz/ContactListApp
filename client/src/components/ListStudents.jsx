import React, { useState, useEffect } from 'react'
import * as ioicons from 'react-icons/io5'
import Home from '../Home';
import Student from './Student';

const ListContacts = () => {

    // this is my original state with an array of students 
    const [contacts, setContacts] = useState([]); // we are using a state for the contacts so that we can list them to the current most updated state

    //this is the state needed for the UpdateRequest for editing a contact (put method)
    const [editingContact, setEditingContact] = useState(null)

    const loadContacts = () => {
        // A function to fetch the list of students that will be load anytime that list change
        fetch("http://localhost:8080/api/contacts")
            .then((response) => response.json())
            .then((students) => {
                setContacts(contacts); //using the setContacts func to set the contacts to most updated state and reflect that when we load the data 
            });
    }

    useEffect(() => {
        loadContacts(); 
    }, [contacts]); //this useEffect function will run whenever array of contacts changes, like side effect

    const onSaveContacts= (newContact) => { //we're creating a function called onSaveContacts that'll take in a newContact as a parameter 
        //console.log(newStudent, "From the parent - List of Students");
        setContacts((contacts) => [...contacts, newContact]); //we then want to use the setContacts function to update the state of contacts 
    } //this is an arrow func that tkes in the current value of contacts state and returns a new array that includes a copy of the existing contacts by using the spread operator
    // and also includes the additon of the newContact to the end --> way of appending newContact to exisitng array of contacts 


    //A function to control the update in the parent (student component)
    const updateContact= (savedContact) => {
        // console.log("Line 29 savedStudent", savedStudent);
        // This function should update the whole list of students - 
        loadContacts();
    }

    //A function to handle the Delete funtionality
    const onDelete = (student) => {
        //console.log(student, "delete method")
        return fetch(`http://localhost:8080/api/students/${student.id}`, {
            method: "DELETE"
        }).then((response) => {
            //console.log(response);
            if (response.ok) {
                loadStudents();
            }
        })
    }

    //A function to handle the Update functionality
    const onUpdate = (toUpdateStudent) => {
        //console.log(toUpdateStudent);
        setEditingStudent(toUpdateStudent);

    }



    return (
        <div className="mybody">
        <div className="list-students">
            <h2>Techtonica Participants </h2>
            <ul>
                {students.map((student) => {
                    return <li key={student.id}> <Student student={student} toDelete={onDelete} toUpdate={onUpdate} /></li>
                })}
            </ul>
        </div>
        <Home key={editingStudent ? editingStudent.id : null} onSaveStudent={onSaveStudent} editingStudent={editingStudent} onUpdateStudent={updateStudent} />
        </div>
    );
}


export default ListStudents