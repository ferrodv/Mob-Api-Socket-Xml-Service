import { Injectable } from '@nestjs/common';
import { ObjetoDto } from './objetoDto';
import { Objeto } from './objeto';
import { constants } from 'buffer';

@Injectable()
export class AppService {
  
  repositorio: Objeto[]

  getData(): Objeto[] {
    return this.repositorio;
  }
  
  getStruct(): string {
    return '{ "nombre" :"nombre", "fecha" : "fecha", "accion" : "accion" }';
  }

  getObjetoIndex(nombre: String): Number {
    //const index = this.repositorio.findIndex(objeto => objeto.nombre === nombre);
    return 2;
  }

  create(objDto : ObjetoDto): Objeto {
    const obj: Objeto = objDto.toObjeto();
    this.repositorio.push(obj);
    return obj
  }

  delete(nombre : String): Objeto {
    const index = this.getObjetoIndex(nombre);
    const obj:Objeto = this.repositorio[Number(index)];
    this.repositorio.splice(Number(index))
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
