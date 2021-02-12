import { Injectable } from '@nestjs/common';
import { ObjetoDto } from './objetoDto';
import { Objeto } from './objeto';
import { constants } from 'buffer';

@Injectable()
export class AppService {
  
  repositorio : Objeto[] = []

  getTime(): string{
    let log = new Date();
    return (log.getFullYear() + "/" + log.getMonth() + "/" + log.getDate() + " " + log.getHours() + ":" + log.getMinutes() + ":" + log.getSeconds());
  }

  getObjetoIndex(nombre: String): Number {
    const index = this.repositorio.findIndex(objeto => objeto.nombre === nombre);
    return index;
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
    const obj: ObjetoDto = new ObjetoDto(objDto);
    var comando: String;
    if (obj.accion == "COMMIT")
      comando = "replicar_commit"
    else if (obj.accion == "ABORT")
      comando = "replicar_abort"
    else
      comando = "replicar_commit"
    //const objeto = '{ "data" : { "objetos" : ' + JSON.stringify(this.repositorio) + ', "comando" : "' + comando + '"}}'
    var net = require('net');
    var client = net.connect({port: 3100},
        function() {
            console.log('--------Connected to Coordinador!');
            console.log("Enviando: " + comando);
            client.write(comando);
        });
    client.on('data', 
        function(data) {
            const answer = data.toString()
            console.log("Respondiendo: " + answer);
            if (answer == 'commit'){
              client.write(JSON.stringify(this.repositorio))
              comando = "COMMITED"
            }
            else if (answer == 'abort'){
              client.write("OK")
              comando = "ABORTED"
            }
            else if (answer == 'ERROR'){
              client.write("OK")
              comando = "ERROR"
            }
    });
    
    return comando
  }

  restaurarObetos(objDto : ObjetoDto){
    console.log("[" + this.getTime() + "] Restaurar request");
    const obj: ObjetoDto = new ObjetoDto(objDto);
    var comando: String;
    if (obj.accion == "COMMIT")
      comando = "restaurar_commit"
    else if (obj.accion == "ABORT")
      comando = "restaurar_abort"
    else
      comando = "restaurar_commit"
    
    var net = require('net');
    var client = net.connect({port: 3100},
          function() {
              console.log('--------Connected to Coordinador!');
              console.log("Enviando: " + comando);
              client.write(comando);
          });
    client.on('data', 
          function(data) {
              const answer = data.toString()
              console.log("Respondiendo: " + answer);
              if (answer == 'commit'){
                client.write(JSON.stringify(this.repositorio))
                comando = "COMMITED"
              }
              else if (answer == 'abort'){
                client.write("OK")
                comando = "ABORTED"
              }
              else if (answer == 'ERROR'){
                client.write("OK")
                comando = "ERROR"
              }
    });    
    return "Exitoso"
  }




}


