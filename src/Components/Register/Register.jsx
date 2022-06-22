import React, { useState } from "react";
import { Alert, Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";

const Register = () => {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [pass, setPass] = useState("");
const [ph, setPh] = useState(0);
const [formError, setFormError] = useState("");
const [showSuccessMessage, setShowSuccessMessage] = useState(false);
const [error, setError] = useState("");

const [nameHasError, setNameHasError] = useState(false);
const [emailHasError, setEmailHasError] = useState(false);
const [passwordHasError, setPasswordHasError] = useState(false);
const [phoneNumberHasError, setPhoneNumberHasError] = useState(false);

const nameChangeHandler = (event) => {
    setName(event.target.value)
}
const emailChangeHandler = (event) => {
    setEmail(event.target.value)
}
const passwordChangeHandler = (event) => {
    setPass(event.target.value)
}
const phoneChangeHandler = (event) => {
    if(event.target.value.length<=10){
        setPh(event.target.value)
    }
}

const submitHandler = (event) => {
    event.preventDefault();
    if(isFormvalid()){
        const user = {
            name: name, 
            password: pass,
            email: email,
            phoneNumber: ph 

        }
        /* if(isDuplicateUser(user)){
            setFormError("User with this email already exists");
            return;
        }else {
            setFormError("")
        } */
        const users = localStorage.getItem('users')
        console.log("users", users)

        fetch('/register', {
            method : "POST",
            body: JSON.stringify({"user" : user}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(async (res) => {
                return res.json()
        })
        .then(async (res)=>{
            if(!res.ok){
                console.log("Res ok ",res)
                throw new Error(res.message)
            }else {
                console.log("response", res)
                setShowSuccessMessage(true)
            }
        }).catch(err => {
            console.log("Error ", err)
            setError(`${err}`)
        })

        setTimeout(()=>{
            setShowSuccessMessage(false)
            /* setError(false) */
        },2000)
        clearForm();
    }
}

const isDuplicateUser = (currentUser) => {
    const users = localStorage.getItem("users");
    if(users && users.length>0){
        const parsedUsers = JSON.parse(users);
        if(parsedUsers.find(user =>user.email.toUpperCase() === currentUser.email.toUpperCase())){
            return true
        }
        return false;
    }
    return false;
}
const isFormvalid = () => {
    let isValid = true;
    if(name.length<3) {
        setNameHasError(true);
        isValid = false;
    }else {
        setNameHasError(false);
    }
    if(pass.length<8 || pass.length>16){
        setPasswordHasError(true);
        isValid = false;
    }else {
        setPasswordHasError(false);
    }
    if(ph<5000000000 || ph>9999999999){
        setPhoneNumberHasError(true);
        isValid = false;
    }else {
        setPhoneNumberHasError(false);
    }
    if(!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))){
        setEmailHasError(true);
        isValid = false;
    }else {
        setEmailHasError(false);
    }
    if(isValid){
        return true
    }else {
        return false
    }
}

const clearForm = () => {
    setName("");
    setEmail("");
    setPass("");
    setPh(0);
}

   return (
      <div>
        <h2 className="pt-4 text-center">Register</h2>
        <div className="d-flex justify-content-center">
         <Form className="w-50 pt-5" onSubmit={submitHandler}>
         <FormGroup>
               <Label for="Name">Name</Label>
               <Input
                  type="text"
                  name="Name"
                  id="Name"
                  value={name}
                  onChange={nameChangeHandler}
                  invalid={nameHasError}
               />
               <FormFeedback>Name must have 3 Characters</FormFeedback>
            </FormGroup>
            <FormGroup>
               <Label for="email">Email</Label>
               <Input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={emailChangeHandler}
                  invalid={emailHasError}
               />
               <FormFeedback>Email must have @ and . characters</FormFeedback>
            </FormGroup>
            <FormGroup>
               <Label for="Password">Password</Label>
               <Input
                  type="password"
                  name="Password"
                  id="Password"
                  value={pass}
                  onChange={passwordChangeHandler}
                  invalid={passwordHasError}
               />
               <FormFeedback>password should be greater than 8 and less than 16 letters long.</FormFeedback>
            </FormGroup>
            
            <FormGroup>
               <Label for="phoneNumber">Phone Number</Label>
               <Input
                  type="number"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={ph}
                  onChange={phoneChangeHandler}
                  invalid={phoneNumberHasError}
               />
               <FormFeedback>Phone Number  must have 10 characters and must start from 5 or greater number</FormFeedback>
            </FormGroup>
            <Button type="submit" color="primary">Register</Button>
         </Form>
        </div>
         {formError !== "" &&  <div  className="d-flex justify-content-center  mt-3">
             
             <Alert className="w-50" color="danger">
                                    {formError}
                                </Alert>   
             </div>}
         {showSuccessMessage &&  <div  className="d-flex justify-content-center mt-3">
             
             <Alert className="w-50" color="success">
                                    User has been added successfully
                                </Alert>   
             </div>}
         {error &&  <div  className="d-flex justify-content-center mt-3">
             
             <Alert className="w-50" color="danger">
                {error}
            </Alert>   
             </div>}
      </div>
   );
};

export default Register;
