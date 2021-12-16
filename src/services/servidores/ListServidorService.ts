import { inject, injectable } from 'tsyringe';

import { Servidor } from '../../entities/Servidor';
import { IServidoresRepository, ListServidorData } from '../../repositories/models/IServidoresRepository';

@injectable()
class ListServidorService {
  constructor(
    @inject('ServidoresRepository')
    private servidoresRepository: IServidoresRepository,
  ) {}

  async execute({ cpf, nome }: ListServidorData): Promise<Servidor[]> {
    const servidores = await this.servidoresRepository.list({ cpf, nome });

    return servidores;
  }
}

export { ListServidorService };
