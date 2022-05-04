import { Nomeacao } from '../../entities/Nomeacao';
import { CreateNomeacaoData, INomeacoesRepository, PaginateNomeacaoData } from '../models/INomeacoesRepository';
import { IPage } from '../models/IPage';

class FakeNomeacoesRepository implements INomeacoesRepository {
  private nomeacoes: Nomeacao[] = [];

  async create({
    tipo, cargoId, cdsFgId, unidadeId, servidorId, data, diofProcesso, observacao,
  }: CreateNomeacaoData): Promise<Nomeacao> {
    const nomeacao = new Nomeacao();

    Object.assign(nomeacao, {
      tipo,
      cargoId,
      cdsFgId,
      unidadeId,
      servidorId,
      data,
      diofProcesso,
      observacao,
    });

    this.nomeacoes.push(nomeacao);

    return nomeacao;
  }

  async findById(id: string): Promise<Nomeacao> {
    return this.nomeacoes.find((item) => item.id === id);
  }

  async paginate({
    tipo, nomeServidor, current, perPage,
  }: PaginateNomeacaoData): Promise<IPage<Nomeacao>> {
    const skip = current * perPage - perPage;
    const take = skip + perPage;

    let data = [...this.nomeacoes];

    if (tipo || nomeServidor) {
      data = data.filter(
        (item) => item.tipo.toString().includes(tipo) || item.servidor.nome.includes(nomeServidor),
      );
    }

    if (tipo && nomeServidor) {
      data = data.filter(
        (item) => item.tipo.toString().includes(tipo) && item.servidor.nome.includes(nomeServidor),
      );
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
}

export { FakeNomeacoesRepository };
