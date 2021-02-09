import { Injectable } from '@nestjs/common';
import { Inventario } from './interfaces/inventario';

@Injectable()
export class InventarioService {

    inventarios: Inventario[]  = [
        {
            id : 1,
            cant : 3,
            producto : 2,
            valor : 2,
            registro : "01-01-2020",
            vencimiento : "02-04-2020",
            contratador : "fernando rodriguez",
            donante : 2,
            user : 1
        },
        {
            id : 2,
            cant : 3,
            producto : 2,
            valor : 2,
            registro : "01-01-2020",
            vencimiento : "02-04-2020",
            contratador : "fernando rodriguez",
            donante : 2,
            user : 1
        },
        {
            id : 3,
            cant : 3,
            producto : 2,
            valor : 2,
            registro : "01-01-2020",
            vencimiento : "02-04-2020",
            contratador : "fernando rodriguez",
            donante : 2,
            user : 1
        },
    ];

    getAllInv(): Inventario[] {
        return this.inventarios;
    }

    getSingleInv(id : number): Inventario {
        return this.inventarios.find(inventarios => inventarios.id === id);
    }
}
