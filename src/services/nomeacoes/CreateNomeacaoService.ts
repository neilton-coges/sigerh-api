import { inject, injectable } from 'tsyringe';

import { TipoCargo } from '../../entities/Cargo';
import { Nomeacao } from '../../entities/Nomeacao';
import { AppError } from '../../error/AppError';
import { ICargosRepository } from '../../repositories/models/ICargosRepository';
import { ILotacoesRepository } from '../../repositories/models/ILotacoesRepository';
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
  ) {}

  async execute({
    tipo, cargoId, cdsFgId, unidadeId, servidorId, data, diofProcesso, observacao,
  }: CreateNomeacaoData): Promise<Nomeacao> {
    const cargo = await this.cargosRepository.findById(cargoId);

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

    return nomeacao;
  }
}

export { CreateNomeacaoService };
