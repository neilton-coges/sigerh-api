import { inject, injectable } from 'tsyringe';

import { ClasseNivelCargo } from '../../entities/ClasseNivelCargo';
import {
  IClassesNiveisCargosRepository,
} from '../../repositories/models/IClassesNiveisCargosRepository';

@injectable()
class ListClasseNivelCargoService {
  constructor(
    @inject('ClassesNiveisCargosRepository')
    private classesNiveisCargosRepository: IClassesNiveisCargosRepository,
  ) {}

  async execute(nivelCargoId: string): Promise<ClasseNivelCargo[]> {
    return this.classesNiveisCargosRepository.findByNivelCargoId(nivelCargoId);
  }
}

export { ListClasseNivelCargoService };
