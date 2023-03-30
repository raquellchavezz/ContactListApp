import React, { useState, useEffect } from 'react'
import { Button, Form } from "react-bootstrap" 

const Home = ({ onSaveContacts, editingContact, onUpdateContact }) => { //destructuring props by listing keys in it
// const Home =(props) => { //props holding all data points
// props.onSaveContact,
// props.editingContact
// props.onUpdateContact --> coming from listContacts.jsx which is the parent of home, so we are passing in the functioon onUpdateContact thru a prop
//onUpdateContact is a callback prop that is passed to a child component as a prop value.
// The child component can then call this function, usually with some data or state changes, to notify the parent component of the update.
// }
    // This is the original State with not initial contact 
    const [contact, setContact] = useState(editingContact || {
        firstname: "",
        lastname: "",
        phonenumber: "",
        email:"",
    });

    //create functions that handle the event of the user typing into the form
    const handleNameChange = (event) => {
        const firstname = event.target.value;
        setContact((contact) => ({ ...contact, firstname })); //these must match the object names so firstname, lastname, etc

    };

    const handleLastnameChange = (event) => {
        const lastname = event.target.value;
        setContact((contact) => ({ ...contact, lastname }));
    };


    const handlePhoneNumberChange = (event) => {
        const phonenumber = event.target.value;
        console.log(phonenumber);
        setContact((contact) => ({ ...contact, phonenumber}));
    };


    const handleEmailChange = (event) => {
        const email = event.target.value;
        setContact((contact) => ({ ...contact,email}));
    };


    // const handleCheckChange = (event) => {
    //     const is_current = event.target.checked;
    //     //console.log(iscurrent);
    //     setContact((contact) => ({ ...contact, is_current }));
    // };

    const clearForm = () => {
        setContact({ firstname: "", lastname: "", phonenumber: "", emaiL:"" })
    }

    //A function to handle the post request
    const postContact = (newContact) => {
        return fetch("http://localhost:8080/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newContact),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                //console.log("From the post ", data);
                //I'm sending data to the List of Students (the parent) for updating the list
                onSaveContacts(data);
                //this line just for cleaning the form
                clearForm();
            });
    };

    //A function to handle the put request
    const putContact = (toEditContact) => { //this func will take in some sort of value which is the contact we want to edit in the existing list of contacts
        return fetch(`http://localhost:8080/api/edit/contact/${toEditContact.id}`, { //the front end will send a request to this url to update the contact using put method
        //This URL is expected to be the endpoint of the server that handles the update operation. The toEditContact.id is used to specify the id of the contact that needs to be updated.    
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(toEditContact), //The body of the request is the toEditContact object that has been passed as an argument to the function
                    //JSON.stringify() method is used to convert the toEditContact object into a JSON string.
        })
            .then((response) => { // then() method is used to handle the response from the server. 
                return response.json(); //turn response to json format
            })
            .then((data) => {
                onUpdateContact(data);  //resulting data is then passed as an argument to the onUpdateContact() function which handles updating the contact list in the UI. 
                //this line just for cleaning the form
                clearForm();
            });
    };


    //A function to handle the submit in both cases - Post and Put request!
    const handleSubmit = (e) => {
        e.preventDefault();
        if (contact.id) {
            putContact(contact); //editing 
        } else {
            postContact(contact); //adding a contact 
        }
    };

    return (
        <Form className='form-contacts' onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>First Name</Form.Label>
                <input
                    type="text"
                    id="add-user-name"
                    placeholder="First Name"
                    required
                    value={contact.firstname}
                    onChange={handleNameChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <input
                    type="text"
                    id="add-user-lastname"
                    placeholder="Last Name"
                    required
                    value={contact.lastname}
                    onChange={handleLastnameChange}
                />
            </Form.Group>


            <Form.Group>
                <Form.Label>Phone number</Form.Label>
                <input
                    type="text"
                    id="add-user-phonenumber"
                    placeholder="555-555-5555"
                    required
                    value={contact.phonenumber}
                    onChange={handlePhoneNumberChange}
                />
            </Form.Group>


            <Form.Group>
                <Form.Label>email</Form.Label>
                <input
                    type="text"
                    id="add-user-email"
                    placeholder="abcd123@gmail.com"
                    required
                    value={contact.email}
                    onChange={handleEmailChange}
                />
            </Form.Group>
            {/* <Form.Check
                type={'checkbox'}
                id={`isCurrent`}
                // checked={contact.is_current}
                onChange={handleCheckChange}
                label={`Are they in the current program?`}
            /> */}
            <Form.Group>
            <Button type="submit" variant="outline-success">{contact.id ? "Edit Contact" : "Add New Contact"}</Button>
            {contact.id ? <Button type="button" variant="outline-warning" onClick={clearForm}>Cancel</Button> : null}
            </Form.Group>
        </Form>
    );
};


export default Home;