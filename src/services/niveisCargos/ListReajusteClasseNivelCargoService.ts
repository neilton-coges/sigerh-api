import { inject, injectable } from 'tsyringe';

import {
  ReajusteClasseNivelCargo,
} from '../../entities/ReajusteClasseNivelCargo';
import {
  IReajustesClassesNiveisCargosRepository,
} from '../../repositories/models/IReajustesClassesNiveisCargosRepository';

@injectable()
class ListReajusteClasseNivelCargoService {
  constructor(
    @inject('ReajustesClassesNiveisCargosRepository')
    private reajustesClassesNiveisCargosRepository: IReajustesClassesNiveisCargosRepository,
  ) {}

  async execute(classeNivelCargoId: string): Promise<ReajusteClasseNivelCargo[]> {
    const reajustesClassesNiveisCargos = await this.reajustesClassesNiveisCargosRepository
      .findByClasseNivelCargoId(classeNivelCargoId);

    return reajustesClassesNiveisCargos;
  }
}

export { ListReajusteClasseNivelCargoService };
