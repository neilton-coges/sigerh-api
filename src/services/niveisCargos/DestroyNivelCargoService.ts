import { inject, injectable } from 'tsyringe';

import { AppError } from '../../error/AppError';
import {
  INiveisCargosRepository,
} from '../../repositories/models/INiveisCargosRepository';

@injectable()
class DestroyNivelCargoService {
  constructor(
    @inject('NiveisCargosRepository')
    private niveisCargosRepository: INiveisCargosRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const nivelCargo = await this.niveisCargosRepository.findById(id);

    if (!nivelCargo) {
      throw new AppError('Nível de cargo não encontrado.');
    }

    await this.niveisCargosRepository.destroy(id);
  }
}

export { DestroyNivelCargoService };
