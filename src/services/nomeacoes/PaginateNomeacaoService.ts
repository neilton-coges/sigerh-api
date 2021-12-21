import { inject, injectable } from 'tsyringe';

import { Nomeacao } from '../../entities/Nomeacao';
import { INomeacoesRepository, PaginateNomeacaoData } from '../../repositories/models/INomeacoesRepository';
import { IPage } from '../../repositories/models/IPage';

@injectable()
class PaginateNomeacaoService {
  constructor(
    @inject('NomeacoesRepository')
    private nomeacoesRepository: INomeacoesRepository,
  ) {}

  async execute({
    tipo, nomeServidor, perPage = 15, current = 1,
  }: PaginateNomeacaoData): Promise<IPage<Nomeacao>> {
    const page = await this.nomeacoesRepository.paginate({
      tipo,
      nomeServidor,
      perPage,
      current,
    });

    return page;
  }
}

export { PaginateNomeacaoService };
