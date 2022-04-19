import React,{useState} from 'react';
import { Form, FormGroup, Col, Button, Input, ButtonGroup  } from "reactstrap";
import { useDispatch } from 'react-redux'
import { usuarioActions } from '../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faLock } from "@fortawesome/free-solid-svg-icons";  
export default function LoginView({setToken}) {
    const dispatch = useDispatch() 
    const [user, setUser] = useState({
      username:"",
      password:""
    })
    const handleChange = prop => event => {                         
      setUser({      
          ...user,
          [prop]: event.target.value
      })  
    } 
  
    const submitHandle = event => {       
      event.preventDefault()        
      dispatch(usuarioActions.login(user))
      
   }
   
  return(
    <div className="pos">
      <div className="contenedor">
        <div className="contenidoLeft">
          <div className="imas">
            <img src={require("../../assets/img/login.png")}/>
          </div>  
        </div>   
        <div className="contenidoRights">   
        <div className="login">    
          <Form className="form-login mt-3" onSubmit={submitHandle}>
          <h5>Iniciar Sessión</h5>
          <FormGroup row>
            <Col sm={2} className="io-blue">
              <FontAwesomeIcon icon={faUser} />
            </Col>
            <Col sm={10}>
              <Input
                type="text"
                name="username"
                id="username"
                value={user.username}
                placeholder="username"
                onChange={handleChange("username")}
                onInvalid={(e) => e.target.setCustomValidity('campo necesario !!')}
                onInput={(e) => e.target.setCustomValidity('')}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={2} className="io-blue">
              <FontAwesomeIcon icon={faKey} />
            </Col>
            <Col sm={10}>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="**********"
                value={user.password}
                onChange={handleChange("password")}
                onInvalid={(e) => e.target.setCustomValidity('campo necesario !!')}
                onInput={(e) => e.target.setCustomValidity('')}
                required
              />
            </Col>
          </FormGroup>
            <div className="button-container">
              <ButtonGroup>
                <Button type="submit" className="btn-infos mt-5 btn-md">
                  <FontAwesomeIcon icon={faLock} />
                  {' '} Ingresar
                </Button>
              </ButtonGroup>
            </div>
          </Form>
        </div>
        </div>  
      </div>
    </div>    
  )
}
