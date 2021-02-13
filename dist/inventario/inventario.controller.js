"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const create_inventario_dto_1 = require("./dto/create-inventario.dto");
const inventario_service_1 = require("./inventario.service");
let InventarioController = class InventarioController {
    constructor(invserv) {
        this.invserv = invserv;
    }
    getInventarios() {
        return this.invserv.getAllInv();
    }
    getInventario(id) {
        return this.invserv.getSingleInv(parseInt(id));
    }
    createInventario(test) {
        console.log(test);
        return 'Creando inventario';
    }
    deleteInventario(id) {
        console.log(id);
        return 'Borrando registro inventario: ' + id;
    }
    updateInventario(test, id) {
        console.log(test);
        console.log(id);
        return 'Alterando inventario';
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], InventarioController.prototype, "getInventarios", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InventarioController.prototype, "getInventario", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_inventario_dto_1.CreateInvDto]),
    __metadata("design:returntype", String)
], InventarioController.prototype, "createInventario", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], InventarioController.prototype, "deleteInventario", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Body()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_inventario_dto_1.CreateInvDto, String]),
    __metadata("design:returntype", String)
], InventarioController.prototype, "updateInventario", null);
InventarioController = __decorate([
    common_1.Controller('inventario'),
    __metadata("design:paramtypes", [inventario_service_1.InventarioService])
], InventarioController);
exports.InventarioController = InventarioController;
//# sourceMappingURL=inventario.controller.js.map