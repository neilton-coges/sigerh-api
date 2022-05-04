import { inject, injectable } from 'tsyringe';

import { IPage } from '../../repositories/models/IPage';
import { IProgressoesRepository, PaginateProgressaoData } from '../../repositories/models/IProgressoesRepository';
import { Progressao } from '../../entities/Progressao';

@injectable()
class PaginateProgressaoService {
  constructor(
    @inject('ProgressoesRepository')
    private progressoesRepository: IProgressoesRepository,
  ) {}

  async execute({
    servidorId, dataProgressaoInicio, dataProgressaoFim, perPage = 15, current = 1,
  }: PaginateProgressaoData): Promise<IPage<Progressao>> {
    const page = await this.progressoesRepository.paginate({
      servidorId,
      dataProgressaoInicio,
      dataProgressaoFim,
      perPage,
      current,
    });

    return page;
  }
}

export { PaginateProgressaoService };
