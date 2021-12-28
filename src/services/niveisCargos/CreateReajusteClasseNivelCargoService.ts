import { inject, injectable } from 'tsyringe';

import { AppError } from '../../error/AppError';
import {
  ReajusteClasseNivelCargo,
} from '../../entities/ReajusteClasseNivelCargo';
import {
  IPadroesClassesNiveisCargosRepository,
} from '../../repositories/models/IPadroesClassesNiveisCargosRepository';
import {
  CreateReajusteClasseNivelCargoData,
  IReajustesClassesNiveisCargosRepository,
} from '../../repositories/models/IReajustesClassesNiveisCargosRepository';

@injectable()
class CreateReajusteClasseNivelCargoService {
  constructor(
    @inject('ReajustesClassesNiveisCargosRepository')
    private reajustesClassesNiveisCargosRepository: IReajustesClassesNiveisCargosRepository,
    @inject('PadroesClassesNiveisCargosRepository')
    private padroesClassesNiveisCargosRepository: IPadroesClassesNiveisCargosRepository,
  ) {}

  async execute({
    percentual,
    observacao,
    classeNivelCargoId,
  }: CreateReajusteClasseNivelCargoData): Promise<ReajusteClasseNivelCargo> {
    const padroesClassseNiveisCargos = await this.padroesClassesNiveisCargosRepository
      .findByClasseNivelCargoId(classeNivelCargoId);

    if (padroesClassseNiveisCargos.length < 1) {
      throw new AppError('É necessário ter ao menos um padrão, para cadastrar um reajuste.');
    }

    const reajusteClasseNivelCargo = await this.reajustesClassesNiveisCargosRepository.create({
      percentual,
      observacao,
      classeNivelCargoId,
    });

    const padroesClassseNiveisCargosUpdateds = padroesClassseNiveisCargos.map((padrao) => {
      const valorReajuste = Number(((percentual / 100) * padrao.valorReajustado).toFixed(2));
      const valorReajustado = Number((padrao.valorReajustado + valorReajuste).toFixed(2));

      Object.assign(padrao, {
        valorReajustado,
      });

      return padrao;
    });

    await this.padroesClassesNiveisCargosRepository.updateAll(padroesClassseNiveisCargosUpdateds);

    return reajusteClasseNivelCargo;
  }
}

export { CreateReajusteClasseNivelCargoService };
