import { inject, injectable } from 'tsyringe';

import { CdsFg } from '../../entities/CdsFg';
import { AppError } from '../../error/AppError';
import { CreateCdsFgData, ICdsFgsRepository } from '../../repositories/models/ICdsFgsRepository';

@injectable()
class CreateCdsFgService {
  constructor(
    @inject('CdsFgsRepository')
    private cdsFgsRepository: ICdsFgsRepository,
  ) {}

  async execute({
    tipo, simbologia, remuneracao, quantidadeVagas,
  }: CreateCdsFgData): Promise<CdsFg> {
    const cdsFgAlreadyExists = await this.cdsFgsRepository.findBySimbologia(simbologia);

    if (cdsFgAlreadyExists) {
      throw new AppError('Já existe um CDS/FG com esta simbologia.');
    }

    const cdsFg = await this.cdsFgsRepository.create({
      tipo,
      simbologia,
      remuneracao,
      quantidadeVagas,
    });

    return cdsFg;
  }
}

export { CreateCdsFgService };
