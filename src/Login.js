import {useFormik} from "formik";
import { useEffect } from "react";
const axios = require("axios");
export default function Login(){
    useEffect(()=>{

        // async function fetchdata(){
        //     let resp = await fetch(`http://localhost:3100/api/users/authchecker`);
        //     let data = await resp.json();
        //     console.log(data);
        //     if(resp.status===200){
        //         console.log("user already logged in");
        //     }
        //     else{
        //         console.log("user not logged in");
        //     }
        // }
        // fetchdata();
        axios.get("https://login-mern.herokuapp.com/api/users/authchecker",{
          headers:{
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }).then((res) => {
          console.log(res);
          if(res.status===200){
            console.log("Logged in");
          }
          else
          console.log("not loggedin");
        })
        .catch((error) => {
          console.log(error);
        });

        
    },[])
    let formik = useFormik({
        initialValues: {
          email: "",
          password: "",
        },
        validate: (values) => {
          let errors = {};
         if (!values.email) {
            errors.email = "Required";
          }
          else if(!((values.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))&&(values.email.includes(".")))){
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = "Required";
          }
          else if(!(values.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,15}$/))){
            errors.password = "Password must be atleast 8 characters, 1 Uppercase, 1 Lowercase, 1 Number, max 15 characters";
          }
          
          return errors;
        },
        onSubmit: async (values) => {
          //console.log("Final Values", values);
          let email = values.email;
          let password = values.password;
          // let check = await fetch("http://localhost:3100/api/users/login", {
          //   method: "POST",
          //   body: JSON.stringify({
          //     email,
          //     password
          //   }),
          //   credentials:"same-origin",
          //   headers: {
          //     "Content-type": "application/json",
          //   },
          // });
          // if(check.status===200){
          //   let data = await check.json();
          //   // history.push(`/dashboard/${data.id}`);
          //   console.log("login success",data);
          // }
        //     else if(check.status===400){
        //     //setLogfail("Account not activatd");
        //   }
        //  else{
        //     //setLogfail("Wrong Email or Password!");
        //     console.log("failed");
        //  }
        axios.post("https://login-mern.herokuapp.com/api/users/login",{email,password},{
          headers:{
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }).then((res) => {
          console.log(res);
          if(res.status===200){
            console.log("Logged in success");
          }
          else
          console.log("something went wrong");
        })
        .catch((error) => {
          console.log(error);
        });
        },
      });
    return <>
    <h1> Hello! You have come to Login Page</h1>
    <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}/>
        {formik.errors.email && formik.touched.email ? (
                            <div> {formik.errors.email}</div>
                            ) : null}
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password}/>
        {formik.errors.password && formik.touched.password ? (
                            <div> {formik.errors.password}</div>
                            ) : null}
        <button type="submit">Submit</button>
    </form>
    </>
}