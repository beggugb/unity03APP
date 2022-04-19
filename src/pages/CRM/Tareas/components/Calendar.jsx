import React, { useEffect } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../../actions'
import { getMes } from '../../../../helpers/funciones'

const Calendar = () => {  
  const dispatch = useDispatch()
  const {data}  = useSelector(state => state.tareas)   
  const user = JSON.parse(localStorage.getItem('@userUnity'))

  const makeHttpRequestWithPage = (xredux) =>{
    const {desde, hasta } = getMes()        
    let dato = {}
    dato.usuarioId = user.id
    dato.start = desde
    dato.end = hasta
    dato.inicio = desde
    dato.fin = hasta    
    dispatch(crudActions.SET_ADD_LOAD(xredux,'tareas',dato,'lista'))  
  }
  
  const handleView = it => {       
    let kko = {    
      id      : it.event.id,    
      title   : it.event.title,    
      start   : it.event.start,
      end     : it.event.start,
      detalle   : it.event.extendedProps.detalle,
      usuarioId : it.event.extendedProps.usuarioId,
      backgroundColor : it.event.backgroundColor    
    }     
    dispatch({type:'TAREAS_ITEM',response:kko})  
}

useEffect(() =>{            
  makeHttpRequestWithPage('TAREAS_DATA','tareas');          
  return () =>{            
    dispatch({type:'TAREAS_RESET'})
};
}, []);


return(
  <div className="registroCalendario">
  <h6 className="ml-1 mt-2" >Tareas</h6>  
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
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
     		events= { data }                                   
        eventClick={handleView}        
  />
  </div>
)
}


export default Calendar