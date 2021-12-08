import { inject, injectable } from 'tsyringe';
import { Unidade } from '../../entities/Unidade';
import { IPage } from '../../repositories/models/IPage';
import { IUnidadesRepository, PaginateUnidadeData } from '../../repositories/models/IUnidadesRepository';

@injectable()
class PaginateUnidadeService {
  constructor(
    @inject('UnidadesRepository')
    private unidadesRepository: IUnidadesRepository,
  ) {}

  async execute({
    sigla, nome, perPage = 15, current = 1,
  }: PaginateUnidadeData): Promise<IPage<Unidade>> {
    const page = await this.unidadesRepository.paginate({
      sigla,
      nome,
      perPage,
      current,
    });

    return page;
  }
}

export { PaginateUnidadeService };
