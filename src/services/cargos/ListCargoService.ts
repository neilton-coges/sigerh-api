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
    tipo,
    nome,
  }: ListCargoData): Promise<Cargo[]> {
    const cargos = await this.cargosRepository.list({
      tipo,
      nome,
    });

    return cargos;
  }
}

export { ListCargoService };
