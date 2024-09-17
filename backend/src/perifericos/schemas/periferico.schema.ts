import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PerifericoDocument = HydratedDocument<Periferico>;

@Schema({ timestamps: true })
export class Periferico {
  @Prop({ required: true })
  nome: string;
}

export const PerifericoSchema = SchemaFactory.createForClass(Periferico);
