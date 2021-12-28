import { inject, injectable } from 'tsyringe';

import { PadraoClasseNivelCargo } from '../../entities/PadraoClasseNivelCargo';
import { AppError } from '../../error/AppError';
import {
  IClassesNiveisCargosRepository,
} from '../../repositories/models/IClassesNiveisCargosRepository';
import {
  CreatePadraoClasseNivelCargoData,
  IPadroesClassesNiveisCargosRepository,
} from '../../repositories/models/IPadroesClassesNiveisCargosRepository';

@injectable()
class CreatePadraoClasseNivelCargoService {
  constructor(
    @inject('PadroesClassesNiveisCargosRepository')
    private padroesClassesNiveisCargosRepository: IPadroesClassesNiveisCargosRepository,
    @inject('ClassesNiveisCargosRepository')
    private classesNiveisCargosRepository: IClassesNiveisCargosRepository,
  ) {}

  async execute({
    codigo, descricao, valor, classeNivelCargoId,
  }: CreatePadraoClasseNivelCargoData): Promise<PadraoClasseNivelCargo> {
    const classeNivelCargoExist = await this.classesNiveisCargosRepository.findById(
      classeNivelCargoId,
    );

    if (!classeNivelCargoExist) {
      throw new AppError('Classe de nível de cargo não encontrada.');
    }

    const padraoClasseNivelCargoWithExistingCodigo = await this.padroesClassesNiveisCargosRepository
      .findByCodigoAndClasseNivelCargoId(
        codigo,
        classeNivelCargoId,
      );

    if (padraoClasseNivelCargoWithExistingCodigo) {
      throw new AppError('Já existe um padrão para esta classe com este código.');
    }

    const padraoClasseNivelCargo = await this.padroesClassesNiveisCargosRepository.create({
      codigo,
      descricao,
      valor,
      classeNivelCargoId,
    });

    return padraoClasseNivelCargo;
  }
}

export { CreatePadraoClasseNivelCargoService };
