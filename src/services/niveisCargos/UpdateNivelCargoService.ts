import { inject, injectable } from 'tsyringe';

import { NivelCargo } from '../../entities/NivelCargo';
import { AppError } from '../../error/AppError';

import {
  INiveisCargosRepository,
  UpdateNivelCargoData,
} from '../../repositories/models/INiveisCargosRepository';

@injectable()
class UpdateNivelCargoService {
  constructor(
    @inject('NiveisCargosRepository')
    private niveisCargosRepository: INiveisCargosRepository,
  ) {}

  async execute({ id, codigo, descricao }: UpdateNivelCargoData): Promise<NivelCargo> {
    const nivelCargo = await this.niveisCargosRepository.findById(id);

    if (!nivelCargo) {
      throw new AppError('Nível de cargo não encontrado.');
    }

    const nivelCargoWithExistingCodigo = await this.niveisCargosRepository.findByCodigo(codigo);

    if (nivelCargoWithExistingCodigo && nivelCargoWithExistingCodigo.id !== id) {
      throw new AppError('Já existe um nível de cargo com esse código.');
    }

    nivelCargo.codigo = codigo;
    nivelCargo.descricao = descricao;

    return this.niveisCargosRepository.update(nivelCargo);
  }
}

export { UpdateNivelCargoService };
