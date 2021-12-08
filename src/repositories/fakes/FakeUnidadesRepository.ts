import { Unidade } from '../../entities/Unidade';
import { IPage } from '../models/IPage';

import {
  CreateUnidadeData, IUnidadesRepository, ListUnidadeData, PaginateUnidadeData,
} from '../models/IUnidadesRepository';

class FakeUnidadesRepository implements IUnidadesRepository {
  private unidades: Unidade[] = [];

  async create({ sigla, nome, unidadePaiId }: CreateUnidadeData): Promise<Unidade> {
    const unidade = new Unidade();

    Object.assign(unidade, {
      sigla,
      nome,
      unidadePaiId,
    });

    this.unidades.push(unidade);

    return unidade;
  }

  async update(unidade: Unidade): Promise<Unidade> {
    const index = this.unidades.findIndex((item) => item.id === unidade.id);

    this.unidades[index] = unidade;

    return unidade;
  }

  async destroy(id: string): Promise<void> {
    const index = this.unidades.findIndex((item) => item.id === id);

    this.unidades.splice(index, 1);
  }

  async list({ sigla, nome }: ListUnidadeData): Promise<Unidade[]> {
    let data = [...this.unidades];

    if (sigla || nome) {
      data = this.unidades.filter((item) => item.sigla.includes(sigla) || item.nome.includes(nome));
    }

    if (sigla && nome) {
      data = this.unidades.filter((item) => item.sigla.includes(sigla) && item.nome.includes(nome));
    }

    return data;
  }

  async paginate({
    sigla, nome, perPage, current,
  }: PaginateUnidadeData): Promise<IPage<Unidade>> {
    const skip = current * perPage - perPage;
    const take = skip + perPage;

    let data = [...this.unidades];

    if (sigla || nome) {
      data = data.filter((item) => item.sigla.includes(sigla) || item.nome.includes(nome));
    }

    if (sigla && nome) {
      data = data.filter((item) => item.sigla.includes(sigla) && item.nome.includes(nome));
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

  async findById(id: string): Promise<Unidade> {
    return this.unidades.find((item) => item.id === id);
  }

  async findByIdWithSubunidades(id: string): Promise<Unidade> {
    return this.unidades.find((item) => item.id === id);
  }
}

export { FakeUnidadesRepository };
