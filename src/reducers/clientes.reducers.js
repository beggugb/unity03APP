const initialState = {
    data: [],
    pagina: 0,
    paginas: 0,
    total: 0,
    modalView: false,
    modalViews: false,
    indicador:0,
    items:[],
    montoTotal:0,
    saldoTotal:0,
    pagoTotal:0,
    item:{      
      id:'',
      nombres: '',
      direccion: '',
      tipo: 'personal',
      nit: '',
      nombreNit: '',
      estado: '',
      filename: 'default.jpg',
      telefono: '',
      codigo: '',
      pais: '',
      ciudad: '',
      latitude:0,
      longitude:0,      
      email: '',
      web: '',
      observaciones: '',
      codpostal: '',
      tipoInteres: '',
      filenameNit: 'default.jpg',
      filenameCi: 'default.jpg',
      grupo: '',
      personaContacto: '',
      cuentaBancario: '',
      createdAt: new Date()      
    }    
  };
  
export function clientes(state = initialState, action) {
    switch (action.type) { 
        case "CLIENTES_CHANGE_LOCATION":
          return {          
          ...state,
          item:
          {...state.item,
            latitude: action.latitude,
            longitude: action.longitude
          }
        };     
        case "CLIENTES_INDICADOR":
        return {
          ...state,
          indicador: action.value
        };
       case "CLIENTES_VIEW":
        return {
          ...state,
          modalView: action.view
        }; 
        case "CLIENTES_VIEWS":
        return {
          ...state,
          modalViews: action.view
        }; 
        case "CLIENTES_ITEM":
          return {
            ...state,
            item: action.response       
        };  
        case "CLIENTES_RESET_ITEM":
          return {
            ...state,
            item: initialState.item,
            indicador: 0
        };
        case "CLIENTES_SALDO":
          return {
            ...state,
            items: action.response.data,
            item: action.response.item,
            montoTotal:action.response.total,
            saldoTotal:action.response.saldo,
            pagoTotal:action.response.pagos
        }; 
        case "CLIENTES_RESET_SALDO":
          return {
            ...state,
            items: [],
            item: initialState.item,
            indicador: 0,
            montoTotal:0,
            saldoTotal:0,
            pagoTotal:0
        };
        case "CLIENTES_DATA":
          return {
            ...state,
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total
        }; 
        case "CLIENTES_CHANGE":
          return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };
      case "CLIENTES_ADD":
        return {
          ...state,
          item: action.response
        };       
     
      case "CLIENTES_RESET":
        return {
          ...state,
          item: initialState.item,
          data: [],
          pagina: 0,
          paginas: 0,
          total: 0,
          items:[],
          montoTotal:0,
          saldoTotal:0,
          pagoTotal:0,
        
        };  

      case "CLIENTES_RESET_DATA":
          return {
            ...state,            
            data: [],            
            pagina: 0,
            paginas: 0,
            total: 0,
            indicador:0,
           
          };  
        
      default:
        return state;
    }
  }
  