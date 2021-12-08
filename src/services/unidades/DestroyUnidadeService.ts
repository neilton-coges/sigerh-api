import { inject, injectable } from 'tsyringe';
import { AppError } from '../../error/AppError';
import { IUnidadesRepository } from '../../repositories/models/IUnidadesRepository';

@injectable()
class DestroyUnidadeService {
  constructor(
    @inject('UnidadesRepository')
    private unidadesRepository: IUnidadesRepository,
  ) { }

  async execute(id: string): Promise<void> {
    const unidadeExists = await this.unidadesRepository.findById(id);

    if (!unidadeExists) {
      throw new AppError('Unidade não encontrada.');
    }

    await this.unidadesRepository.destroy(id);
  }
}

export { DestroyUnidadeService };
