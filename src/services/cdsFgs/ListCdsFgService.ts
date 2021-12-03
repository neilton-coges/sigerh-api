import { inject, injectable } from 'tsyringe';
import { CdsFg } from '../../entities/CdsFg';
import { ICdsFgsRepository } from '../../repositories/models/ICdsFgsRepository';

type ListCdsFgRequest = {
  tipo?: 'CDS' | 'FG',
  sigla?: string;
  nome?: string;
};

@injectable()
class ListCdsFgService {
  constructor(
    @inject('CdsFgsRepository')
    private cdsFgsRepostiory: ICdsFgsRepository,
  ) {}

  async execute({ tipo, sigla, nome }: ListCdsFgRequest): Promise<CdsFg[]> {
    return this.cdsFgsRepostiory.filter({
      tipo,
      sigla,
      nome,
    });
  }
}

export { ListCdsFgService };
