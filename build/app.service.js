"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    getData() {
        return this.repositorio;
    }
    getStruct() {
        return '{ "nombre" :"nombre", "fecha" : "fecha", "accion" : "accion" }';
    }
    getObjetoIndex(nombre) {
        //const index = this.repositorio.findIndex(objeto => objeto.nombre === nombre);
        return 2;
    }
    create(objDto) {
        const obj = objDto.toObjeto();
        this.repositorio.push(obj);
        return obj;
    }
    delete(nombre) {
        const index = this.getObjetoIndex(nombre);
        const obj = this.repositorio[Number(index)];
        this.repositorio.splice(Number(index));
        return obj;
    }
    replicarObjetos(objDto) {
        var msj;
        if (objDto.accion == "COMMIT")
            msj = "replicar_commit";
        else if (objDto.accion == "ABORT")
            msj = "replicar_abort";
        else
            msj = "replicar";
        return "Exitoso";
    }
    restaurarObetos(objDto) {
        var msj;
        if (objDto.accion == "COMMIT")
            msj = "restaurar_commit";
        else if (objDto.accion == "ABORT")
            msj = "restaurar_abort";
        else
            msj = "restaurar";
        return "Exitoso";
    }
};
AppService = __decorate([
    common_1.Injectable()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map