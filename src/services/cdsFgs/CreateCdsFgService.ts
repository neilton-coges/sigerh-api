import { inject, injectable } from 'tsyringe';

import { CdsFg } from '../../entities/CdsFg';
import { AppError } from '../../error/AppError';
import { ICdsFgsRepository } from '../../repositories/models/ICdsFgsRepository';

type CreateCdsFgRequest = Omit<CdsFg, 'id' | 'qtdNomeados' | 'createdAt' | 'updatedAt'>;

@injectable()
class CreateCdsFgService {
  constructor(
    @inject('CdsFgsRepository')
    private cdsFgsRepository: ICdsFgsRepository,
  ) {}

  async execute({
    tipo, sigla, nome, valor, qtdVagas,
  }: CreateCdsFgRequest): Promise<CdsFg> {
    const cdsFgAlreadyExists = await this.cdsFgsRepository.findBySigla(sigla);

    if (cdsFgAlreadyExists) {
      throw new AppError('Já existe um CDS/FG com esta sigla.');
    }

    const cdsFg = await this.cdsFgsRepository.create({
      tipo,
      sigla,
      nome,
      valor,
      qtdVagas,
    });

    return cdsFg;
  }
}

export { CreateCdsFgService };
