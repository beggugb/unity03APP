import { crudService } from "../services";
import {toastr} from 'react-redux-toastr'
export const crudActions = {        
  GET_DATA, 
  GET_LICENCIA, 
  GET_ITEM,
  GET_ITEM_SINGLE,
  GET_ITEMS,
  GET_ITEM_LOAD,
  GET_ITEM_COMPUESTO,
  GET_SEARCH,
  GET_SEARCHS,
  GET_LIST,  
  GET_DELETE,  
  GET_DELETE_LOAD,
  SET_CHANGE,
  SET_ADD,
  SET_ADD_LOAD,
  SET_ADD_SINGLE,
  SET_COPIAR,
  SET_UPDATE,
  SET_UPDATES,
  VENTA_DIRECTA,
  SET_APROBAR,
  GET_INFORMES,
  GET_CONTABLES,
  SET_UPLOAD_IMAGEN,
  GET_DASHBOARD,
  GET_SEARCH_ITEMS,
  GET_SEARCHS_ITEMS
};

function GET_LICENCIA(xredux, dato) {  
  return (dispatch) => {    
    crudService
      .GET_LICENCIA(dato)
      .then((response) => {               
       dispatch(resRedux(xredux, response));       
      })
      .catch((err) => {        
          toastr.error('err', 'No hay conexión con la licencia')      
      });
  };
}

function GET_SEARCHS_ITEMS(xredux, payload, dato) {    
  return (dispatch) => {
    /*dispatch({type:'SET_LOADING',state:true})*/
    crudService
      .GET_SEARCHS_ITEMS(payload, dato)
      .then((response) => {  
        if(response.result){                   
          dispatch(resRedux(xredux, response.result));                  
        } 
        /*dispatch({type:'SET_LOADING',state:false})*/
      })
      .catch((err) => {        
        /*dispatch({type:'SET_LOADING',state:false})*/
        toastr.error(payload, err)
      });
  };
}

function GET_SEARCH_ITEMS(xredux, payload, dato) {    
  return (dispatch) => {
    /*dispatch({type:'SET_LOADING',state:true})*/
    crudService
      .GET_SEARCH_ITEMS(payload, dato)
      .then((response) => {  
        if(response.result){                   
          dispatch(resRedux(xredux, response.result));                  
        } 
        /*dispatch({type:'SET_LOADING',state:false})*/
      })
      .catch((err) => {        
        /*dispatch({type:'SET_LOADING',state:false})*/
        toastr.error(payload, err)
      });
  };
}

function SET_COPIAR(xredux, payload, pky) {  
  return (dispatch) => {
    /*dispatch({type:'SET_LOADING',state:true})*/
    crudService
      .SET_COPIAR(payload,pky)
      .then((response) => {         
        dispatch(resRedux(xredux, response.result));        
        /*dispatch({type:'SET_LOADING',state:false})*/
        toastr.success(payload, 'Item copiado')
      })
      .catch((err) => {                  
        toastr.error(payload, err)   
        /*dispatch({type:'SET_LOADING',state:false})*/
      });
};
}

function GET_DASHBOARD(xredux, payload, dato) {  
  return (dispatch) => {
    crudService
      .GET_INFORMES(payload,dato)
      .then((response) => {      
        /*console.log(response)       */
        dispatch(resRedux(xredux, response.result));
       
      })
      .catch((err) => {
        toastr.error(payload, err)        
      });
  };
}

function SET_UPLOAD_IMAGEN(payload, data, datoId) {
  return (dispatch) => {    
    dispatch({type:'SET_LOADING',state:true})
    crudService
      .SET_UPLOAD_IMAGEN(payload, data, datoId)
      .then((response) => {                            
        setTimeout(() => { 
          dispatch({type:'SET_LOADING',state:false})
          toastr.success(payload, 'Imagen cargada')
          }, 1000);
      })
      .catch((err) => {        
        dispatch({type:'SET_LOADING',state:false})
      });
  };
}

function GET_SEARCHS(xredux, payload, dato) {    
  return (dispatch) => {
    /*dispatch({type:'SET_LOADING',state:true})*/
    crudService
      .GET_SEARCHS(payload, dato)
      .then((response) => {      
                 
        if(response.result){                   
          dispatch(resRedux(xredux, response.result));                  
        } 
        /*dispatch({type:'SET_LOADING',state:false})*/
      })
      .catch((err) => {        
        /*dispatch({type:'SET_LOADING',state:false})*/
        toastr.error(payload, err)
      });
  };
}

function GET_SEARCH(xredux, payload, dato) {    
  return (dispatch) => {
    /*dispatch({type:'SET_LOADING',state:true})*/
    crudService
      .GET_SEARCH(payload, dato)
      .then((response) => {                  
        if(response.result){                   
          dispatch(resRedux(xredux, response.result));                  
        } 
        /*dispatch({type:'SET_LOADING',state:false})*/
      })
      .catch((err) => {        
        /*dispatch({type:'SET_LOADING',state:false})*/
        toastr.error(payload, err)
      });
  };
}

function GET_INFORMES(xredux, payload, dato) {
  return (dispatch) => {   
    /*dispatch({type:'SET_LOADING',state:true})*/ 
    crudService
      .GET_INFORMES(payload, dato)
      .then((response) => {     
        console.log(response)                    
        dispatch(resRedux(xredux, response.result));  
        /*dispatch({type:'SET_LOADING',state:false})*/        
      })
      .catch((err) => {
        toastr.error(payload, err) 
        /*dispatch({type:'SET_LOADING',state:false})*/
      });
  };
}

function GET_CONTABLES(xredux, payload, dato) {
  return (dispatch) => {   
    dispatch({type:'SET_LOADING',state:true}) 
    crudService
      .GET_CONTABLES(payload, dato)
      .then((response) => {                 
        
        dispatch(resRedux(xredux, response));  
        dispatch({type:'SET_LOADING',state:false})        
      })
      .catch((err) => {
        toastr.error(payload, err) 
        dispatch({type:'SET_LOADING',state:false})
      });
  };
}

function GET_ITEMS(xredux, payload, prop, orden) {  
  return (dispatch) => {
    crudService
      .GET_ITEMS(payload, prop,orden)
      .then((response) => {             
        dispatch(resRedux(xredux, response.result));
      })
      .catch((err) => {
        toastr.error(payload, err)        
      });
  };
}



function VENTA_DIRECTA(xredux, payload, dato, tipo) {  
  return (dispatch) => {
    crudService
      .SET_ADD(payload, dato, tipo)
      .then((response) => {             
        if(response.result){      
          dispatch({type:'VENTAS_DIRECTAS'})              
          dispatch(resRedux(xredux, response.result));  
        }                            
        toastr.success(payload, 'Dato creado')       
      })
      .catch((err) => {       
        toastr.error(payload, err)       
      });
  };
}

function SET_APROBAR(xredux,payload, dato,tipo) {  
  return (dispatch) => {
    crudService
     .SET_UPDATES(payload, dato,tipo)
      .then((response) => {            
        /*console.log(response)*/  
          dispatch(resRedux(xredux, response.result));        
          toastr.success(payload, 'Compra aprobada') 
      })
      .catch((err) => {
        toastr.error(payload, err) 
      });
  };
}

function SET_UPDATES(xredux,payload, dato,tipo) {  
  return (dispatch) => {
    crudService
      .SET_UPDATES(payload, dato,tipo)
      .then((response) => {      
        if(response.item){
          dispatch(resRedux(xredux, response.result));
        }        
        toastr.success(payload, 'Dato actualizado') 
      })
      .catch((err) => {
        toastr.error(payload, err)
      });
  };
}

function GET_ITEM_COMPUESTO(xredux, payload, pky) {  
  return (dispatch) => {
    /*dispatch({type:'SET_LOADING',state:true})*/
    crudService
      .GET_ITEM(payload, pky)
      .then((response) => {            
        /*console.log(response)*/
        /*dispatch({type:'SET_LOADING',state:false})*/        
        if(xredux === 'PERSONAS_ITEM')
        {          
          dispatch({type:'PERSONAS_ITEM',response:response.result.persona})
          dispatch({type:'ESTUDIOS_ADD',response:response.result.estudios})          
          dispatch({type:'EXPERIENCIAS_ADD',response:response.result.experiencias})
        }
        if(xredux === 'CLIENTES_ITEM')
        {
          dispatch(resRedux('CLIENTES_ITEM', response.result.cliente));
          dispatch(resRedux('VENTAS_ITEM_DATA', response.result.ventas));
        }
      })
      .catch((err) => {
        /*dispatch({type:'SET_LOADING',state:false})*/
        toastr.error(payload, err)                
      });
  };
}

function GET_ITEM_LOAD(xredux, payload, pky) {  
  return (dispatch) => {
    /*dispatch({type:'SET_LOADING',state:true})*/
    crudService
      .GET_ITEM(payload, pky)
      .then((response) => {    
        console.log(response)         
        /*dispatch({type:'SET_LOADING',state:false})*/
        dispatch(resRedux(xredux, response.result)); 
        if(xredux === 'PROSPECTOS_ITEM' && response.result.articulo)
        {
          dispatch({type:'ARTICULOS_SINGLE_ITEM',response:response.result.articulo})
        }
      })
      .catch((err) => {
        /*dispatch({type:'SET_LOADING',state:false})*/
        toastr.error(payload, err)                
      });
  };
}

function GET_DELETE_LOAD(xredux, payload, pky, tipo) {  
  return (dispatch) => {
    /*dispatch({type:'SET_LOADING',state:true})*/
    crudService
      .GET_DELETE(payload, pky,tipo)
      .then((response) => {                          
        if(response.result){
          dispatch(resRedux(xredux, response.result));  
        }                            
        /*dispatch({type:'SET_LOADING',state:false})*/    
      })
      .catch((err) => {               
        /*dispatch({type:'SET_LOADING',state:false})*/    
      });
  };
}

function GET_DELETE(xredux, payload, pky, tipo) {  
  return (dispatch) => {
    crudService
      .GET_DELETE(payload, pky,tipo)
      .then((response) => {                          
        if(response.result){
          dispatch(resRedux(xredux, response.result));  
        }                            
        toastr.success(payload, 'Dato eliminado')       
      })
      .catch((err) => {               
        toastr.error(payload, err.message)       
      });
  };
}

function GET_LIST(xredux, payload, prop, orden) {  
  return (dispatch) => {
    /*dispatch({type:'SET_LOADING',state:true})*/
    crudService
      .GET_LIST(payload, prop, orden)
      .then((response) => {                             
            
       dispatch(resRedux(xredux, response.result));
       /*dispatch({type:'SET_LOADING',state:false})*/
      })
      .catch((err) => {
        /*dispatch({type:'SET_LOADING',state:false})*/
          toastr.error(payload, err)          
    });
};
}





function SET_UPDATE(xredux,payload, dato,tipo) {  
  return (dispatch) => {
    /*dispatch({type:'SET_LOADING',state:true})*/
    crudService
      .SET_UPDATE(payload, dato,tipo)
      .then((response) => {          
            
        dispatch(resRedux(xredux, response.result));        
        toastr.success(payload, 'Dato actualizado') 
        /*dispatch({type:'SET_LOADING',state:false})*/
      })
      .catch((err) => {
        toastr.error(payload, err)
        /*dispatch({type:'SET_LOADING',state:false})*/
      });
  };
}

function SET_ADD_LOAD(xredux, payload, dato, tipo) {  
  return (dispatch) => {
    /*dispatch({type:'SET_LOADING',state:true})*/
    crudService
      .SET_ADD(payload, dato, tipo)
      .then((response) => {             
        if(response.result){           
                 
          dispatch(resRedux(xredux, response.result)); 
        }  
        /*dispatch({type:'SET_LOADING',state:false})*/
      })
      .catch((err) => {       
        toastr.error(payload, err)
        /*dispatch({type:'SET_LOADING',state:false})*/      
      });
  };
}

function SET_ADD(xredux, payload, dato, tipo) {  
  return (dispatch) => {
    crudService
      .SET_ADD(payload, dato, tipo)
      .then((response) => {  
           /*console.log(response)*/        
        if(response.result){                    
          dispatch(resRedux(xredux, response.result));  
        }  
                             
        toastr.success(payload, response.message)       
      })
      .catch((err) => {       
        toastr.error(payload, err)       
      });
  };
}
function SET_ADD_SINGLE(xredux, payload, dato) {  
  return (dispatch) => {
    crudService
      .SET_ADD_SINGLE(payload, dato)
      .then((response) => {  
           /*console.log(response)*/        
        if(response.result){                    
          dispatch(resRedux(xredux, response.result));  
        }                            
        toastr.success(payload, response.message)       
      })
      .catch((err) => {       
        toastr.error(payload, err)       
      });
  };
}

function SET_CHANGE(xredux, props, values) {  
  return {
    type: xredux, props: props, value: values
  };
}

function GET_ITEM_SINGLE(xredux, payload, pky) {  
  return (dispatch) => {
    /*dispatch({type:'SET_LOADING',state:true})*/
    crudService
      .GET_ITEM_SINGLE(payload, pky)
      .then((response) => {         
        console.log(response)    
        dispatch(resRedux(xredux, response.result));
        /*dispatch({type:'SET_LOADING',state:false})*/
      })
      .catch((err) => {
        /*dispatch({type:'SET_LOADING',state:false})*/
          toastr.error(payload, err)      
      });
  };
}

function GET_ITEM(xredux, payload, pky) {  
  return (dispatch) => {
    /*dispatch({type:'SET_LOADING',state:true})*/
    crudService
      .GET_ITEM(payload, pky)
      .then((response) => {                
       dispatch(resRedux(xredux, response.result));
        /*dispatch({type:'SET_LOADING',state:false})*/
      })
      .catch((err) => {
        /*dispatch({type:'SET_LOADING',state:false})*/
          toastr.error(payload, err)      
      });
  };
}

function GET_DATA(xredux, payload, page, num, prop, orden) {  
  return (dispatch) => {
    /*dispatch({type:'SET_LOADING',state:true})*/
    crudService
      .GET_DATA(payload,page,num,prop,orden)
      .then((response) => {      
           
        dispatch(resRedux(xredux, response.result));        
        /*dispatch({type:'SET_LOADING',state:false})*/
      })
      .catch((err) => {                  
        toastr.error(payload, err)   
        /*dispatch({type:'SET_LOADING',state:false})*/
      });
};
}

export function resRedux(xredux, result) {     
  return {
    type: xredux,
    response: result
  };    
}




  