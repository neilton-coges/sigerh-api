import { inject, injectable } from 'tsyringe';

import { AppError } from '../../error/AppError';
import { ICargosRepository } from '../../repositories/models/ICargosRepository';

@injectable()
class DestroyCargoService {
  constructor(
    @inject('CargosRepository')
    private cargosRepository: ICargosRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const cargoExists = await this.cargosRepository.findById(id);

    if (!cargoExists) {
      throw new AppError('Cargo não encontrado.');
    }

    await this.cargosRepository.destroy(id);
  }
}

export { DestroyCargoService };
