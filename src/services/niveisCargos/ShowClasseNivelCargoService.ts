import { inject, injectable } from 'tsyringe';

import { ClasseNivelCargo } from '../../entities/ClasseNivelCargo';
import { AppError } from '../../error/AppError';
import {
  IClassesNiveisCargosRepository,
} from '../../repositories/models/IClassesNiveisCargosRepository';

@injectable()
class ShowClasseNivelCargoService {
  constructor(
    @inject('ClassesNiveisCargosRepository')
    private classesNiveisCargosRepository: IClassesNiveisCargosRepository,
  ) {}

  async execute(id: string): Promise<ClasseNivelCargo> {
    const classeNivelCargo = await this.classesNiveisCargosRepository.findById(id);

    if (!classeNivelCargo) {
      throw new AppError('Classe de nível de cargo não encontrada.');
    }

    return classeNivelCargo;
  }
}

export { ShowClasseNivelCargoService };
