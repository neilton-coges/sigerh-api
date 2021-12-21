import { inject, injectable } from 'tsyringe';

import { Lotacao } from '../../entities/Lotacao';
import { ILotacoesRepository } from '../../repositories/models/ILotacoesRepository';

@injectable()
class ListServidorLotacaoService {
  constructor(
    @inject('LotacoesRepository')
    private lotacoesRepository: ILotacoesRepository,
  ) {}

  async execute(servidorId: string): Promise<Lotacao[]> {
    console.log(servidorId);

    const lotacoes = await this.lotacoesRepository.findByServidorId(servidorId);

    return lotacoes;
  }
}

export { ListServidorLotacaoService };
