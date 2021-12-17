import { inject, injectable } from 'tsyringe';

import { CdsFg } from '../../entities/CdsFg';
import { ICdsFgsRepository, ListCdsFgData } from '../../repositories/models/ICdsFgsRepository';

@injectable()
class ListCdsFgService {
  constructor(
    @inject('CdsFgsRepository')
    private cdsFgsRepostiory: ICdsFgsRepository,
  ) {}

  async execute({ tipo, simbologia }: ListCdsFgData): Promise<CdsFg[]> {
    return this.cdsFgsRepostiory.list({
      tipo,
      simbologia,
    });
  }
}

export { ListCdsFgService };
