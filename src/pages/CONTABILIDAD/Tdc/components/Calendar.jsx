import React, { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react'
import { Modal } from 'reactstrap'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../../actions'
import FormTdc from "./FormTdc"
import { getMes } from "../../../../helpers/funciones";



const Calendar = () => {  
  const dispatch = useDispatch()
  const {data, item}  = useSelector(state => state.tdcs)   
  const user = JSON.parse(localStorage.getItem('@userUnity'))
  const [modalView, setModalView] = useState(false)
  const [fecha, setfecha] = useState('');

  const makeHttpRequestWithPage = (xredux) =>{
    const {desde, hasta } = getMes()        
    let dato = {}
    dato.usuarioId = user.id
    dato.start = desde
    dato.end = hasta
    dato.inicio = desde
    dato.fin = hasta    
    dispatch(crudActions.SET_ADD_LOAD(xredux,'tdcs',dato,'lista'))  
  }
  

useEffect(() =>{            
  makeHttpRequestWithPage('TDCS_DATA','tdcs');          
  return () =>{            
    dispatch({type:'TDCS_RESET'})
};
}, []);
const toogleModalView = () => {                                               
  setModalView(false)
}

const register = (arg) =>{  
  setfecha(arg.dateStr)
  setModalView(true)
}

const registers = it =>{  
  
  let kko = {    
    id      : it.event.id,    
    title   : it.event.title,    
    start   : it.event.start,
    end     : it.event.start,
    detalle   : it.event.extendedProps.detalle,
    usuarioId : it.event.extendedProps.usuarioId,
    backgroundColor : it.event.backgroundColor    
  }     
  dispatch({type:'TDCS_ITEM',response:kko})  
  setModalView(true)
}


return(
  <>
  <div className="registroCalendario">
  <h6 className="ml-1 mt-2" >Tipos de Cambio</h6>  
  <FullCalendar      
     		locales={[ esLocale]}  
     		locale= {'es'}
        timeZone={'America/La_Paz'}
        navLinks={true}
        height={540}
     		plugins={[  dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        defaultView="dayGridMonth"                        
        header={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth'
            }}
     		events= { data }                                           
        dateClick={ register }
        eventClick={ registers }                   
  />
  </div>
   <Modal 
   modalClassName="modal-task"
   isOpen={modalView}
   toggle={ toogleModalView } 
   > 
   <FormTdc
    fecha={fecha}
    toogleModalView={toogleModalView}
   />          
   </Modal>
   </>
)
}


export default Calendar