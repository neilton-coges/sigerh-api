import { inject, injectable } from 'tsyringe';

import { Cargo } from '../../entities/Cargo';
import { AppError } from '../../error/AppError';
import { CreateCargoData, ICargosRepository } from '../../repositories/models/ICargosRepository';

@injectable()
class CreateCargoService {
  constructor(
    @inject('CargosRepository')
    private cargosRepository: ICargosRepository,
  ) {}

  async execute({ nome }: CreateCargoData): Promise<Cargo> {
    const cargoAlreadyExists = await this.cargosRepository.findByNome(nome);

    if (cargoAlreadyExists) {
      throw new AppError('Já existe um cargo com este nome.');
    }

    const cargo = await this.cargosRepository.create({
      nome,
    });

    return cargo;
  }
}

export { CreateCargoService };
