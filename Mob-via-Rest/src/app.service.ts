import { Injectable } from '@nestjs/common';
import { ObjetoDto } from './objetoDto';
import { Objeto } from './objeto';
import { constants } from 'buffer';

@Injectable()
export class AppService {
  
  repositorio : Objeto[] = [{nombre: "pelota", fecha: "2021/06/04 12:23:12", accion: ""}]

  getTime(): string{
    let log = new Date();
    return (log.getFullYear() + "/" + log.getMonth() + "/" + log.getDate() + " " + log.getHours() + ":" + log.getMinutes() + ":" + log.getSeconds());
  }

  wellcome(): string[] {

    console.log("[" + this.getTime() + "] Wellcome request");
    return JSON.parse('{ "get_1" : "/api/consultar/data", "get_2" : "/api/consultar/estructura", "post" : "/api/crear", "delete" : "/api/eliminar/:nombre", "put_1" : "/api/accion/replicar", "put_2" : "/api/accion/restaurar"  }');
  }

  getData(): Objeto[] {
    console.log("[" + this.getTime() + "] Consulta Data request");
    return this.repositorio;
  }
  
  getStruct(): string {
    console.log("[" + this.getTime() + "] Consulta Estructura request");
    return  JSON.parse('{ "atributo_1" :"nombre", "atributo_2" : "fecha", "atributo_3" : "accion" }');
  }

  getObjetoIndex(nombre: String): Number {
    const index = this.repositorio.findIndex(objeto => objeto.nombre === nombre);
    return index;
  }

  create(objDto : ObjetoDto): Objeto {
    console.log("[" + this.getTime() + "] Create request");
    const obj: ObjetoDto = new ObjetoDto(objDto);
    this.repositorio.push(obj.toObjeto());
    return obj
  }

  delete(nombre : String): Objeto {
    console.log("[" + this.getTime() + "] Delete request");
    const index = this.getObjetoIndex(nombre);
    const obj:Objeto = this.repositorio[Number(index)];
    if (index >= 0)
      this.repositorio.splice(Number(index), 1)
    return obj
  }

  replicarObjetos(objDto : ObjetoDto): String{
    console.log("[" + this.getTime() + "] Replicar request");
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
    console.log("[" + this.getTime() + "] Restaurar request");
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
