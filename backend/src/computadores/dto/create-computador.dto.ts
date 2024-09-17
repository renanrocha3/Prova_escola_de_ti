import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateComputadorDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  cor: string;

  @IsInt()
  dataFabricacao: number;

  perifericos: string[]
}
