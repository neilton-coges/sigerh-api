import { inject, injectable } from 'tsyringe';

import { ClasseNivelCargo } from '../../entities/ClasseNivelCargo';
import { AppError } from '../../error/AppError';
import {
  CreateClasseNivelCargoData,
  IClassesNiveisCargosRepository,
} from '../../repositories/models/IClassesNiveisCargosRepository';
import {
  INiveisCargosRepository,
} from '../../repositories/models/INiveisCargosRepository';

@injectable()
class CreateClasseNivelCargoService {
  constructor(
    @inject('ClassesNiveisCargosRepository')
    private classesNiveisCargosRepository: IClassesNiveisCargosRepository,
    @inject('NiveisCargosRepository')
    private niveisCargosRepository: INiveisCargosRepository,
  ) {}

  async execute({
    codigo,
    descricao,
    nivelCargoId,
  }: CreateClasseNivelCargoData): Promise<ClasseNivelCargo> {
    const nivelCargoExists = await this.niveisCargosRepository.findById(nivelCargoId);

    if (!nivelCargoExists) {
      throw new AppError('Nivel de cargo não encontrado.');
    }

    const classeNivelCargoWithExistingCodigo = await this.classesNiveisCargosRepository
      .findByCodigoAndNivelCargoId(
        codigo,
        nivelCargoId,
      );

    if (classeNivelCargoWithExistingCodigo) {
      throw new AppError('Já existe uma classe para este nível de cargo com este código.');
    }

    return this.classesNiveisCargosRepository.create({
      codigo,
      descricao,
      nivelCargoId,
    });
  }
}

export { CreateClasseNivelCargoService };
