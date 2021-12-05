import { inject, injectable } from 'tsyringe';
import { CdsFg } from '../../entities/CdsFg';
import { ICdsFgsRepository, ListCdsFgData } from '../../repositories/models/ICdsFgsRepository';

@injectable()
class ListCdsFgService {
  constructor(
    @inject('CdsFgsRepository')
    private cdsFgsRepostiory: ICdsFgsRepository,
  ) {}

  async execute({ tipo, sigla, nome }: ListCdsFgData): Promise<CdsFg[]> {
    return this.cdsFgsRepostiory.list({
      tipo,
      sigla,
      nome,
    });
  }
}

export { ListCdsFgService };
