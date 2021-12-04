import { inject, injectable } from 'tsyringe';

import { Cargo } from '../../entities/Cargo';
import { AppError } from '../../error/AppError';
import { ICargosRepository } from '../../repositories/models/ICargosRepository';

type UpdateRequestData = {
  id: string;
  nome: string;
}

@injectable()
class UpdateCargoService {
  constructor(
    @inject('CargosRepository')
    private cargosRepository: ICargosRepository,
  ) {}

  async execute({ id, nome }: UpdateRequestData): Promise<Cargo> {
    const cargo = await this.cargosRepository.findById(id);

    if (!cargo) {
      throw new AppError('Cargo não encontrado.');
    }

    const cargoAlreadyExists = await this.cargosRepository.findByNome(nome);

    if (cargoAlreadyExists && cargoAlreadyExists.id !== id) {
      throw new AppError('Já existe um cargo com este nome.');
    }

    cargo.nome = nome;

    await this.cargosRepository.update(cargo);

    return cargo;
  }
}

export { UpdateCargoService };
