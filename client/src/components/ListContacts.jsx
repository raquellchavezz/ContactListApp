import React, { useState, useEffect } from 'react'
import * as ioicons from 'react-icons/io5'
import Home from '../Home'; //home is a child of listContacts 
import Contact from './Contact'; //change to contact, this will be a child of listContacts 
//the states we have here are contacts,editingContact

const ListContacts = () => {

    // this is my original state with an array of students 
    const [contacts, setContacts] = useState([]); // we are using a state for the contacts so that we can list them to the current most updated state

    //this is the state needed for the UpdateRequest for editing a contact (put method)
    const [editingContact, setEditingContact] = useState(null)

    const loadContacts = () => {
        // A function to fetch the list of students that will be load anytime that list change
        fetch("http://localhost:8080/api/contacts") //backend
            .then((response) => response.json())
            .then((contacts) => {
                setContacts(contacts); //using the setContacts func to set the contacts to most updated state and reflect that when we load the data 
            });
    }

    useEffect(() => { // a hook
        loadContacts(); 
    }, []); //this useEffect function will run whenever array of contacts changes, like side effect

    const onSaveContacts= (newContact) => { //we're creating a function called onSaveContacts that'll take in a newContact as a parameter 
        //console.log(newStudent, "From the parent - List of Students");
        setContacts((contacts) => [...contacts, newContact]); //we then want to use the setContacts function to update the state of contacts 
    }//passing it a func here thru the =>  
    //this is an arrow func that tkes in the current value of contacts state and returns a new array that includes a copy of the existing contacts by using the spread operator
    // and also includes the additon of the newContact to the end --> way of appending newContact to exisitng array of contacts 


 

    //A function to control the update in the parent (student component) //change student to contact
    const updateContact= (savedContact) => {
        // console.log("Line 29 savedStudent", savedStudent);
        // This function should update the whole list of contacts- 
        loadContacts();
    }

    //A function to handle the Delete funtionality
    const onDelete = (contact) => {
        //console.log(student, "delete method")
        return fetch(`http://localhost:8080/api/contacts/${contact.id_contact}`, {
            method: "DELETE"
        }).then((response) => {
            //console.log(response);
            if (response.ok) {
                loadContacts();
            }
        })
    }

    // A function to handle the Update functionality, this is being passed to Contact.jsx
    const onUpdate = (toUpdateContact) => {
        console.log(toUpdateContact);
        setEditingContact(toUpdateContact);

    }



    return (
        <div className="mybody">
        <div className="list-students">
            <h2>Contact List App </h2>
            <ul>
                {/*the elem in contacts = contact*/}
                {contacts.map((contact, index) => { //for each elem of contacts
                    return <li key={index}> <Contact contact={contact} toDelete={onDelete} toUpdate={onUpdate} /></li> //prop name would need to match
             //used to loop over vals in the contact array to return a collection of items
                })}
            </ul>
        </div>
        <Home key={editingContact ? editingContact.id : null} onSaveContacts={onSaveContacts} editingContact={editingContact} onUpdateContact={updateContact} />
        </div> //not sure about the onsavecontact(s)
    );
}


export default ListContacts;