import { inject, injectable } from 'tsyringe';

import { addYears, isEqual } from 'date-fns';
import { TipoCargo } from '../../entities/Cargo';
import { Lotacao } from '../../entities/Lotacao';
import { AppError } from '../../error/AppError';
import { ILotacoesRepository, UpdateLotacaoData } from '../../repositories/models/ILotacoesRepository';
import { IServidoresRepository } from '../../repositories/models/IServidoresRepository';
import { IProgressoesRepository } from '../../repositories/models/IProgressoesRepository';

@injectable()
class UpdateServidorLotacaoService {
  constructor(
    @inject('LotacoesRepository')
    private lotacoesRepository: ILotacoesRepository,
    @inject('ServidoresRepository')
    private servidoresRepository: IServidoresRepository,
    @inject('ProgressoesRepository')
    private progressoesRepository: IProgressoesRepository,
  ) {}

  async execute({
    id,
    matricula,
    dataAdmissao,
    observacao,
    jornadaId,
    subUnidadeId,
    classeNivelCargoId,
    padraoClasseNivelCargoId,
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

    if (
      (
        (dataAdmissao && !isEqual(dataAdmissao, lotacao.dataAdmissao))
      || (classeNivelCargoId && classeNivelCargoId !== lotacao.classeNivelCargoId)
      || (padraoClasseNivelCargoId && padraoClasseNivelCargoId !== lotacao.padraoClasseNivelCargoId)
      )
      && lotacao.cargo.tipo === TipoCargo.EFETIVO
    ) {
      // TODO: validar se já existe progressões para o servidor, se existir não permitir atualização
      // TODO: atualizar a data da próxima progresão - 3 anos de estágio probatório

      const progressoes = await this.progressoesRepository.findByServidorIdAndLotacaoId(
        lotacao.servidorId,
        lotacao.id,
      );

      if (progressoes.length > 0) {
        throw new AppError('Não é possível atualizar a data de admissão e/ou classe e/ou padrão da lotação pois existem progressoes cadastradas para o servidor.');
      }

      const servidor = await this.servidoresRepository.findById(lotacao.servidorId);

      servidor.dataProximaProgressao = addYears(dataAdmissao, 3);

      await this.servidoresRepository.update(servidor);
    }

    lotacao.matricula = matricula;
    lotacao.dataAdmissao = dataAdmissao;
    lotacao.observacao = observacao;
    lotacao.jornadaId = jornadaId;
    lotacao.subUnidadeId = subUnidadeId;
    lotacao.classeNivelCargoId = classeNivelCargoId;
    lotacao.padraoClasseNivelCargoId = padraoClasseNivelCargoId;

    await this.lotacoesRepository.update(lotacao);

    return lotacao;
  }
}

export { UpdateServidorLotacaoService };
