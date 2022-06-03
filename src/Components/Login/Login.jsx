import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
   Alert,
   Button,
   Form,
   FormFeedback,
   FormGroup,
   Input,
   Label,
} from "reactstrap";

const Login = () => {
   const navigate = useNavigate();
   const [email, setEmail] = useState("");
   const [pass, setPass] = useState("");
   const [error, setError] = useState("");
   const [emailHasError, setEmailHasError] = useState(false);
   const [passwordHasError, setPasswordHasError] = useState(false);

   const emailChangeHandler = (event) => {
      setEmail(event.target.value);
   };
   const passwordChangeHandler = (event) => {
      setPass(event.target.value);
   };

   const submitHandler = (event) => {
      event.preventDefault();
      const userToLogin = {
         email: email, 
         password: pass
      }
      if (isFormvalid()) {
         const users  = localStorage.getItem("users");
         if(users && users.length>0){
            const parsedusers = JSON.parse(users);
            const foundUser = parsedusers.filter(user => {
               return user.email === userToLogin.email && user.password === userToLogin.password
            })
            if(foundUser.length>0){
               setError("");
               localStorage.setItem('loggedInUser',JSON.stringify(foundUser[0]));
               navigate("/welcome")
            }else {
               setError("Incorrect username or password.")
            }
         }
      }
   };

   const isFormvalid = () => {
      let isValid = true;

      if (pass.length < 8 || pass.length > 16) {
         setPasswordHasError(true);
         isValid = false;
      } else {
         setPasswordHasError(false);
      }

      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
         setEmailHasError(true);
         isValid = false;
      } else {
         setEmailHasError(false);
      }
      if (isValid) {
         return true;
      } else {
         return false;
      }
   };

   return (
      <div>
         <h2 className="pt-4 text-center">Login</h2>
         <div className="d-flex justify-content-center">
            <Form className="w-50 pt-5" onSubmit={submitHandler}>
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
                  <FormFeedback>
                     Email must have @ and . characters
                  </FormFeedback>
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
                  <FormFeedback>Invalid Password</FormFeedback>
               </FormGroup>
               <div>Do not have account? <Link to="/register">Create One</Link></div>
               <Button type="submit" color="primary" className="mt-3">
                  Login
               </Button>
            </Form>
         </div>
         {error !== "" && 
            <div className="d-flex justify-content-center mt-3">
               <Alert color="danger" className="w-50">{error}</Alert>
            </div>
         }        
      </div>
   );
};

export default Login;
