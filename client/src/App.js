import "./App.css";
import Axios from 'axios';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Form, ListGroup, Badge, Button} from 'react-bootstrap';

function App () {
    
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");

    // GET DATA
    useEffect(() => {
      Axios.get("http://localhost:3001/users")
      .then ( res => {
         setUsers(res.data);
      })     
    }, [users])

    // SEND DATA
    const CreatUser = (e) => {
      if(name && email && age) {
        Axios.post("http://localhost:3001/creatUser", {
          name : name,
          email : email,
          age : age
        })
      }
    }

    return (
       <Container>
            <h3 className="text-center my-3">Enter your Information</h3>
            <Form className="form">
             <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => {setName(e.target.value)}}/>
             <Form.Control type="email" placeholder="email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
             <Form.Control type="number" placeholder="age" value={age} onChange={(e) => {setAge(e.target.value)}}/>
            <Button variant="info" type="submit" onClick={CreatUser}>Send</Button>
           </Form>

           <div className="result">
            {users.map(user => {
             return (
               <ListGroup className="_key">
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <div className="ms-2 me-auto"> 
                    <div className="few-bold">
                      {`${user.name}`}
                    </div>
                    {user.email}
                  </div>
                  <Badge variant="info" pill>{user.age}</Badge>
                </ListGroup.Item>
               </ListGroup>
               )}
              )}
            </div>

       </Container>
    );
}

export default App;