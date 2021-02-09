import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventarioController } from './inventario/inventario.controller';
import { InventarioService } from './inventario/inventario.service';
import { InventarioModule } from './inventario/inventario.module';

@Module({
  imports: [InventarioModule],
  controllers: [AppController, InventarioController],
  providers: [AppService, InventarioService],
})
export class AppModule {}
