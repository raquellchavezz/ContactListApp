import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import * as ioicons from 'react-icons/io5'

//names using below have to match the same prop declaration on line 70 in the parent (ListContacts) otherwise won't refer to same values
const Contact = ({contact, toUpdate, toDelete}) => { //takes in 3 props from the parent contact, toUpdate and toDelete, remember we can pass functions as props from parent to child
// contact is an object that contains information about the contact to be displayed.
//toUpdate and toDelete are callback functions that are passed down from the parent component and are used to update or delete a contact.
//function to update the contact with new info:    
const onUpdate = (toUpdateContact) => { //passing in the toUpdateContact which is an obj
        toUpdate(toUpdateContact) //ToUpdate is a function that is being passed here from the parent to this Contact.jsx file which is the child, we're saying that we want to update the list of contacts
    }
    //By passing the toUpdateContact object to the toUpdate function, the parent component is notified that the user wants to update the contact with the new information. 
    /*onUpdate is called when the update button is clicked, and it passes the toUpdateContact
     object to the toUpdate function passed in as a prop.*/


// console.log(contact);
    const onDelete = (toDeleteContact) => {
        toDelete(toDeleteContact)
    }

    return (
        <Card>
            <Card.Body>
            <Card.Title className = "card-title">  <ul><li> Full Name: {contact.firstname} {contact.lastname}</li>  <li> Phone Number:{contact.phonenumber}</li> <li> Email: {contact.email}</li> </ul></Card.Title>
            <Button variant="outline-danger" onClick={()=>{onDelete(contact)}} style={{padding: '0.6em', marginRight:'0.9em'}}>Delete<ioicons.IoTrash/></Button>
            <Button variant="outline-info" onClick={()=>{onUpdate(contact)}} style={{padding: '0.6em'}}> Edit <ioicons.IoSync/></Button>
            </Card.Body>
        </Card>
    )

}

export default Contact;