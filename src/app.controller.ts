import { Controller, Get, Put, Delete, Post, Param, Res, HttpStatus, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getInv(@Res() res) {
    return res.status(HttpStatus.OK).json({data: "Todo OK"})
}

  @Get("/Hello_word")
  getHello(): string {
    return this.appService.getHello();
  }
}
