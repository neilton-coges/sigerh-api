import { inject, injectable } from 'tsyringe';

import { CdsFg } from '../../entities/CdsFg';
import { ICdsFgsRepository, PaginateCdsFgData } from '../../repositories/models/ICdsFgsRepository';
import { IPage } from '../../repositories/models/IPage';

@injectable()
class PaginateCdsFgService {
  constructor(
    @inject('CdsFgsRepository')
    private cdsFgsRepository: ICdsFgsRepository,
  ) {}

  async execute({
    tipo, sigla, nome, current = 1, perPage = 15,
  }: PaginateCdsFgData): Promise<IPage<CdsFg>> {
    return this.cdsFgsRepository.paginate({
      tipo,
      sigla,
      nome,
      current,
      perPage,
    });
  }
}

export { PaginateCdsFgService };
