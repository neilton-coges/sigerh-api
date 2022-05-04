import { inject, injectable } from 'tsyringe';

import { Cargo } from '../../entities/Cargo';
import { AppError } from '../../error/AppError';
import { ICargosRepository, UpdateCargoData } from '../../repositories/models/ICargosRepository';

@injectable()
class UpdateCargoService {
  constructor(
    @inject('CargosRepository')
    private cargosRepository: ICargosRepository,
  ) {}

  async execute({
    id, tipo, descricao, nivelCargoId, intervaloProgressao,
  }: UpdateCargoData): Promise<Cargo> {
    const cargo = await this.cargosRepository.findById(id);

    if (!cargo) {
      throw new AppError('Cargo não encontrado.');
    }

    const cargoAlreadyExists = await this.cargosRepository.findByDescricao(descricao);

    if (cargoAlreadyExists && cargoAlreadyExists.id !== id) {
      throw new AppError('Já existe um cargo com esta descrição.');
    }

    cargo.descricao = descricao;
    cargo.tipo = tipo;
    cargo.nivelCargoId = nivelCargoId;
    cargo.intervaloProgressao = intervaloProgressao;

    await this.cargosRepository.update(cargo);

    return cargo;
  }
}

export { UpdateCargoService };
