import {
  getRepository, ILike, Repository,
} from 'typeorm';

import { Cargo } from '../../entities/Cargo';
import {
  CreateCargoData, ICargosRepository, ListCargoData, PaginateCargoData,
} from '../models/ICargosRepository';
import { IPage } from '../models/IPage';

class CargosRepository implements ICargosRepository {
  private repository: Repository<Cargo>;

  constructor() {
    this.repository = getRepository(Cargo);
  }

  async create({ tipo, nome }: CreateCargoData): Promise<Cargo> {
    const cargo = this.repository.create({
      tipo,
      nome,
    });

    return this.repository.save(cargo);
  }

  async update(cargo: Cargo): Promise<Cargo> {
    return this.repository.save(cargo);
  }

  async destroy(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<Cargo> {
    return this.repository.findOne(id);
  }

  async findByNome(nome: string): Promise<Cargo> {
    return this.repository.findOne({
      nome: ILike(`%${nome}%`),
    });
  }

  async list({ tipo, nome }: ListCargoData): Promise<Cargo[]> {
    const query = this.repository.createQueryBuilder();

    if (tipo) {
      query.andWhere({
        tipo,
      });
    }

    if (nome) {
      query.andWhere({
        nome: ILike(`%${nome}%`),
      });
    }

    return query.getMany();
  }

  async paginate({
    tipo, nome, current, perPage,
  }: PaginateCargoData): Promise<IPage<Cargo>> {
    const skip = current * perPage - perPage;
    const take = perPage;

    const query = this.repository.createQueryBuilder();

    if (tipo) {
      query.andWhere({
        tipo,
      });
    }

    if (nome) {
      query.andWhere({
        nome: ILike(`%${nome}%`),
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

export { CargosRepository };
