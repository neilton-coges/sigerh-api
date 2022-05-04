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

  async execute({
    tipo, descricao, nivelCargoId, intervaloProgressao,
  }: CreateCargoData): Promise<Cargo> {
    const cargoAlreadyExists = await this.cargosRepository.findByDescricao(descricao);

    if (cargoAlreadyExists) {
      throw new AppError('Já existe um cargo com esta descrição.');
    }

    const cargo = await this.cargosRepository.create({
      tipo,
      descricao,
      nivelCargoId,
      intervaloProgressao,
    });

    return cargo;
  }
}

export { CreateCargoService };
