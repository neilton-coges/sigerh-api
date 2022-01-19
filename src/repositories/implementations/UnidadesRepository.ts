import {
  getRepository, ILike, Repository,
} from 'typeorm';

import { Unidade } from '../../entities/Unidade';
import { IPage } from '../models/IPage';
import {
  CreateUnidadeData, IUnidadesRepository, ListUnidadeData, PaginateUnidadeData,
} from '../models/IUnidadesRepository';

class UnidadesRepository implements IUnidadesRepository {
  private repository: Repository<Unidade>;

  constructor() {
    this.repository = getRepository(Unidade);
  }

  async create({ sigla, descricao, unidadePaiId }: CreateUnidadeData): Promise<Unidade> {
    const unidade = this.repository.create({
      sigla,
      descricao,
      unidadePaiId,
    });

    await this.repository.save(unidade);

    return unidade;
  }

  async update(unidade: Unidade): Promise<Unidade> {
    return this.repository.save(unidade);
  }

  async destroy(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async list({ sigla, descricao }: ListUnidadeData): Promise<Unidade[]> {
    const query = this.repository.createQueryBuilder();

    if (sigla) {
      query.andWhere({
        sigla: ILike(`%${sigla}%`),
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
    sigla, descricao, perPage, current,
  }: PaginateUnidadeData): Promise<IPage<Unidade>> {
    const skip = current * perPage - perPage;
    const take = perPage;

    const query = this.repository.createQueryBuilder();

    if (sigla) {
      query.andWhere({
        sigla: ILike(`%${sigla}%`),
      });
    }

    if (descricao) {
      query.andWhere({
        descricao: ILike(`%${descricao}%`),
      });
    }

    query.orderBy({
      sigla: 'ASC',
    });

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

  async findById(id: string): Promise<Unidade> {
    return this.repository.findOne(id);
  }

  async findByIdWithSubunidades(id: string): Promise<Unidade> {
    return this.repository.findOne(id, { relations: ['subUnidades'] });
  }
}

export { UnidadesRepository };
