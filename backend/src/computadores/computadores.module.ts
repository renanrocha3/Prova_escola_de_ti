import { Module } from '@nestjs/common';
import { ComputadoresService } from './computadores.service';
import { ComputadoresController } from './computadores.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ComputadorSchema, Computador } from './schemas/computador.schema';
import { PerifericosModule } from 'src/perifericos/perifericos.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Computador.name, schema: ComputadorSchema },
    ]),
    PerifericosModule,
  ],
  controllers: [ComputadoresController],
  providers: [ComputadoresService],
})
export class ComputadoresModule {}
