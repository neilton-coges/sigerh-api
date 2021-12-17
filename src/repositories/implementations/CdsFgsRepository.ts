import {
  getRepository, ILike, Repository,
} from 'typeorm';

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
    tipo, simbologia, remuneracao, quantidadeVagas,
  }: CreateCdsFgData): Promise<CdsFg> {
    const cdsFg = this.repository.create({
      tipo,
      simbologia,
      remuneracao,
      quantidadeVagas,
    });

    await this.repository.save(cdsFg);

    return cdsFg;
  }

  async update(cdsFg: CdsFg): Promise<CdsFg> {
    return this.repository.save(cdsFg);
  }

  async destroy(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<CdsFg> {
    return this.repository.findOne(id);
  }

  async findBySimbologia(simbologia: string): Promise<CdsFg> {
    return this.repository.findOne({ simbologia });
  }

  async list({ tipo, simbologia }: ListCdsFgData): Promise<CdsFg[]> {
    const query = this.repository.createQueryBuilder();

    if (tipo) {
      query.andWhere({
        tipo,
      });
    }

    if (simbologia) {
      query.andWhere({
        simbologia,
      });
    }

    return query.getMany();
  }

  async paginate({
    tipo, simbologia, current, perPage,
  }: PaginateCdsFgData): Promise<IPage<CdsFg>> {
    const skip = current * perPage - perPage;
    const take = perPage;

    const query = this.repository.createQueryBuilder();

    if (tipo) {
      query.andWhere({
        tipo,
      });
    }

    if (simbologia) {
      query.andWhere({
        simbologia: ILike(`%${simbologia}%`),
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
