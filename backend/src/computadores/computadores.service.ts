import { Injectable } from '@nestjs/common';
import { CreateComputadorDto } from './dto/create-computador.dto';
import { UpdateComputadorDto } from './dto/update-computador.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Computador } from './schemas/computador.schema';
import { Model } from 'mongoose';
import { PerifericosService } from 'src/perifericos/perifericos.service';
import { CreatePerifericoDto } from 'src/perifericos/dto/create-periferico.dto';

@Injectable()
export class ComputadoresService {
  constructor(
    @InjectModel(Computador.name) private computadorModel: Model<Computador>,
    private perifericosService: PerifericosService,
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

  async addPeriferico(
    computadorId: string,
    createPerifericoDto: CreatePerifericoDto,
  ) {
    const computador = await this.computadorModel.findById(computadorId).exec();
    if (!computador) {
      return { message: 'Computador não encontrado' };
    }

    const periferico =
      await this.perifericosService.create(createPerifericoDto);
    computador.perifericos.push(periferico.id);
    await computador.save();

    return computador.populate('perifericos');
  }

  async removePeriferico(computadorId: string, perifericoId: string) {
    const computador = await this.computadorModel.findById(computadorId).exec();
    if (!computador) {
      return { message: 'Computador não encontrado' };
    }

    await this.perifericosService.remove(perifericoId);

    const newComputer = await this.computadorModel.findByIdAndUpdate(
      computadorId,
      {
        $pull: { perifericos: perifericoId },
      },
      { new: true },
    );

    return newComputer.populate('perifericos');
  }
}
