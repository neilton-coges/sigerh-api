import { inject, injectable } from 'tsyringe';

import { Unidade } from '../../entities/Unidade';
import { AppError } from '../../error/AppError';
import { IUnidadesRepository } from '../../repositories/models/IUnidadesRepository';

@injectable()
class ShowUnidadeService {
  constructor(
    @inject('UnidadesRepository')
    private unidadesRepository: IUnidadesRepository,
  ) {}

  async execute(id: string): Promise<Unidade> {
    const unidade = await this.unidadesRepository.findByIdWithSubunidades(id);

    if (!unidade) {
      throw new AppError('Unidade não encontrada');
    }

    return unidade;
  }
}

export { ShowUnidadeService };
