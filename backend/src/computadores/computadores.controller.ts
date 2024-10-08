import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComputadoresService } from './computadores.service';
import { CreateComputadorDto } from './dto/create-computador.dto';
import { UpdateComputadorDto } from './dto/update-computador.dto';

@Controller('computadores')
export class ComputadoresController {
  constructor(private readonly computadoresService: ComputadoresService) {}

  @Post()
  create(@Body() createComputadoreDto: CreateComputadorDto) {
    return this.computadoresService.create(createComputadoreDto);
  }

  @Get()
  findAll() {
    return this.computadoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.computadoresService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComputadoreDto: UpdateComputadorDto,
  ) {
    return this.computadoresService.update(id, updateComputadoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.computadoresService.remove(id);
  }

}
