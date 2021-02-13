import { CreateInvDto } from "./dto/create-inventario.dto";
import { Inventario } from "./interfaces/inventario";
import { InventarioService } from './inventario.service';
export declare class InventarioController {
    private invserv;
    constructor(invserv: InventarioService);
    getInventarios(): Inventario[];
    getInventario(id: string): Inventario;
    createInventario(test: CreateInvDto): string;
    deleteInventario(id: string): string;
    updateInventario(test: CreateInvDto, id: string): string;
}
