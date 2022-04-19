import { crudService } from "../services";
import {toastr} from 'react-redux-toastr'
export const mailActions = {        
  SEND_MAIL
};

function SEND_MAIL(payload, dato) {  
    return (dispatch) => {
      dispatch({type:'SET_LOADING',state:true})
      crudService
        .SEND_MAIL(payload,dato)
        .then((response) => {         
          toastr.success("Cotización enviada")       
          dispatch({type:'SET_LOADING',state:false})
        })
        .catch((err) => {                  
          toastr.error(payload, err)   
          dispatch({type:'SET_LOADING',state:false})
        });
  };
  }



  