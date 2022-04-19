const initialState = {
    data: [],
    pagina: 0,
    paginas: 0,
    total: 0,
    modalView: false,
    indicador:0,
    item:{      
      nro:'',
      fechaInicio : new Date(),
      fechaFin: new Date(),
      plazo:'Fijo',
      contratado:false,
      observaciones:'',
      person:'',
      personaId:0,
      horarioId:0,
      salarioId:0,      
      cargoId:0,
      salario:{        
        id:0,
        nombre:""
      },
      horario:{
        id:0,
        nombre:""
      },
      cargo:{
        id:0,
        nombre:""
      },
      persona:{
        id:0,
        nombres:"",
        ci:"",
        paterno:"",
        materno:""
      }
    }    
  };
  
export function contratos(state = initialState, action) {
    switch (action.type) {      
        case "CONTRATOS_INDICADOR":
        return {
          ...state,
          indicador: action.value
        };
       case "CONTRATOS_VIEW":
        return {
          ...state,
          modalView: action.view
        }; 
        case "CONTRATOS_ITEM":
          return {
            ...state,
            item: action.response
        };  
        case "CONTRATOS_DATA":
          return {
            ...state,
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total
        }; 
        case "CONTRATOS_CHANGE":
          return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };
      case "CONTRATOS_ADD":
        return {
          ...state,
          item: action.response
        };       
      case "CONTRATOS_RESET_ITEM":
        return {
          ...state,
          item: initialState.item,
          indicador: 0
        };
      case "CONTRATOS_RESET":
        return {
          ...state,
          item: initialState.item,
          data: [],
          pagina: 0,
          paginas: 0,
          total: 0
        };  

      case "CONTRATOS_RESET_DATA":
          return {
            ...state,            
            data: [],            
            pagina: 0,
            paginas: 0,
            total: 0,
            indicador:0
          };  
        
      default:
        return state;
    }
  }
  