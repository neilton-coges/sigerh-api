import { inject, injectable } from 'tsyringe';

import { AppError } from '../../error/AppError';
import { ICdsFgsRepository } from '../../repositories/models/ICdsFgsRepository';

@injectable()
class DestroyCdsFgService {
  constructor(
    @inject('CdsFgsRepository')
    private cdsFgsRepository: ICdsFgsRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const cdsFg = await this.cdsFgsRepository.findById(id);

    if (!cdsFg) {
      throw new AppError('CDS/FG não encontrado.');
    }

    if (cdsFg.quantidadeNomeados > 0) {
      throw new AppError('Não é possível excluir um CDS/FG com servidores nomeados.');
    }

    await this.cdsFgsRepository.destroy(id);
  }
}

export { DestroyCdsFgService };
