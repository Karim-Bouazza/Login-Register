import Axios from 'axios';
import {useState} from 'react';
import {useCookies} from 'react-cookie';
import './Auth.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';

function Auth () {
  const [cookie, setCookie] = useCookies(["access_token"]);

  const removeCookie = () => {
    setCookie("access_token", "");
    window.localStorage.removeItem("adminID");
    window.location.reload(false);
  }

   return(
    <>
       {cookie.access_token ? (
         <Button variant="danger" onClick={removeCookie}>Logout</Button>
       ) : (
         <>
          <Register/>
          <Login/>
         </>
       )}
    </>
   );
}

const Register = () => {

   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const onSubmit = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3001/Register', {
      username : username,
      password : password
    })
    .then(() => {alert("Admin Created")})
    .catch(err => {alert(err)})
  }

   return(
   <AuthForm
    label = "Register"
    username = {username}
    password = {password}
    setUsername = {setUsername}
    setPassword = {setPassword}
    onSubmit = {onSubmit}
   />);
}

const Login = () => {
   
   const [cookie, setCookie] = useCookies(["access_token"]);
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const onSubmit = async(e) => {
     e.preventDefault();

     if(!username || !password) {
      return alert("Enter Username and Password");
     } 
     try {

       const response = await Axios.post('http://localhost:3001/login', {
         username : username,
         password : password
        })
        
        if(!response.data.token) {
          return alert("Please Register First");
        }

        setCookie("access_token", response.data.token);
        window.localStorage.setItem("userID", response.data.adminID);
        window.location.reload(false);  
      } catch (error) {
        alert("error failed, please try again");
      }
      
   }

    return (
    <AuthForm
     label="Login"
     username = {username}
     password = {password}
     setUsername = {setUsername}
     setPassword = {setPassword}
     onSubmit = {onSubmit}
     />);
}

const AuthForm = ({label, username, password, setUsername, setPassword, onSubmit}) => {
      return (
        <Container>

        <Form className='form mt-4' onSubmit={onSubmit}>
        <h1 className='text-center mb-2'>{label}</h1>
        <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <Form.Control type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <Button variant="info" type="submit">{label}</Button>
        </Form>
        </Container>
       );
}

export { AuthForm };
export default Auth;