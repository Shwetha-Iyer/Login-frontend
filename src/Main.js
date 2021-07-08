import {Link} from "react-router-dom";
export default function Main(){
    return <>
    <h1>Hello And Welcome to Login with MERN</h1>
    <h2>This is the main page</h2>
    <h3>Click on the below options to navigate</h3>
    <h4>
        <ul>
            <li><Link to="/login">Login Page</Link></li>
            <li><Link to="/register">Register Page</Link></li>
        </ul>
    </h4>
    </>
}