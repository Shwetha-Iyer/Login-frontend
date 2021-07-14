import { useEffect } from "react";
import {useHistory} from "react-router-dom";
const axios = require("axios");
export default function Dashboard(props){
    let history = useHistory();
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
          withCredentials: true,
          crossDomain: true
        }).then((res) => {
          console.log(res);
          if(res.status===200){
            console.log("Logged in");
             axios.get("https://restcountries.eu/rest/v2/all").then(()=>console.log("restcountries")).catch((error)=> {
                console.log(error);
             });
            //history.push(`/dashboard/${res.data.sessUser.email}`)
          }
          else{
          console.log("not loggedin");
          
        }
        })
        .catch((error) => {
          console.log(error);
          history.push("/login");
        });

        
    },[history]);
    let logout = ()=>{
        axios.delete("https://login-mern.herokuapp.com/api/users/logout",{
          headers:{
            'Content-Type': 'application/json'
          },
          withCredentials:true,
          crossDomain:true
        }).then((res) => {
          console.log(res);
          if(res.status===200){
            console.log("Logged out");
            history.push(`/login`);
          }
          else
          console.log("not loggedout");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return <>
    <h1> welcome to your dashboard {props.match.params.id}</h1>

    <br/>
    <br/>
    <button type="button" onClick={logout}>Logout</button>
    </>
}
