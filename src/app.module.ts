import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ObjetoDto } from './objetoDto';
import { Objeto } from './objeto';

@Module({
  imports: [ObjetoDto, Objeto],
  controllers: [AppController, ],
  providers: [AppService, ],
})
export class AppModule {}
