import React, { useState, useEffect } from 'react'
import { Button, Form } from "react-bootstrap" 

const Home = ({ onSaveContacts, editingContact, onUpdateContact }) => { //destructuring props by listing keys in it
// const Home =(props) => { //props holding all data points
// props.onSaveContact,
// props.editingContact
// props.onUpdateContact 
    
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
        setContact((contact) => ({ ...contact, firstname }));

    };

    const handleLastnameChange = (event) => {
        const lastname = event.target.value;
        setContact((contact) => ({ ...contact, lastname }));
    };


    const handlePhoneNumberChange = (event) => {
        const phoneNumber = event.target.value;
        setContact((contact) => ({ ...contact, phoneNumber}));
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
        return fetch("http://localhost:8080/api/contacts", {
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

    //A function to handle the post request
    const putContact = (toEditContact) => {
        return fetch(`http://localhost:8080/api/contacts/${toEditContact.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(toEditContact),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                onUpdateContact(data);
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
            <Button type="submit" variant="outline-success">{contact.id ? "Edit Student" : "Add New Contact"}</Button>
            {contact.id ? <Button type="button" variant="outline-warning" onClick={clearForm}>Cancel</Button> : null}
            </Form.Group>
        </Form>
    );
};


export default Home;