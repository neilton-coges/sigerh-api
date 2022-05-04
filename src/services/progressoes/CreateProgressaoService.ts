import { inject, injectable } from 'tsyringe';
import { addYears } from 'date-fns';

import { AppError } from '../../error/AppError';
import { Progressao } from '../../entities/Progressao';
import { TipoCargo } from '../../entities/Cargo';
import { IServidoresRepository } from '../../repositories/models/IServidoresRepository';
import { ILotacoesRepository } from '../../repositories/models/ILotacoesRepository';
import { ICargosRepository } from '../../repositories/models/ICargosRepository';
import { IClassesNiveisCargosRepository } from '../../repositories/models/IClassesNiveisCargosRepository';
import { IPadroesClassesNiveisCargosRepository } from '../../repositories/models/IPadroesClassesNiveisCargosRepository';
import { CreateProgressaoData, IProgressoesRepository } from '../../repositories/models/IProgressoesRepository';

@injectable()
class CreateProgressaoService {
  constructor(
    @inject('ProgressoesRepository')
    private progressoesRepository: IProgressoesRepository,
    @inject('ServidoresRepository')
    private servidoresRepository: IServidoresRepository,
    @inject('LotacoesRepository')
    private lotacoesRepository: ILotacoesRepository,
    @inject('CargosRepository')
    private cargosRepository: ICargosRepository,
    @inject('ClassesNiveisCargosRepository')
    private classeNiveisCargosRepository: IClassesNiveisCargosRepository,
    @inject('PadroesClassesNiveisCargosRepository')
    private padroesClassesNiveisCargosRepository: IPadroesClassesNiveisCargosRepository,
  ) {}

  async execute({
    servidorId,
    cargoId,
    classeNivelCargoId,
    padraoClasseNivelCargoId,
    dataProgressao,
    processo,
    observacao,
  }: Omit<CreateProgressaoData, 'lotacaoId'>): Promise<Progressao> {
    // 1. validar se servidor existe
    // 2. validar se a lotação existe
    // 3. validar se cargo existe
    // 4. validar se classe existe
    // 5. validar se padrão existe
    // intervalo de progressão do cargo atual
    const servidor = await this.servidoresRepository.findByIdWithLotacoes(servidorId);

    if (!servidor) {
      throw new AppError('Servidor não encontrado.');
    }

    const lotacaoEfetiva = servidor.lotacoes.find(
      (lotacao) => lotacao.cargo.tipo === TipoCargo.EFETIVO,
    );

    if (!lotacaoEfetiva) {
      throw new AppError('Servidor não possui lotação com cargo efetivo.');
    }

    const cargo = await this.cargosRepository.findById(cargoId);

    if (!cargo) {
      throw new AppError('Cargo não encontrado.');
    }

    const classeNivelCargo = await this.classeNiveisCargosRepository.findById(classeNivelCargoId);

    if (!classeNivelCargo) {
      throw new AppError('Classe não encontrada.');
    }

    if (cargo.nivelCargoId !== classeNivelCargo.nivelCargoId) {
      throw new AppError('Nível de classe divergente de nível de cargo.');
    }

    const padraoClasseNivelCargo = await this.padroesClassesNiveisCargosRepository.findById(
      padraoClasseNivelCargoId,
    );

    if (!padraoClasseNivelCargo) {
      throw new AppError('Padrão não encontrado.');
    }

    if (padraoClasseNivelCargo.classeNivelCargoId !== classeNivelCargo.id) {
      throw new AppError('Padrão de outra classe.');
    }

    const progressao = await this.progressoesRepository.create({
      servidorId,
      lotacaoId: lotacaoEfetiva.id,
      cargoId,
      classeNivelCargoId,
      padraoClasseNivelCargoId,
      dataProgressao,
      processo,
      observacao,
    });

    const progressoes = await this.progressoesRepository.findByServidorIdAndLotacaoId(
      servidorId,
      lotacaoEfetiva.id,
    );

    const isFirstProgressao = progressoes.length === 1;
    const nextProgressaoData = isFirstProgressao
      ? addYears(servidor.dataProximaProgressao, 1)
      : addYears(servidor.dataProximaProgressao, cargo.intervaloProgressao);

    lotacaoEfetiva.cargoId = cargoId;
    lotacaoEfetiva.classeNivelCargoId = classeNivelCargoId;
    lotacaoEfetiva.padraoClasseNivelCargoId = padraoClasseNivelCargoId;
    await this.lotacoesRepository.update(lotacaoEfetiva);

    servidor.dataProximaProgressao = nextProgressaoData;
    await this.servidoresRepository.update(servidor);

    return progressao;
  }
}

export { CreateProgressaoService };
