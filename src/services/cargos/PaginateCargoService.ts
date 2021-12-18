import { inject, injectable } from 'tsyringe';

import { Cargo } from '../../entities/Cargo';
import { ICargosRepository, PaginateCargoData } from '../../repositories/models/ICargosRepository';
import { IPage } from '../../repositories/models/IPage';

@injectable()
class PaginateCargoService {
  constructor(
    @inject('CargosRepository')
    private cargosRepository: ICargosRepository,
  ) {}

  async execute({
    tipo, nome, perPage = 15, current = 1,
  }: PaginateCargoData): Promise<IPage<Cargo>> {
    const page = await this.cargosRepository.paginate({
      tipo,
      nome,
      perPage,
      current,
    });

    return page;
  }
}

export { PaginateCargoService };
