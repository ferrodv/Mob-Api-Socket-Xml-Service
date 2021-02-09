import { Controller, Get , Put, Post, Delete, Body, Param} from '@nestjs/common';

import {CreateInvDto} from "./dto/create-inventario.dto";

import { Inventario } from "./interfaces/inventario";
import {InventarioService} from './inventario.service'

@Controller('inventario')
export class InventarioController {

    constructor(private invserv: InventarioService) {}

    @Get()
    getInventarios(): Inventario[] {
        return this.invserv.getAllInv();
        //return {"hello" : "world","hola": "mundo"};
    }
    
    @Get(':id')
    getInventario(@Param('id') id: string) {
        return this.invserv.getSingleInv(parseInt(id));
    }

    @Post()
    createInventario(@Body() test: CreateInvDto): string{
        console.log(test)
        return 'Creando inventario';
    }

    @Delete(':id')
    deleteInventario(@Param('id') id: string ): string{
        console.log(id);
        return 'Borrando registro inventario: ' + id;
    }

    @Put(':id')
    updateInventario(@Body() test: CreateInvDto, @Param('id') id: string): string{
        console.log(test);
        console.log(id);
        return 'Alterando inventario';
    }
}