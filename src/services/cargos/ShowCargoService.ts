import { inject, injectable } from 'tsyringe';
import { Cargo } from '../../entities/Cargo';
import { AppError } from '../../error/AppError';
import { ICargosRepository } from '../../repositories/models/ICargosRepository';

@injectable()
class ShowCargoService {
  constructor(
    @inject('CargosRepository')
    private cargosRepository: ICargosRepository,
  ) {}

  async execute(id: string): Promise<Cargo> {
    const cargo = await this.cargosRepository.findById(id);

    if (!cargo) {
      throw new AppError('Cargo não encontrado.');
    }

    return cargo;
  }
}

export { ShowCargoService };
