import { inject, injectable } from 'tsyringe';

import { PadraoClasseNivelCargo } from '../../entities/PadraoClasseNivelCargo';
import { AppError } from '../../error/AppError';
import {
  IPadroesClassesNiveisCargosRepository,
  UpdatePadraoClasseNivelCargoData,
} from '../../repositories/models/IPadroesClassesNiveisCargosRepository';

@injectable()
class UpdatePadraoClasseNivelCargoService {
  constructor(
    @inject('PadroesClassesNiveisCargosRepository')
    private padroesClassesNiveisCargosRepository: IPadroesClassesNiveisCargosRepository,
  ) {}

  async execute({
    id, codigo, descricao,
  }: UpdatePadraoClasseNivelCargoData): Promise<PadraoClasseNivelCargo> {
    const padraoClasseNivelCargo = await this.padroesClassesNiveisCargosRepository.findById(
      id,
    );

    if (!padraoClasseNivelCargo) {
      throw new AppError('Padrão de classe não encontrado.');
    }

    const padraoClasseNivelCargoWithExistingCodigo = await this.padroesClassesNiveisCargosRepository
      .findByCodigoAndClasseNivelCargoId(
        codigo,
        padraoClasseNivelCargo.classeNivelCargoId,
      );

    if (padraoClasseNivelCargoWithExistingCodigo
      && padraoClasseNivelCargoWithExistingCodigo.id !== id) {
      throw new AppError('Já existe um padrão para esta classe com este código.');
    }

    padraoClasseNivelCargo.codigo = codigo;
    padraoClasseNivelCargo.descricao = descricao;

    return this.padroesClassesNiveisCargosRepository.update(padraoClasseNivelCargo);
  }
}

export { UpdatePadraoClasseNivelCargoService };
