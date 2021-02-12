import { Controller, Get, Put, Delete, Post, Param, Res, HttpStatus, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { ObjetoDto } from './objetoDto';
import { Objeto } from './objeto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async wellcome(@Res() res) {
    const rutas = this.appService.wellcome();
    return res.status(HttpStatus.OK).json({rutas})
  }

  @Get("/consultar/data")
  async getData(@Res() res) {
    const data = this.appService.getData();
    if (data != null)
        return res.status(HttpStatus.OK).json({data: data})
    else 
        return res.status(HttpStatus.NOT_FOUND).json({message: "No existen objetos creados"})
}

  @Get("/consultar/estructura")
  async getStruct(@Res() res) {
    const struct = this.appService.getStruct();
    return res.status(HttpStatus.OK).json({struct})
  }

  @Post("/crear")
  async create(@Res() res, @Body() objetoDto : ObjetoDto) {
    const obj = this.appService.create(objetoDto)
    if (obj != null)
        return res.status(HttpStatus.OK).json({message: "Registro exitoso", data: obj})
    else 
        return res.status(HttpStatus.NOT_FOUND).json({message: "Fallo de registro"})   
}

  @Delete("/eliminar/:nombre")
  async delete(@Param('nombre') nombre : string, @Res() res) {
    const obj = this.appService.delete(String(nombre).toLowerCase())
    if (obj != null)
    return res.status(HttpStatus.OK).json({message: "data eliminada exitosamente", data: obj})
else 
    return res.status(HttpStatus.NOT_FOUND).json({message: "Registro no existente"})
}

  @Put("/accion/replicar")
  async replicate(@Res() res, @Body() objetoDto : ObjetoDto) {
    const status = this.appService.replicarObjetos(objetoDto)
    if (status != null)
        return res.status(HttpStatus.OK).json({message: "Registro exitoso", data: status})
    else 
        return res.status(HttpStatus.NOT_FOUND).json({message: "Fallo de registro"})   
}

  @Put("/accion/restaurar")
  async restruct(@Res() res, @Body() objetoDto : ObjetoDto) {
    const status = this.appService.restaurarObetos(objetoDto)
    if (status != null)
        return res.status(HttpStatus.OK).json({message: "Registro exitoso", data: status})
    else 
        return res.status(HttpStatus.NOT_FOUND).json({message: "Fallo de registro"})   
  }
} 
