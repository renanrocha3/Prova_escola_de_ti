import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComputadoresModule } from './computadores/computadores.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    ComputadoresModule,
  ],
})
export class AppModule {}
