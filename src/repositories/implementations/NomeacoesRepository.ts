import { getRepository, ILike, Repository } from 'typeorm';

import { Nomeacao } from '../../entities/Nomeacao';
import { CreateNomeacaoData, INomeacoesRepository, PaginateNomeacaoData } from '../models/INomeacoesRepository';
import { IPage } from '../models/IPage';

class NomeacoesRepository implements INomeacoesRepository {
  private repository: Repository<Nomeacao>;

  constructor() {
    this.repository = getRepository(Nomeacao);
  }

  async create({
    tipo,
    cargoId,
    cdsFgId,
    unidadeId,
    servidorId,
    data,
    diofProcesso,
    observacao,
  }: CreateNomeacaoData): Promise<Nomeacao> {
    const nomeacao = this.repository.create({
      tipo,
      cargoId,
      cdsFgId,
      unidadeId,
      servidorId,
      data,
      diofProcesso,
      observacao,
    });

    return this.repository.save(nomeacao);
  }

  async paginate({
    tipo, nomeServidor, perPage, current,
  }: PaginateNomeacaoData): Promise<IPage<Nomeacao>> {
    const skip = current * perPage - perPage;
    const take = perPage;

    const query = this.repository.createQueryBuilder('nomeacoes');

    query.leftJoinAndSelect('nomeacoes.cargo', 'cargo');
    query.leftJoinAndSelect('nomeacoes.cdsFg', 'cdsFg');
    query.leftJoinAndSelect('nomeacoes.unidade', 'unidade');
    query.leftJoinAndSelect('nomeacoes.servidor', 'servidor');

    if (tipo) {
      query.andWhere({
        tipo,
      });
    }

    if (nomeServidor) {
      query
        .andWhere({
          servidor: {
            nome: ILike(`%${nomeServidor}%`),
          },
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

export { NomeacoesRepository };
