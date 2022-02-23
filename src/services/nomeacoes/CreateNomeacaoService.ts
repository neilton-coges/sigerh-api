import { inject, injectable } from 'tsyringe';

import { TipoCargo } from '../../entities/Cargo';
import { Nomeacao } from '../../entities/Nomeacao';
import { AppError } from '../../error/AppError';
import { ICargosRepository } from '../../repositories/models/ICargosRepository';
import { ILotacoesRepository } from '../../repositories/models/ILotacoesRepository';
import { ICdsFgsRepository } from '../../repositories/models/ICdsFgsRepository';
import { CreateNomeacaoData, INomeacoesRepository } from '../../repositories/models/INomeacoesRepository';

@injectable()
class CreateNomeacaoService {
  constructor(
    @inject('NomeacoesRepository')
    private nomeacoesRepository: INomeacoesRepository,
    @inject('LotacoesRepository')
    private lotacoesRepository: ILotacoesRepository,
    @inject('CargosRepository')
    private cargosRepository: ICargosRepository,
    @inject('CdsFgsRepository')
    private cdsFgsRepository: ICdsFgsRepository,
  ) {}

  async execute({
    tipo, cargoId, cdsFgId, unidadeId, servidorId, data, diofProcesso, observacao,
  }: CreateNomeacaoData): Promise<Nomeacao> {
    const cargo = await this.cargosRepository.findById(cargoId);

    // Verifica se servidor já possui outro cargo efetivo
    if (cargo.tipo === TipoCargo.EFETIVO) {
      const lotacaoWithCargoEfetivoExits = await this.lotacoesRepository
        .findByServidorIdAndTipoCargo(
          servidorId,
          TipoCargo.EFETIVO,
        );

      if (lotacaoWithCargoEfetivoExits) {
        throw new AppError('Este servidor já possui uma lotação com cargo efetivo.');
      }
    }

    // Verifica se servidor já possui outro cargo em comissão
    if (cargo.tipo === TipoCargo.COMISSAO) {
      const lotacaoWithCargoComissaoExits = await this.lotacoesRepository
        .findByServidorIdAndTipoCargo(
          servidorId,
          TipoCargo.COMISSAO,
        );

      if (lotacaoWithCargoComissaoExits) {
        throw new AppError('Este servidor já possui uma lotação com cargo comissão.');
      }
    }

    // Verifica se servidor já possui outra função gratificada
    if (cargo.tipo === TipoCargo.FUNCAO_GRATIFICADA) {
      const lotacaoWithCargoFgExits = await this.lotacoesRepository
        .findByServidorIdAndTipoCargo(
          servidorId,
          TipoCargo.FUNCAO_GRATIFICADA,
        );

      if (lotacaoWithCargoFgExits) {
        throw new AppError('Este servidor já possui uma lotação com cargo função gratificada.');
      }
    }

    // Verifica se possui vagas para o CDS ou FG informado
    if (cdsFgId) {
      const cdsFg = await this.cdsFgsRepository.findById(cdsFgId);

      const quantidadeVagasDisponiveis = cdsFg.quantidadeVagas - cdsFg.quantidadeNomeados;

      if (quantidadeVagasDisponiveis < 1) {
        throw new AppError('CDS/FG sem vagas disponíveis.');
      }
    }

    const nomeacao = await this.nomeacoesRepository.create({
      tipo,
      cargoId,
      cdsFgId,
      unidadeId,
      servidorId,
      data,
      diofProcesso,
      observacao,
    });

    await this.lotacoesRepository.create({
      cargoId,
      cdsFgId,
      servidorId,
      unidadeId,
    });

    // Decrementa número de vagas e incrementa número de nomeados do CDS/FG
    if (cdsFgId) {
      const cdsFg = await this.cdsFgsRepository.findById(cdsFgId);

      cdsFg.quantidadeNomeados += 1;

      await this.cdsFgsRepository.update(cdsFg);
    }

    return nomeacao;
  }
}

export { CreateNomeacaoService };
