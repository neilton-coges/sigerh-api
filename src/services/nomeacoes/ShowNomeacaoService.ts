import { inject, injectable } from 'tsyringe';

import { Nomeacao } from '../../entities/Nomeacao';
import { INomeacoesRepository } from '../../repositories/models/INomeacoesRepository';
import { AppError } from '../../error/AppError';

@injectable()
class ShowNomeacaoService {
  constructor(
    @inject('NomeacoesRepository')
    private nomeacoesRepository: INomeacoesRepository,
  ) {}

  async execute(id: string): Promise<Nomeacao> {
    const nomeacao = await this.nomeacoesRepository.findById(id);

    if (!nomeacao) {
      throw new AppError('Nomeação não encontrada.');
    }

    return nomeacao;
  }
}

export { ShowNomeacaoService };
