import { inject, injectable } from 'tsyringe';

import { Cargo } from '../../entities/Cargo';
import { ICargosRepository, ListCargoData } from '../../repositories/models/ICargosRepository';

@injectable()
class ListCargoService {
  constructor(
    @inject('CargosRepository')
    private cargosRepository: ICargosRepository,
  ) {}

  async execute({
    nome,
  }: ListCargoData): Promise<Cargo[]> {
    const cargos = await this.cargosRepository.list({
      nome,
    });

    return cargos;
  }
}

export { ListCargoService };
