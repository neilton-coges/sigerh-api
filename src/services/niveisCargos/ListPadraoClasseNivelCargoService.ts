import { inject, injectable } from 'tsyringe';

import { PadraoClasseNivelCargo } from '../../entities/PadraoClasseNivelCargo';
import {
  IPadroesClassesNiveisCargosRepository,
} from '../../repositories/models/IPadroesClassesNiveisCargosRepository';

@injectable()
class ListPadraoClasseNivelCargoService {
  constructor(
    @inject('PadroesClassesNiveisCargosRepository')
    private padroesClassesNiveisCargosRepository: IPadroesClassesNiveisCargosRepository,
  ) {}

  async execute(classeNivelCargoId: string): Promise<PadraoClasseNivelCargo[]> {
    return this.padroesClassesNiveisCargosRepository.findByClasseNivelCargoId(
      classeNivelCargoId,
    );
  }
}

export { ListPadraoClasseNivelCargoService };
