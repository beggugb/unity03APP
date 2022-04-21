const initialState = {
    data: [],
    item:{
      id:'',
      title:'',
      start:'',
      end:'',      
      monto:0,
      backgroundColor:'',
      selectable:false,
      usuarioId:0,
      detalle:''      
    },
    titem:0     
  };
  
  export function tdcs(state = initialState, action) {
    switch (action.type) {
      case "TDCS_ADD":
        return {
          ...state,
            data: action.response,
            item: initialState.item
        };
      case "TDCS_CHANGE":
        return {          
          ...state,
          item:
          {...state.item,
              [action.props]: action.value
          }
       };  
      case "TDCS_ITEM":
          return {
            ...state,
            item: action.response
          }; 
      case "TDCS_TITEM":
          return {
          ...state,
          titem: action.response.monto
      };     
      case "TDCS_DATA":
        return {
          ...state,
          data: action.response
        };          
      case "TDCS_RESET":
        return {
          ...state,
          data: [],
          item: initialState.item
        };
      case "TDCS_ITEM_RESET":
          return {
            ...state,            
            item: initialState.item
          };  
      default:
        return state;
    }
  }
  