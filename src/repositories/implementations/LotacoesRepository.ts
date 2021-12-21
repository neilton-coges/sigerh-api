import { getRepository, Repository } from 'typeorm';

import { TipoCargo } from '../../entities/Cargo';
import { Lotacao } from '../../entities/Lotacao';
import { CreateLotacaoData, ILotacoesRepository } from '../models/ILotacoesRepository';

class LotacoesRepository implements ILotacoesRepository {
  private repository: Repository<Lotacao>;

  constructor() {
    this.repository = getRepository(Lotacao);
  }

  async create({
    servidorId,
    cargoId,
    cdsFgId,
    unidadeId,
  }: CreateLotacaoData): Promise<Lotacao> {
    const lotacao = this.repository.create({
      servidorId,
      cargoId,
      cdsFgId,
      unidadeId,
    });

    await this.repository.save(lotacao);

    return lotacao;
  }

  async update(lotacao: Lotacao): Promise<Lotacao> {
    return this.repository.save(lotacao);
  }

  async findById(id: string): Promise<Lotacao> {
    return this.repository.findOne(id);
  }

  async findByMatricula(matricula: string): Promise<Lotacao> {
    return this.repository.findOne({ matricula });
  }

  async findByServidorId(servidorId: string): Promise<Lotacao[]> {
    return this.repository.find({
      where: {
        servidorId,
      },
      relations: [
        'cargo',
        'cdsFg',
        'unidade',
        'subUnidade',
        'jornada',
      ],
    });
  }

  async findByServidorIdAndTipoCargo(servidorId: string, tipoCargo: TipoCargo): Promise<Lotacao> {
    return this.repository.findOne({
      where: {
        servidorId,
        cargo: {
          tipo: tipoCargo,
        },
      },
      relations: ['cargo'],
    });
  }
}

export { LotacoesRepository };
