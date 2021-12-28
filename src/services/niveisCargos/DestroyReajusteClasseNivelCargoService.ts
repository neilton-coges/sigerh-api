import { inject, injectable } from 'tsyringe';

import { AppError } from '../../error/AppError';
import {
  IPadroesClassesNiveisCargosRepository,
} from '../../repositories/models/IPadroesClassesNiveisCargosRepository';
import {
  IReajustesClassesNiveisCargosRepository,
} from '../../repositories/models/IReajustesClassesNiveisCargosRepository';

@injectable()
class DestroyReajusteClasseNivelCargoService {
  constructor(
    @inject('ReajustesClassesNiveisCargosRepository')
    private reajustesClassesNiveisCargosRepository: IReajustesClassesNiveisCargosRepository,
    @inject('PadroesClassesNiveisCargosRepository')
    private padroesClassesNiveisCargosRepository: IPadroesClassesNiveisCargosRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const reajusteClasseNivelCargo = await this.reajustesClassesNiveisCargosRepository.findById(
      id,
    );

    if (!reajusteClasseNivelCargo) {
      throw new AppError('Reajuste não encontrado.');
    }

    await this.reajustesClassesNiveisCargosRepository.destroy(id);

    const reasjutesClasses = await this.reajustesClassesNiveisCargosRepository
      .findByClasseNivelCargoId(
        reajusteClasseNivelCargo.classeNivelCargoId,
      );

    const percentualTotal = reasjutesClasses
      .reduce((accumulator, { percentual }) => accumulator + percentual, 0);

    const padroesClasses = await this.padroesClassesNiveisCargosRepository.findByClasseNivelCargoId(
      reajusteClasseNivelCargo.classeNivelCargoId,
    );

    if (padroesClasses.length > 0) {
      const padroesUpdateds = padroesClasses.map((padrao) => {
        const valorReajuste = Number(((percentualTotal / 100) * padrao.valor).toFixed(2));
        const valorReajustado = Number((padrao.valor + valorReajuste).toFixed(2));

        Object.assign(padrao, {
          valorReajustado,
        });

        return padrao;
      });

      await this.padroesClassesNiveisCargosRepository.updateAll(padroesUpdateds);
    }
  }
}

export { DestroyReajusteClasseNivelCargoService };
