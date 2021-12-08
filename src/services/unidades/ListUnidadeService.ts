import { inject, injectable } from 'tsyringe';
import { Unidade } from '../../entities/Unidade';
import { IUnidadesRepository, ListUnidadeData } from '../../repositories/models/IUnidadesRepository';

@injectable()
class ListUnidadeService {
  constructor(
    @inject('UnidadesRepository')
    private unidadesRepository: IUnidadesRepository,
  ) {}

  async execute({ nome, sigla }: ListUnidadeData): Promise<Unidade[]> {
    const unidades = await this.unidadesRepository.list({ nome, sigla });

    return unidades;
  }
}

export { ListUnidadeService };
