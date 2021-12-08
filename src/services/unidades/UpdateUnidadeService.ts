import { inject, injectable } from 'tsyringe';

import { Unidade } from '../../entities/Unidade';
import { AppError } from '../../error/AppError';
import { IUnidadesRepository } from '../../repositories/models/IUnidadesRepository';

type UpdateUnidadeData = {
  id: string;
  sigla: string;
  nome: string;
}

@injectable()
class UpdateUnidadeService {
  constructor(
    @inject('UnidadesRepository')
    private unidadesRepository: IUnidadesRepository,
  ) {}

  async execute({ id, sigla, nome }: UpdateUnidadeData): Promise<Unidade> {
    const unidade = await this.unidadesRepository.findById(id);

    if (!unidade) {
      throw new AppError('Unidade não encontrada.');
    }

    unidade.sigla = sigla;
    unidade.nome = nome;

    await this.unidadesRepository.update(unidade);

    return unidade;
  }
}

export { UpdateUnidadeService };
