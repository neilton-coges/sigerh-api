import { inject, injectable } from 'tsyringe';

import { Lotacao } from '../../entities/Lotacao';
import { AppError } from '../../error/AppError';
import { ILotacoesRepository, UpdateLotacaoData } from '../../repositories/models/ILotacoesRepository';

@injectable()
class UpdateServidorLotacaoService {
  constructor(
    @inject('LotacoesRepository')
    private lotacoesRepository: ILotacoesRepository,
  ) {}

  async execute({
    id, matricula, dataAdmissao, observacao, jornadaId, subUnidadeId,
  }: UpdateLotacaoData): Promise<Lotacao> {
    const lotacao = await this.lotacoesRepository.findById(id);

    if (!lotacao) {
      throw new AppError('Lotacão não encontrada.');
    }

    if (matricula) {
      const lotacaoWithExistingMatricula = await this.lotacoesRepository.findByMatricula(matricula);

      if (lotacaoWithExistingMatricula && lotacaoWithExistingMatricula.id !== id) {
        throw new AppError('Já existe uma lotação com esta matricula cadastrada.');
      }
    }

    lotacao.matricula = matricula;
    lotacao.dataAdmissao = dataAdmissao;
    lotacao.observacao = observacao;
    lotacao.jornadaId = jornadaId;
    lotacao.subUnidadeId = subUnidadeId;

    await this.lotacoesRepository.update(lotacao);

    return lotacao;
  }
}

export { UpdateServidorLotacaoService };
