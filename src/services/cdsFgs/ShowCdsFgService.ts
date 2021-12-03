import { inject, injectable } from 'tsyringe';

import { CdsFg } from '../../entities/CdsFg';
import { AppError } from '../../error/AppError';
import { ICdsFgsRepository } from '../../repositories/models/ICdsFgsRepository';

@injectable()
class ShowCdsFgService {
  constructor(
    @inject('CdsFgsRepository')
    private cdsFgsRepository: ICdsFgsRepository,
  ) {}

  async execute(id: string): Promise<CdsFg> {
    const cdsFg = await this.cdsFgsRepository.findById(id);

    if (!cdsFg) {
      throw new AppError('CDS/FG não encontrado.');
    }

    return cdsFg;
  }
}

export { ShowCdsFgService };
