import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Periferico } from 'src/perifericos/schemas/periferico.schema';
import mongoose from 'mongoose';

export type ComputadorDocument = HydratedDocument<Computador>;

@Schema({ timestamps: true })
export class Computador {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  cor: string;

  @Prop({ required: true })
  dataFabricacao: number;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Periferico' }],
    default: [],
  })
  perifericos: Periferico[] | string[];
}

export const ComputadorSchema = SchemaFactory.createForClass(Computador);
