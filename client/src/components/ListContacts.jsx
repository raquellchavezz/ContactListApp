import React, { useState, useEffect } from 'react'
import * as ioicons from 'react-icons/io5'
import Home from '../Home'; //home is a child of listContacts 
import Contact from './Contact'; //change to contact, this will be a child of listContacts 
//the states we have here are contacts,editingContact

const ListContacts = () => {

    // this is my original state with an array of contacts
    const [contacts, setContacts] = useState([]); // we are using a state for the contacts so that we can list them to the current most updated state

    //this is the state needed for the UpdateRequest for editing a contact (put method)
    const [editingContact, setEditingContact] = useState(null); //why not {}? 
//setEditingContact helps us save current variable of editing Contact

    //the function loadContacts uses fetch to make a GET request to http://localhost:8080/api/contacts endpoint of the backend server.
    
    const loadContacts = () => {
        // A function to fetch the list of students that will be load anytime that list change
        fetch("http://localhost:8080/api/contacts") //this is saying hey backend, I want to go here 
        //fetch default is a get request
        //once server/backend responds with data the first .then is executed
            .then((response) => response.json())//when front end gets response will turn into json format
            //use the json() method to extract the response body as a JSON object.
          //json() method reads the body of the response which at first is an obj that reps the response of the network request
          //^ so that does not return the actual data.. to extract the data from the response, we need to use one of the response body methods like json(), 
          //and returns a promise that resolves with the result of parsing the body text as JSON
            .then((contacts) => {
                setContacts(contacts); //using the setContacts func to set the contacts to most updated state and reflect that when we load the data 
            }); //whatver got backend, saving that into contaact state
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
        setContacts((contacts) => [...contacts, savedContact]);
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
        setEditingContact(toUpdateContact);
        // return fetch(`http://localhost:8080/api/edit/contact/${toUpdateContact.id_contact}`,{
        //         method: "PUT"
        //     }).then((response) => {
        //  //console.log(response);
        //     if (response.ok) {
        //     loadContacts();
        //         }
        //     })
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
        <Home key={editingContact ? editingContact.id_contact : null} onSaveContacts={onSaveContacts} editingContact={editingContact} onUpdateContact={updateContact} /> {/*onUpdateContact is a calllback func*/}
        {/*"key" prop is being set based on the condition of "editingContact" being truthy. If it is truthy, the key will be set to the ID of the "editingContact" object, otherwise it will be set to null.*/}
        {/*onSaveContacts" prop is a function that will be called when the component wants to save some contact information, its defned above */}
        {/*"editingContact" prop is an object that represents the contact that is currently being edited. This object will be passed to the "Home" component so that it can display the appropriate information.*/}
       {/*"onUpdateContact" prop is a callback function that will be called when the "Home" component needs to update the contact information. */}
       {/**/}
        </div> //not sure about the onsavecontact(s)
    );
}


export default ListContacts;