import { Injectable } from '@nestjs/common';
import { CreateComputadorDto } from './dto/create-computador.dto';
import { UpdateComputadorDto } from './dto/update-computador.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Computador } from './schemas/computador.schema';
import { Model } from 'mongoose';


@Injectable()
export class ComputadoresService {
  constructor(
    @InjectModel(Computador.name) private computadorModel: Model<Computador>,
  ) {}

  async create(createComputadorDto: CreateComputadorDto) {
    const newComputer = await this.computadorModel.create(createComputadorDto);
    return newComputer.save();
  }

  async findAll() {
    const computadores = await this.computadorModel
      .find()
      .populate('perifericos')
      .exec();
    return computadores;
  }

  async findOne(id: string) {
    const computador = await this.computadorModel.findById(id).exec();
    if (!computador) {
      return { message: 'Computador não encontrado' };
    }

    return computador;
  }

  async update(id: string, updateComputadorDto: UpdateComputadorDto) {
    const computador = await this.computadorModel.findById(id).exec();
    if (!computador) {
      return { message: 'Computador não encontrado' };
    }

    const updatedComputador = await this.computadorModel.findByIdAndUpdate(
      id,
      updateComputadorDto,
      { new: true },
    );

    return updatedComputador;
  }

  async remove(id: string) {
    const computador = await this.findOne(id);
    if (!computador) {
      return { message: 'Computador não encontrado' };
    }

    await this.computadorModel.findByIdAndDelete(id).exec();
    return { message: 'Computador removido com sucesso' };
  }
}
