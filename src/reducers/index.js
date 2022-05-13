import { combineReducers } from "redux";
import { reducer as toastrReducer } from 'react-redux-toastr';
import { usuarios } from "./usuarios.reducers";
import { articulos } from "./articulos.reducers";
import { categorias } from "./categorias.reducers";
import { marcas } from "./marcas.reducers";
import { proveedores } from "./proveedores.reducers";
import { compras } from "./compras.reducers";
import { clientes } from "./clientes.reducers";
import { ventas } from "./ventas.reducers";
import { empresa } from "./empresa.reducers";
import { informes } from "./informes.reducers";
import { cajasitems } from "./cajasitems.reducers";
import { cajas } from "./cajas.reducers";
import { almacenes } from "./almacenes.reducers";
import { tareas } from "./tareas.reducers";
import { cobros } from "./cobros.reducers";
import { pagos } from "./pagos.reducers";
import { pucs } from "./pucs.reducers";
import { comprobantes } from "./comprobantes.reducers";
import { contables } from "./contables.reducers";
import { procesos } from "./procesos.reducers";
import { tdcs } from "./tdcs.reducers";
import { users } from "./users.reducers";
import { tickets } from "./tickets.reducers";
import { cotizaciones } from "./cotizaciones.reducers";
import { salarios } from "./salarios.reducers";
import { personas } from "./personas.reducers";
import { horarios } from "./horarios.reducers";
import { prospectos } from "./prospectos.reducers";
import { estudios } from "./estudios.reducers";
import { experiencias } from "./experiencias.reducers";
import { contratos } from "./contratos.reducers";
import { cargos } from "./cargos.reducers";
import { ventaitems } from "./ventaitems.reducers";
import { unidades } from "./unidades.reducers";
import { movimientos } from "./movimientos.reducers"

const rootReducer = combineReducers({
    usuarios,
    ventaitems,
    movimientos,
    unidades,
    cargos,
    contratos,
    experiencias,
    estudios,
    prospectos,    
    horarios,
    personas,
    cotizaciones,
    salarios,
    tickets,
    tdcs,
    users,
    informes,
    comprobantes,
    procesos,
    contables,
    pucs,
    pagos,
    articulos,
    tareas,
    almacenes,
    cajas,
    cajasitems,
    categorias,
    clientes,
    empresa,
    marcas,
    proveedores,
    ventas,
    compras,
    cobros,
    toastr: toastrReducer
});

export default rootReducer;