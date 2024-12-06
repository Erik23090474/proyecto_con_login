import axios from "axios"
import { useState } from "react"
import {Container, Card, Form, Button} from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export const Login = () =>{
    const [data, setData] = useState({})
    const navigate = useNavigate()

    const onChange = (e)=>{
        e.preventDefault()
        const dataTempo = data
        dataTempo[e.target.name] = e.target.value
        setData(dataTempo)
    }
    const onSubmit = async ()=>{
        try {
            const res = await axios.post("http://localhost:4000/login",data)
           if (res.data.user.rol == "administrador"){
            navigate("/home")
           }else{
            navigate("/")
           }
        } catch (error) {
            console.log(error)
            alert("Hubo un error al iniciar sesion")
            
        }
    }
    return(
        <Container>
            <Card style={{
                width:"25rem",
                margin:"auto"
            }}
            className="text-center mt-3"

            >
                <Card.Body>
                    <Card.Title>Inicia sesion</Card.Title>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control onChange={onChange} name="email" placeholder="Ingresa tu correo"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                             <Form.Label>Contrasena</Form.Label>
                             <Form.Control onChange={onChange} type="password" name="password" placeholder="Ingresa tu contrasena"/>
                        </Form.Group>
                    </Form>
                    <Button onClick={()=>onSubmit()}>Enviar</Button>
                </Card.Body>
            </Card>
        </Container>
    )
}