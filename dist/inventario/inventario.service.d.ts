import { Inventario } from './interfaces/inventario';
export declare class InventarioService {
    inventarios: Inventario[];
    getAllInv(): Inventario[];
    getSingleInv(id: number): Inventario;
}
