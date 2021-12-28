import { inject, injectable } from 'tsyringe';

import { PadraoClasseNivelCargo } from '../../entities/PadraoClasseNivelCargo';
import { AppError } from '../../error/AppError';
import {
  IPadroesClassesNiveisCargosRepository,
} from '../../repositories/models/IPadroesClassesNiveisCargosRepository';

@injectable()
class ShowPadraoClasseNivelCargoService {
  constructor(
    @inject('PadroesClassesNiveisCargosRepository')
    private padroesClassesNiveisCargosRepository: IPadroesClassesNiveisCargosRepository,
  ) {}

  async execute(id: string): Promise<PadraoClasseNivelCargo> {
    const padraoClasseNivelCargo = await this.padroesClassesNiveisCargosRepository.findById(
      id,
    );

    if (!padraoClasseNivelCargo) {
      throw new AppError('Padrão de classe não encontrado.');
    }

    return padraoClasseNivelCargo;
  }
}

export { ShowPadraoClasseNivelCargoService };
