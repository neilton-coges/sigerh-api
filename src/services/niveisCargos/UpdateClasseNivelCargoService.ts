import { inject, injectable } from 'tsyringe';

import { ClasseNivelCargo } from '../../entities/ClasseNivelCargo';
import { AppError } from '../../error/AppError';
import {
  IClassesNiveisCargosRepository,
  UpdateClasseNivelCargoData,
} from '../../repositories/models/IClassesNiveisCargosRepository';

@injectable()
class UpdateClasseNivelCargoService {
  constructor(
    @inject('ClassesNiveisCargosRepository')
    private classesNiveisCargosRepository: IClassesNiveisCargosRepository,
  ) {}

  async execute({
    id,
    codigo,
    descricao,
  }: UpdateClasseNivelCargoData): Promise<ClasseNivelCargo> {
    const classeNivelCargo = await this.classesNiveisCargosRepository.findById(id);

    if (!classeNivelCargo) {
      throw new AppError('Classe de nível de cargo não encontrada.');
    }

    const classeNivelCargoWithExistingCodigo = await this.classesNiveisCargosRepository
      .findByCodigoAndNivelCargoId(
        codigo,
        classeNivelCargo.nivelCargoId,
      );

    if (classeNivelCargoWithExistingCodigo
       && classeNivelCargoWithExistingCodigo.id !== id) {
      throw new AppError('Já existe uma classe para este nível de cargo com este código.');
    }

    classeNivelCargo.codigo = codigo;
    classeNivelCargo.descricao = descricao;

    return this.classesNiveisCargosRepository.update(classeNivelCargo);
  }
}

export { UpdateClasseNivelCargoService };
