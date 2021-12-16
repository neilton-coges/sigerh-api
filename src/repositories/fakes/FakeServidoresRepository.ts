import { Servidor } from '../../entities/Servidor';
import { IPage } from '../models/IPage';
import {
  CreateServidorData, IServidoresRepository, ListServidorData, PaginateServidorData,
} from '../models/IServidoresRepository';

class FakeServidoresRepository implements IServidoresRepository {
  private servidores: Servidor[] = [];

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
    conjugeNome,
    conjugeCpf,
    conjugeDataNascimento,
    estadoCivil,
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
    const servidor = new Servidor();

    Object.assign(servidor, {
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
      conjugeNome,
      conjugeCpf,
      conjugeDataNascimento,
      estadoCivil,
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

    this.servidores.push(servidor);

    return servidor;
  }

  async update(servidor: Servidor): Promise<Servidor> {
    const index = this.servidores.findIndex((item) => item.id === servidor.id);

    this.servidores[index] = servidor;

    return servidor;
  }

  async destroy(id: string): Promise<void> {
    const index = this.servidores.findIndex((item) => item.id === id);

    this.servidores.splice(index, 1);
  }

  async list({ cpf, nome }: ListServidorData): Promise<Servidor[]> {
    let data = [...this.servidores];

    if (cpf || nome) {
      data = this.servidores.filter((item) => item.cpf.includes(cpf) || item.nome.includes(nome));
    }

    if (cpf && nome) {
      data = this.servidores.filter((item) => item.cpf.includes(cpf) && item.nome.includes(nome));
    }

    return data;
  }

  async paginate({
    cpf, nome, perPage, current,
  }: PaginateServidorData): Promise<IPage<Servidor>> {
    const skip = current * perPage - perPage;
    const take = skip + perPage;

    let data = [...this.servidores];

    if (cpf || nome) {
      data = data.filter((item) => item.cpf.includes(cpf) || item.nome.includes(nome));
    }

    if (cpf && nome) {
      data = data.filter((item) => item.cpf.includes(cpf) && item.nome.includes(nome));
    }

    const size = data.length;
    const total = Math.ceil(size / perPage);

    data = data.slice(skip, take);

    return {
      data,
      perPage,
      current,
      size,
      total,
    };
  }

  async findById(id: string): Promise<Servidor> {
    return this.servidores.find((item) => item.id === id);
  }

  async findByCpf(cpf: string): Promise<Servidor> {
    return this.servidores.find((item) => item.cpf === cpf);
  }

  async findByEmail(email: string): Promise<Servidor> {
    return this.servidores.find(
      (item) => item.emailCorporativo.toLocaleLowerCase() === email.toLocaleLowerCase()
       || item.emailPessoal.toLocaleLowerCase() === email.toLocaleLowerCase(),
    );
  }
}

export { FakeServidoresRepository };
