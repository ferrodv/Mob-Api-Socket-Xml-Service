import { Objeto } from './objeto';

export class ObjetoDto {

    nombre: String;
	fecha: String;
	accion: String;

	constructor(json : any,){
		this.nombre = json.name;
		this.fecha = json.fecha;
		this.accion = json.accion;
	}

	public toObjeto() {
		var obj : Objeto = new Objeto();
		obj.nombre = this.nombre;
		obj.fecha = this.fecha;
		obj.accion = this.accion ;
		return obj;
	}
}