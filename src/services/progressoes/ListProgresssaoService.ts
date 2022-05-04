import { inject, injectable } from 'tsyringe';

import { Progressao } from '../../entities/Progressao';
import { IProgressoesRepository, ListProgressaoData } from '../../repositories/models/IProgressoesRepository';

@injectable()
class ListProgressaoService {
  constructor(
    @inject('ProgressoesRepository')
    private progressoesRepository: IProgressoesRepository,
  ) {}

  async execute(data: ListProgressaoData): Promise<Progressao[]> {
    const progressoes = await this.progressoesRepository.list(data);

    return progressoes;
  }
}

export { ListProgressaoService };
