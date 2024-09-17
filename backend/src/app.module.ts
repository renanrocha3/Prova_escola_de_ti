import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComputadoresModule } from './computadores/computadores.module';
import { PerifericosModule } from './perifericos/perifericos.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    ComputadoresModule,
    PerifericosModule,
  ],
})
export class AppModule {}
