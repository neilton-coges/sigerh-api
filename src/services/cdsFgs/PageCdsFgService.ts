import { inject, injectable } from 'tsyringe';
import { CdsFg } from '../../entities/CdsFg';
import { ICdsFgsRepository } from '../../repositories/models/ICdsFgsRepository';
import { IPage } from '../../repositories/models/IPage';
import { IPaginator } from '../../repositories/models/IPaginator';

interface PageCdsFgRequest extends IPaginator {
  tipo?: 'CDS' | 'FG',
  sigla?: string;
  nome?: string;
}

@injectable()
class PageCdsFgService {
  constructor(
    @inject('CdsFgsRepository')
    private cdsFgsRepository: ICdsFgsRepository,
  ) {}

  async execute({
    tipo, sigla, nome, current = 1, perPage = 15,
  }: PageCdsFgRequest): Promise<IPage<CdsFg>> {
    return this.cdsFgsRepository.paginate({
      tipo,
      sigla,
      nome,
      current,
      perPage,
    });
  }
}

export { PageCdsFgService };
