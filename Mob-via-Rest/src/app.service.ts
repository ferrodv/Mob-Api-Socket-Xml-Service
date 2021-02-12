import { Injectable } from '@nestjs/common';
import { ObjetoDto } from './objetoDto';
import { Objeto } from './objeto';
import { constants } from 'buffer';

@Injectable()
export class AppService {
  
  repositorio : Objeto[] = [];

  wellcome(): string[] {
    return JSON.parse('{ "get_1" : "/api/consultar/data", "get_2" : "/api/consultar/estructura", "post" : "/api/crear", "delete" : "/api/eliminar/:nombre", "put_1" : "/api/accion/replicar", "put_2" : "/api/accion/restaurar"  }');
  }

  getData(): Objeto[] {
    return this.repositorio;
  }
  
  getStruct(): string {
    return  JSON.parse('{ "atributo_1" :"nombre", "atributo_2" : "fecha", "atributo_3" : "accion" }');
  }

  getObjetoIndex(nombre: String): Number {
    const index = this.repositorio.findIndex(objeto => objeto.nombre === nombre);
    return index;
  }

  create(objDto : ObjetoDto): Objeto {
    const obj: ObjetoDto = new ObjetoDto(objDto);
    this.repositorio.push(obj.toObjeto());
    return obj
  }

  delete(nombre : String): Objeto {
    const index = this.getObjetoIndex(nombre);
    const obj:Objeto = this.repositorio[Number(index)];
    if (index >= 0)
      this.repositorio.splice(Number(index), 1)
    return obj
  }

  replicarObjetos(objDto : ObjetoDto): String{
    var msj: String;
    if (objDto.accion == "COMMIT")
      msj = "replicar_commit"
    else if (objDto.accion == "ABORT")
      msj = "replicar_abort"
    else
      msj = "replicar"

    return "Exitoso"
  }

  restaurarObetos(objDto : ObjetoDto){
    var msj: String;
    if (objDto.accion == "COMMIT")
      msj = "restaurar_commit"
    else if (objDto.accion == "ABORT")
      msj = "restaurar_abort"
    else
      msj = "restaurar"

    return "Exitoso"
  }




}
