import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ComputadorDocument = HydratedDocument<Computador>;

@Schema({ timestamps: true })
export class Computador {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  cor: string;

  @Prop({ required: true })
  dataFabricacao: number;

  @Prop({default: [],})
  perifericos: string[];
}

export const ComputadorSchema = SchemaFactory.createForClass(Computador);
