import { inject, injectable } from 'tsyringe';
import { Unidade } from '../../entities/Unidade';
import { AppError } from '../../error/AppError';
import { CreateUnidadeData, IUnidadesRepository } from '../../repositories/models/IUnidadesRepository';

@injectable()
class CreateUnidadeService {
  constructor(
    @inject('UnidadesRepository')
    private unidadesRepository: IUnidadesRepository,
  ) {}

  async execute({ sigla, nome, unidadePaiId }: CreateUnidadeData): Promise<Unidade> {
    if (unidadePaiId) {
      const unidadePaiExists = await this.unidadesRepository.findById(unidadePaiId);

      if (!unidadePaiExists) {
        throw new AppError('Unidade não encontrada.');
      }
    }

    const unidade = await this.unidadesRepository.create({
      sigla,
      nome,
      unidadePaiId,
    });

    return unidade;
  }
}

export { CreateUnidadeService };
