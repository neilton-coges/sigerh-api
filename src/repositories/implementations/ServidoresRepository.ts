import { getRepository, ILike, Repository } from 'typeorm';

import { Servidor } from '../../entities/Servidor';
import { IPage } from '../models/IPage';
import {
  CreateServidorData, IServidoresRepository, ListServidorData, PaginateServidorData,
} from '../models/IServidoresRepository';

class ServidoresRepository implements IServidoresRepository {
  private repository: Repository<Servidor>;

  constructor() {
    this.repository = getRepository(Servidor);
  }

  async create({
    nome,
    dataNascimento,
    telefoneCorporativo,
    telefonePessoal,
    emailCorporativo,
    emailPessoal,
    genero,
    tipoSanguineo,
    corRaca,
    nacionalidade,
    naturalidadeCidade,
    naturalidadeEstado,
    estadoCivil,
    conjugeNome,
    conjugeCpf,
    conjugeDataNascimento,
    nomeMae,
    nomePai,
    cpf,
    rgNumero,
    rgOrgaoEmissor,
    rgDataEmissao,
    tituloNumero,
    tituloSecao,
    tituloZona,
    pis,
  }: CreateServidorData): Promise<Servidor> {
    const servidor = this.repository.create({
      nome,
      dataNascimento,
      telefoneCorporativo,
      telefonePessoal,
      emailCorporativo,
      emailPessoal,
      genero,
      tipoSanguineo,
      corRaca,
      nacionalidade,
      naturalidadeCidade,
      naturalidadeEstado,
      estadoCivil,
      conjugeNome,
      conjugeCpf,
      conjugeDataNascimento,
      nomeMae,
      nomePai,
      cpf,
      rgNumero,
      rgOrgaoEmissor,
      rgDataEmissao,
      tituloNumero,
      tituloSecao,
      tituloZona,
      pis,
    });

    await this.repository.save(servidor);

    return servidor;
  }

  async update(servidor: Servidor): Promise<Servidor> {
    return this.repository.save(servidor);
  }

  async destroy(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async list({ cpf, nome }: ListServidorData): Promise<Servidor[]> {
    const query = this.repository.createQueryBuilder();

    if (cpf) {
      query.andWhere({
        cpf: ILike(`%${cpf}%`),
      });
    }

    if (nome) {
      query.andWhere({
        nome: ILike(`%${nome}%`),
      });
    }

    return query.getMany();
  }

  async paginate({
    cpf, nome, current, perPage,
  }: PaginateServidorData): Promise<IPage<Servidor>> {
    const skip = current * perPage - perPage;
    const take = perPage;

    const query = this.repository.createQueryBuilder();

    if (cpf) {
      query.andWhere({
        sigla: ILike(`%${cpf}%`),
      });
    }

    if (nome) {
      query.andWhere({
        nome: ILike(`%${nome}%`),
      });
    }

    const size = await query.getCount();
    const total = Math.ceil(size / perPage);

    query.take(take);
    query.skip(skip);

    const data = await query.getMany();

    return {
      data,
      perPage,
      current,
      size,
      total,
    };
  }

  async findById(id: string): Promise<Servidor> {
    return this.repository.findOne(id);
  }

  async findByCpf(cpf: string): Promise<Servidor> {
    return this.repository.findOne({ cpf });
  }

  async findByEmail(email: string): Promise<Servidor> {
    return this.repository.findOne({
      where: [
        { emailCorporativo: email },
        { emailPessoal: email },
      ],
    });
  }
}

export { ServidoresRepository };
