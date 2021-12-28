import { inject, injectable } from 'tsyringe';

import { AppError } from '../../error/AppError';
import {
  IPadroesClassesNiveisCargosRepository,
} from '../../repositories/models/IPadroesClassesNiveisCargosRepository';

@injectable()
class DestroyPadraoClasseNivelCargoService {
  constructor(
    @inject('PadroesClassesNiveisCargosRepository')
    private padroesClassesNiveisCargosRepository: IPadroesClassesNiveisCargosRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const padraoClasseNivelCargo = await this.padroesClassesNiveisCargosRepository.findById(
      id,
    );

    if (!padraoClasseNivelCargo) {
      throw new AppError('Padrão de classe não encontrado.');
    }

    await this.padroesClassesNiveisCargosRepository.destroy(id);
  }
}

export { DestroyPadraoClasseNivelCargoService };
