import { Module } from '@nestjs/common';
import { PerifericosService } from './perifericos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Periferico, PerifericoSchema } from './schemas/periferico.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Periferico.name, schema: PerifericoSchema },
    ]),
  ],
  providers: [PerifericosService],
  exports: [PerifericosService],
})
export class PerifericosModule {}
