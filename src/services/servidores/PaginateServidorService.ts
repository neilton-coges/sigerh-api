import { inject, injectable } from 'tsyringe';

import { Servidor } from '../../entities/Servidor';
import { IPage } from '../../repositories/models/IPage';
import { IServidoresRepository, PaginateServidorData } from '../../repositories/models/IServidoresRepository';

@injectable()
class PaginateServidorService {
  constructor(
    @inject('ServidoresRepository')
    private servidoresRepository: IServidoresRepository,
  ) {}

  async execute({
    cpf, nome, current = 1, perPage = 15,
  }: PaginateServidorData): Promise<IPage<Servidor>> {
    const page = await this.servidoresRepository.paginate({
      cpf,
      nome,
      current,
      perPage,
    });

    return page;
  }
}

export { PaginateServidorService };
