"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objeto_1 = require("./objeto");
class ObjetoDto {
    constructor(json) {
        this.nombre = json.name;
        this.fecha = json.fecha;
        this.accion = json.accion;
    }
    toObjeto() {
        var obj = new objeto_1.Objeto();
        obj.nombre = this.nombre;
        obj.fecha = this.fecha;
        obj.accion = this.accion;
        return obj;
    }
}
exports.ObjetoDto = ObjetoDto;
//# sourceMappingURL=objetoDto.js.map