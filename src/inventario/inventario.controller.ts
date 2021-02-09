import { Controller, Get , Put, Post, Delete, Body, Param} from '@nestjs/common';

import {CreateInvDto} from "./dto/create-inventario.dto";

@Controller('inventario')
export class InventarioController {

    @Get()
    getInventario(): {hello: string, hola: string} {
        return {
            "hello" : "world",
            "hola": "mundo"
        };
    }
    
    @Post()
    createInventario(@Body() test: CreateInvDto): string{
        console.log(test)
        return 'Creando inventario';
    }

    @Delete(':id')
    deleteInventario(@Param('id') id: number ): string{
        console.log(id);
        return 'Borrando registro inventario: ' + id;
    }

    @Put(':id')
    updateInventario(@Body() test: CreateInvDto, @Param('id') id: number): string{
        console.log(test);
        console.log(id);
        return 'Alterando inventario';
    }
}