import {
  Between, getRepository, ILike, Repository,
} from 'typeorm';

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

  async list({
    cpf, nome, anoProximaProgressao, tipoVinculo,
  }: ListServidorData): Promise<Servidor[]> {
    const query = this.repository.createQueryBuilder('servidores');

    query.leftJoinAndSelect('servidores.lotacoes', 'lotacoes');
    query.leftJoinAndSelect('lotacoes.classeNivelCargo', 'classeNivelCargo');
    query.leftJoinAndSelect('lotacoes.padraoClasseNivelCargo', 'padraoClasseNivelCargo');
    query.leftJoinAndSelect('lotacoes.cargo', 'cargo');

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

    if (anoProximaProgressao) {
      const firstDateOfYear = new Date(anoProximaProgressao, 0, 1);
      const lastDateOfYear = new Date(anoProximaProgressao, 11, 31);

      query.andWhere({
        dataProximaProgressao: Between(firstDateOfYear, lastDateOfYear),
      });
    }

    if (tipoVinculo) {
      query.andWhere('cargo.tipo = :tipoVinculo', { tipoVinculo });
    }

    return query.getMany();
  }

  async paginate({
    cpf, nome, anoProximaProgressao, tipoVinculo, current, perPage,
  }: PaginateServidorData): Promise<IPage<Servidor>> {
    const skip = current * perPage - perPage;
    const take = perPage;

    const query = this.repository.createQueryBuilder('servidores');

    query.leftJoinAndSelect('servidores.lotacoes', 'lotacoes');
    query.leftJoinAndSelect('lotacoes.classeNivelCargo', 'classeNivelCargo');
    query.leftJoinAndSelect('lotacoes.padraoClasseNivelCargo', 'padraoClasseNivelCargo');
    query.leftJoinAndSelect('lotacoes.cargo', 'cargo');

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

    if (tipoVinculo) {
      query.andWhere('cargo.tipo = :tipoVinculo', { tipoVinculo });
    }

    if (anoProximaProgressao) {
      const firstDateOfYear = new Date(anoProximaProgressao, 0, 1);
      const lastDateOfYear = new Date(anoProximaProgressao, 11, 31);

      query.andWhere({
        dataProximaProgressao: Between(firstDateOfYear, lastDateOfYear),
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

  async findByIdWithLotacoes(id: string): Promise<Servidor> {
    const query = this.repository.createQueryBuilder('servidor');

    const servidor = await query
      .innerJoinAndSelect('servidor.lotacoes', 'lotacao')
      .innerJoinAndSelect('lotacao.cargo', 'cargo')
      .where('servidor.id = :id', { id })
      .getOne();

    return servidor;
  }
}

export { ServidoresRepository };
