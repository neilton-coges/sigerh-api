import { getRepository, ILike, Repository } from 'typeorm';

import { NivelCargo } from '../../entities/NivelCargo';
import {
  CreateNivelCargoData, INiveisCargosRepository, ListNivelCargoData, PaginateNivelCargoData,
} from '../models/INiveisCargosRepository';
import { IPage } from '../models/IPage';

class NiveisCargosRepository implements INiveisCargosRepository {
  private repository: Repository<NivelCargo>;

  constructor() {
    this.repository = getRepository(NivelCargo);
  }

  async create({ codigo, descricao }: CreateNivelCargoData): Promise<NivelCargo> {
    const nivelCargo = this.repository.create({
      codigo,
      descricao,
    });

    return this.repository.save(nivelCargo);
  }

  async update(nivelCargo: NivelCargo): Promise<NivelCargo> {
    return this.repository.save(nivelCargo);
  }

  async destroy(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<NivelCargo> {
    return this.repository.findOne(id);
  }

  async findByCodigo(codigo: string): Promise<NivelCargo> {
    return this.repository.findOne({ codigo });
  }

  async list({ codigo, descricao }: ListNivelCargoData): Promise<NivelCargo[]> {
    const query = this.repository.createQueryBuilder();

    if (codigo) {
      query.andWhere({
        codigo: ILike(`%${codigo}%`),
      });
    }

    if (descricao) {
      query.andWhere({
        descricao: ILike(`%${descricao}%`),
      });
    }

    return query.getMany();
  }

  async paginate({
    codigo, descricao, current, perPage,
  }: PaginateNivelCargoData): Promise<IPage<NivelCargo>> {
    const skip = current * perPage - perPage;
    const take = perPage;

    const query = this.repository.createQueryBuilder();

    if (codigo) {
      query.andWhere({
        codigo: ILike(`%${codigo}%`),
      });
    }

    if (descricao) {
      query.andWhere({
        descricao: ILike(`%${descricao}%`),
      });
    }

    const size = await query.getCount();
    const total = Math.ceil(size / perPage);

    query.take(take);
    query.skip(skip);

    const data = await query.getMany();

    return {
      data,
      perPage,
      current,
      size,
      total,
    };
  }
}

export { NiveisCargosRepository };
