import { inject, injectable } from 'tsyringe';

import { AppError } from '../../error/AppError';
import { Progressao } from '../../entities/Progressao';
import { IProgressoesRepository } from '../../repositories/models/IProgressoesRepository';

@injectable()
export class ShowProgressaoService {
  constructor(
    @inject('ProgressoesRepository')
    private progressoesRepository: IProgressoesRepository,
  ) {}

  async execute(id: string): Promise<Progressao> {
    const progressao = await this.progressoesRepository.findById(id);

    if (!progressao) {
      throw new AppError('Progressão não encontrada.');
    }

    return progressao;
  }
}
