import { Between, getRepository, Repository } from 'typeorm';

import { IPage } from '../models/IPage';
import { Progressao } from '../../entities/Progressao';
import {
  CreateProgressaoData,
  IProgressoesRepository,
  ListProgressaoData,
  PaginateProgressaoData,
} from '../models/IProgressoesRepository';

class ProgressoesRepository implements IProgressoesRepository {
  private repository: Repository<Progressao>;

  constructor() {
    this.repository = getRepository(Progressao);
  }

  async create({
    servidorId,
    lotacaoId,
    cargoId,
    classeNivelCargoId,
    padraoClasseNivelCargoId,
    dataProgressao,
    processo,
    observacao,
  }: CreateProgressaoData): Promise<Progressao> {
    const progressao = this.repository.create({
      servidorId,
      lotacaoId,
      cargoId,
      classeNivelCargoId,
      padraoClasseNivelCargoId,
      dataProgressao,
      processo,
      observacao,
    });

    return this.repository.save(progressao);
  }

  async findById(id: string): Promise<Progressao> {
    return this.repository.findOne(id, {
      relations: ['servidor', 'cargo', 'classeNivelCargo', 'padraoClasseNivelCargo'],
    });
  }

  async findByServidorIdAndLotacaoId(servidorId: string, lotacaoId: string): Promise<Progressao[]> {
    return this.repository.find({
      servidorId,
      lotacaoId,
    });
  }

  async list({
    servidorId,
    dataProgressaoInicio,
    dataProgressaoFim,
  }: ListProgressaoData): Promise<Progressao[]> {
    const query = this.repository.createQueryBuilder();

    if (servidorId) {
      query.andWhere({
        servidorId,
      });
    }

    if (dataProgressaoInicio && dataProgressaoFim) {
      query.andWhere({
        dataProgressao: Between(dataProgressaoInicio, dataProgressaoFim),
      });
    }

    return query.getMany();
  }

  async paginate({
    servidorId, dataProgressaoInicio, dataProgressaoFim, current, perPage,
  }: PaginateProgressaoData): Promise<IPage<Progressao>> {
    const skip = current * perPage - perPage;
    const take = perPage;

    const query = this.repository.createQueryBuilder('progressoes');

    query.leftJoinAndSelect('progressoes.servidor', 'servidor');

    if (servidorId) {
      query.andWhere({
        servidorId,
      });
    }

    if (dataProgressaoInicio && dataProgressaoFim) {
      query.andWhere({
        dataProgressao: Between(dataProgressaoInicio, dataProgressaoFim),
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

export { ProgressoesRepository };
