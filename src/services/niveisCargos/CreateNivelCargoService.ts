import { inject, injectable } from 'tsyringe';

import { NivelCargo } from '../../entities/NivelCargo';
import { AppError } from '../../error/AppError';
import {
  CreateNivelCargoData,
  INiveisCargosRepository,
} from '../../repositories/models/INiveisCargosRepository';

@injectable()
class CreateNivelCargoService {
  constructor(
    @inject('NiveisCargosRepository')
    private niveisCargosRepository: INiveisCargosRepository,
  ) {}

  async execute({
    codigo,
    descricao,
  }: CreateNivelCargoData): Promise<NivelCargo> {
    const nivelCargoWithExistingCodigo = await this.niveisCargosRepository.findByCodigo(codigo);

    if (nivelCargoWithExistingCodigo) {
      throw new AppError('Já existe um nível de cargo com esse código.');
    }

    const nivelCargo = await this.niveisCargosRepository.create({
      codigo,
      descricao,
    });

    return nivelCargo;
  }
}

export { CreateNivelCargoService };
