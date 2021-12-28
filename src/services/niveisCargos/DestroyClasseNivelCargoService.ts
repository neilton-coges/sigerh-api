import { inject, injectable } from 'tsyringe';

import { AppError } from '../../error/AppError';
import {
  IClassesNiveisCargosRepository,
} from '../../repositories/models/IClassesNiveisCargosRepository';

@injectable()
class DestroyClasseNivelCargoService {
  constructor(
    @inject('ClassesNiveisCargosRepository')
    private classesNiveisCargosRepository: IClassesNiveisCargosRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const classeNivelCargo = await this.classesNiveisCargosRepository.findById(id);

    if (!classeNivelCargo) {
      throw new AppError('Classe de nível de cargo não encontrada.');
    }

    await this.classesNiveisCargosRepository.destroy(id);
  }
}

export { DestroyClasseNivelCargoService };
