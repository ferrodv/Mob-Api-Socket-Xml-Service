"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let InventarioService = class InventarioService {
    constructor() {
        this.inventarios = [
            {
                id: 1,
                cant: 3,
                producto: 2,
                valor: 2,
                registro: "01-01-2020",
                vencimiento: "02-04-2020",
                contratador: "fernando rodriguez",
                donante: 2,
                user: 1
            },
            {
                id: 2,
                cant: 3,
                producto: 2,
                valor: 2,
                registro: "01-01-2020",
                vencimiento: "02-04-2020",
                contratador: "fernando rodriguez",
                donante: 2,
                user: 1
            },
            {
                id: 3,
                cant: 3,
                producto: 2,
                valor: 2,
                registro: "01-01-2020",
                vencimiento: "02-04-2020",
                contratador: "fernando rodriguez",
                donante: 2,
                user: 1
            },
        ];
    }
    getAllInv() {
        return this.inventarios;
    }
    getSingleInv(id) {
        return this.inventarios.find(inventarios => inventarios.id === id);
    }
};
InventarioService = __decorate([
    common_1.Injectable()
], InventarioService);
exports.InventarioService = InventarioService;
//# sourceMappingURL=inventario.service.js.map