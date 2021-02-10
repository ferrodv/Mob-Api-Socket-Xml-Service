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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const objetoDto_1 = require("./objetoDto");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.appService.getData();
            if (data != null)
                return res.status(common_1.HttpStatus.OK).json({ data: data });
            else
                return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: "No existen objetos creados" });
        });
    }
    getStruct(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const struct = this.appService.getData();
            return res.status(common_1.HttpStatus.OK).json({ data: struct });
        });
    }
    create(res, objetoDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = this.appService.create(objetoDto);
            if (obj != null)
                return res.status(common_1.HttpStatus.OK).json({ message: "Registro exitoso", data: obj });
            else
                return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: "Fallo de registro" });
        });
    }
    delete(nombre, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = this.appService.delete(String(nombre));
            if (obj != null)
                return res.status(common_1.HttpStatus.OK).json({ message: "data eliminada exitosamente", data: obj });
            else
                return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: "Registro no existente" });
        });
    }
    replicate(res, objetoDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = this.appService.replicarObjetos(objetoDto);
            if (status != null)
                return res.status(common_1.HttpStatus.OK).json({ message: "Registro exitoso", data: status });
            else
                return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: "Fallo de registro" });
        });
    }
    restruct(res, objetoDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = this.appService.restaurarObetos(objetoDto);
            if (status != null)
                return res.status(common_1.HttpStatus.OK).json({ message: "Registro exitoso", data: status });
            else
                return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: "Fallo de registro" });
        });
    }
};
__decorate([
    common_1.Get("/consultar/data"),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getData", null);
__decorate([
    common_1.Get("/consultar/estructura"),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getStruct", null);
__decorate([
    common_1.Post("/crear"),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, objetoDto_1.ObjetoDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "create", null);
__decorate([
    common_1.Delete("/eliminar/:nombre"),
    __param(0, common_1.Param('nombre')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "delete", null);
__decorate([
    common_1.Put("/accion/replicar"),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, objetoDto_1.ObjetoDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "replicate", null);
__decorate([
    common_1.Put("/accion/restaurar"),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, objetoDto_1.ObjetoDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "restruct", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map