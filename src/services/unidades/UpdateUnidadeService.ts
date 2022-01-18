import { inject, injectable } from 'tsyringe';

import { Unidade } from '../../entities/Unidade';
import { AppError } from '../../error/AppError';
import { IUnidadesRepository } from '../../repositories/models/IUnidadesRepository';

type UpdateUnidadeData = {
  id: string;
  sigla: string;
  descricao: string;
}

@injectable()
class UpdateUnidadeService {
  constructor(
    @inject('UnidadesRepository')
    private unidadesRepository: IUnidadesRepository,
  ) {}

  async execute({ id, sigla, descricao }: UpdateUnidadeData): Promise<Unidade> {
    const unidade = await this.unidadesRepository.findById(id);

    if (!unidade) {
      throw new AppError('Unidade não encontrada.');
    }

    unidade.sigla = sigla;
    unidade.descricao = descricao;

    await this.unidadesRepository.update(unidade);

    return unidade;
  }
}

export { UpdateUnidadeService };
