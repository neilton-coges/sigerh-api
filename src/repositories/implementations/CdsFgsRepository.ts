import { getRepository, Like, Repository } from 'typeorm';

import { CdsFg } from '../../entities/CdsFg';
import {
  CreateCdsFgData, ListCdsFgData, ICdsFgsRepository, PaginateCdsFgData,
} from '../models/ICdsFgsRepository';
import { IPage } from '../models/IPage';

class CdsFgsRepository implements ICdsFgsRepository {
  private repository: Repository<CdsFg>;

  constructor() {
    this.repository = getRepository(CdsFg);
  }

  async create({
    tipo, sigla, nome, valor, qtdVagas,
  }: CreateCdsFgData): Promise<CdsFg> {
    const cdsFg = this.repository.create({
      tipo,
      sigla,
      nome,
      valor,
      qtdVagas,
    });

    await this.repository.save(cdsFg);

    return cdsFg;
  }

  async update(cdsFg: CdsFg): Promise<CdsFg> {
    return this.repository.save(cdsFg);
  }

  async findById(id: string): Promise<CdsFg> {
    return this.repository.findOne(id);
  }

  async findBySigla(sigla: string): Promise<CdsFg> {
    return this.repository.findOne({ sigla });
  }

  async list({ tipo, sigla, nome }: ListCdsFgData): Promise<CdsFg[]> {
    const query = this.repository.createQueryBuilder();

    if (tipo) {
      query.andWhere({
        tipo,
      });
    }

    if (sigla) {
      query.andWhere({
        sigla,
      });
    }

    if (nome) {
      query.andWhere({
        nome: Like(`%${nome}%`),
      });
    }

    return query.getMany();
  }

  async paginate({
    tipo, sigla, nome, current, perPage,
  }: PaginateCdsFgData): Promise<IPage<CdsFg>> {
    const skip = current * perPage - perPage;
    const take = perPage;

    const query = this.repository.createQueryBuilder();

    if (tipo) {
      query.andWhere({
        tipo,
      });
    }

    if (sigla) {
      query.andWhere({
        sigla,
      });
    }

    if (nome) {
      query.andWhere({
        nome,
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

export { CdsFgsRepository };
