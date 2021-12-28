import { inject, injectable } from 'tsyringe';

import { NivelCargo } from '../../entities/NivelCargo';
import { AppError } from '../../error/AppError';
import {
  INiveisCargosRepository,
} from '../../repositories/models/INiveisCargosRepository';

@injectable()
class ShowNivelCargoService {
  constructor(
    @inject('NiveisCargosRepository')
    private niveisCargosRepository: INiveisCargosRepository,
  ) {}

  async execute(id: string): Promise<NivelCargo> {
    const nivelCargo = await this.niveisCargosRepository.findById(id);

    if (!nivelCargo) {
      throw new AppError('Nível de cargo não encontrado.');
    }

    return nivelCargo;
  }
}

export { ShowNivelCargoService };
