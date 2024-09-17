import { Injectable } from '@nestjs/common';
import { CreatePerifericoDto } from './dto/create-periferico.dto';
import { UpdatePerifericoDto } from './dto/update-periferico.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Periferico } from './schemas/periferico.schema';
import { Model } from 'mongoose';

@Injectable()
export class PerifericosService {
  constructor(
    @InjectModel(Periferico.name) private perifericoModel: Model<Periferico>,
  ) {}
  async create(createPerifericoDto: CreatePerifericoDto) {
    const periferico = await this.perifericoModel.create(createPerifericoDto);
    return periferico.save();
  }

  async findAll() {
    const perifericos = await this.perifericoModel.find().exec();
    return perifericos;
  }

  async findOne(id: string) {
    const periferico = await this.perifericoModel.findById(id).exec();
    if (!periferico) {
      return { message: 'Periferico não encontrado' };
    }

    return periferico;
  }

  async update(id: string, updatePerifericoDto: UpdatePerifericoDto) {
    const periferico = await this.perifericoModel.findById(id);
    if (!periferico) {
      return { message: 'Periferico não encontrado' };
    }

    const updatedPeriferico = await this.perifericoModel.findByIdAndUpdate(
      id,
      updatePerifericoDto,
      { new: true },
    );

    return updatedPeriferico;
  }

  async remove(id: string) {
    const periferico = await this.perifericoModel.findById(id).exec();
    if (!periferico) {
      return { message: 'Periferico não encontrado' };
    }

    await this.perifericoModel.findByIdAndDelete(id).exec();

    return { message: 'Periferico removido com sucesso' };
  }
}
