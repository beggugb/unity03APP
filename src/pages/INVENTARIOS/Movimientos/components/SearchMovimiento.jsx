import React,{useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { ButtonGroup, Row,Col,Button, Form, Modal, ModalBody, FormGroup, Input, Card } from "reactstrap"
import { crudActions } from '../../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faCheck, faEdit, faSearch, faPlus, faTrash, faFilePdf, faTimes } from "@fortawesome/free-solid-svg-icons";
import { customs } from '../../../../helpers/customStyles'
import Select from 'react-select'  
import MovimientoResumen from './MovimientoResumen'
import { defaultVal } from "../../../../helpers/funciones";

const page =[{"value":'observaciones',"label":'glosa'},
             {"value":'proveedor',"label":'proveedor'}
            ];

const SearchMovimientos = ({getComponent}) => {
    const dispatch = useDispatch()    
    const { total, indicador, indicadorTotal, indicadorCantidad, estado}= useSelector(state => state.movimientos)
    const usuario = JSON.parse(localStorage.getItem('@userUnity'))    
    const [prop, setProp] = useState('observaciones');
    const [value, setValue] = useState("");
    const [view, setview] = useState(false);
    const [viewx, setviewx] = useState(false);
    const [viewz, setviewz] = useState(false);    
    const [cuota, setcuota] = useState(1);
    
    

   const changeSelect = (pky) => {        
      const { value } = pky
      setProp(value)
    };
    
    const submitHandle = event => {       
      event.preventDefault()  
      let iok = {}               
      iok.value = value
      iok.prop  = prop
      iok.usuarioId = usuario.id
      iok.rolId = usuario.rolId      
      dispatch(crudActions.GET_SEARCH('MOVIMIENTOS_DATA','movimientos',iok))              
      console.log(iok)
   }  
  
   const onBorrar = () => {            
    dispatch(crudActions.GET_DELETE('MOVIMIENTOS_DATA','movimientos',indicador,'lista'))      
    dispatch({type:'MOVIMIENTOS_INDICADOR',value:0,estado:'pendiente',indicadorTotal:0})
    setview(false)

  };

  const toggleModalView = () => {        
    setview(!view)                  
  };
  const toggleModalViewx = () => {        
    setviewx(!viewx)      
             
  };

  const toggleModalViewz = () => {        
    setviewz(!viewz)      
             
  };
  const viewArticulo = () => {                    
    dispatch(crudActions.GET_ITEM('MOVIMIENTOS_ITEM','movimientos',indicador))
    setviewz(!viewz)
  }; 



  const aprobarMovimiento = () => {   
    let dato ={
      "id": indicador,      
      "estado": "cerrado",      
      "usuarioId" : usuario.id,
      "rolId": usuario.rolId,
      "nroPagos": cuota,
      "total": indicadorTotal,    
      "cantidad" :indicadorCantidad       
    }
           
    let xcode = {
      item: dato,      
      total:indicadorTotal
    }
    dispatch(crudActions.SET_APROBAR('MOVIMIENTOS_DATA','movimientos/aprobar',xcode,'lista'))     
    dispatch({type:'MOVIMIENTOS_INDICADOR',value:0,estado:'pendiente',indicadorTotal:0})
    setviewx(false)
  };







    return (                                      
      <>       
      <Card>    
      <Row>
        <Col md={1} >
          <div className="circule">
          <FontAwesomeIcon icon={faShoppingCart} />  
          </div>        
        </Col>    
        <Col md={4} className="cards">
          <ButtonGroup>
                <Button className={indicador !== 0 ? "btl bg-defaults text-white disabled": "btl bg-defaults text-white"}  
                onClick={()=> getComponent('new',1)}><FontAwesomeIcon icon={faPlus}/> </Button>                 
                 <Button className={indicador === 0  || estado === 'cerrado'  ? "bts bg-default text-white disabled": "bts bg-default text-white"} onClick={()=> getComponent('edit',indicador)}>
                   <FontAwesomeIcon icon={faEdit} /></Button>            
                 <Button className={indicador === 0  || estado === 'cerrado' ? "bts bg-default text-white disabled": "bts bg-default text-white"} onClick={()=> toggleModalView()}>
                   <FontAwesomeIcon icon={faTrash} /> </Button>                                
                 <Button className={indicador === 0 || estado === "pendiente" ? "bts bg-default text-white disabled": "bts bg-default text-white"} onClick={()=> viewArticulo()}>
                   <FontAwesomeIcon icon={faFilePdf} /> </Button> 
                 <Button className={indicador === 0  || estado === 'cerrado' ? "btr bg-default text-white disabled": "btr bg-default text-white"} onClick={()=> toggleModalViewx()} >
                   <FontAwesomeIcon icon={faCheck} /></Button>                                 
          </ButtonGroup>
        </Col>
        <Col md={1} className="cards text-right">
          <Select                 
                styles={customs}                                              
                defaultValue={page[0]}
                name="prop"    
                id="prop"                    
                options={page}      
                isClearable={false}                          
                value={defaultVal(page,prop)}    
                onChange={ (e) => changeSelect(e)}                                             
          />
        </Col> 

        <Col md={4} className="cards">
          <Form onSubmit={ submitHandle}> 
            <FormGroup row>                                                          
              <Col md={11}>
                <Input 
                    type="text" 
                    name="value"                                 
                    id="value"  
                    value={ value || '' }  
                    onChange={ (e) => {setValue(e.target.value)}} />   
                    {
                      value ? 
                      <Button className="volatil" onClick={(e) => {setValue('')}}>
                        <FontAwesomeIcon icon={faTimes}   />
                      </Button>
                      : null
                    } 
              </Col>
              <Col md={1}>
                <Button className="btn-primary btn-search">
                  <FontAwesomeIcon icon={faSearch} />
                </Button>  
              </Col>              
          </FormGroup>       
          </Form>               
        </Col>
        <Col md={2}> 
        <p className="mt-3 ml-3" >{ total || 0 } MovimientoS</p>          
        </Col>

      </Row>   
      </Card>  
      <Modal isOpen={view} toggle={toggleModalView} className="deleteBody">  
          <ModalBody className="deleteConte">
          <Row>
              <Col md="12" >
              <p className="deletePe">desea borra el registro ?</p>  
              </Col>              
            </Row>
            <Row className="mt-3">
              <Col md="6" className="text-center">
              <Button className="btn-danger deleteCol"  onClick={() => toggleModalView()} >
                <FontAwesomeIcon icon={faTimes} />
              </Button>
              </Col>
              <Col md="6" className="text-center">
              <Button className="btn-success deleteCol"  onClick={() => onBorrar()} >
          <FontAwesomeIcon icon={faCheck} />
        </Button>
              </Col>
            </Row>
          </ModalBody>
      </Modal>

      <Modal isOpen={viewx} toggle={toggleModalViewx} className="deleteBody">        
          <ModalBody className="deleteConte">
            <Row>
              <Col md="12" >
                <p className="deletePe">desea aprobar el movimiento ?</p>  
              </Col>              
            </Row>
            <Row className="mt-3">
              <Col md="6" className="text-center">
                <Button className="btn-danger deleteCol"  onClick={() => toggleModalViewx()} >
                  <FontAwesomeIcon icon={faTimes} />
                </Button>
              </Col>
              <Col md="6" className="text-center">
                <Button className="btn-success deleteCol"  onClick={() => aprobarMovimiento() } >
                  <FontAwesomeIcon icon={faCheck} />
                </Button>
              </Col>
            </Row>
          </ModalBody>
      </Modal>

      <Modal isOpen={viewz} toggle={toggleModalViewz}>  
      <Button className="btn-view btn-danger"  onClick={() => toggleModalViewz()} >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <ModalBody>
            <MovimientoResumen/>
          </ModalBody>
      </Modal>      
    </>                    
    );
};
export default SearchMovimientos;
