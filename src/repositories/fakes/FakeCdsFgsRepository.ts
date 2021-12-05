import { CdsFg } from '../../entities/CdsFg';
import {
  CreateCdsFgData, ListCdsFgData, ICdsFgsRepository, PaginateCdsFgData,
} from '../models/ICdsFgsRepository';
import { IPage } from '../models/IPage';

class FakeCdsFgsRepository implements ICdsFgsRepository {
  private cdsFgs: CdsFg[] = [];

  async create({
    tipo, sigla, nome, valor, qtdVagas,
  }: CreateCdsFgData): Promise<CdsFg> {
    const cdsFg = new CdsFg();

    Object.assign(cdsFg, {
      tipo,
      sigla,
      nome,
      valor,
      qtdVagas,
      qtdNomeados: 0,
    });

    this.cdsFgs.push(cdsFg);

    return cdsFg;
  }

  async update(cdsFg: CdsFg): Promise<CdsFg> {
    const index = this.cdsFgs.findIndex((item) => item.id === cdsFg.id);
    this.cdsFgs[index] = cdsFg;

    return cdsFg;
  }

  async findById(id: string): Promise<CdsFg> {
    return this.cdsFgs.find((item) => item.id === id);
  }

  async findBySigla(sigla: string): Promise<CdsFg> {
    return this.cdsFgs.find((item) => item.sigla === sigla);
  }

  async list({ nome, sigla, tipo }: ListCdsFgData): Promise<CdsFg[]> {
    let { cdsFgs } = this;

    if (tipo) {
      cdsFgs = cdsFgs.filter((item) => item.tipo === tipo);
    }

    if (sigla) {
      cdsFgs = cdsFgs.filter((item) => item.sigla.includes(sigla));
    }

    if (nome) {
      cdsFgs = cdsFgs.filter((item) => item.nome.includes(nome));
    }

    return cdsFgs;
  }

  async paginate({
    tipo, sigla, nome, current, perPage,
  }: PaginateCdsFgData): Promise<IPage<CdsFg>> {
    const skip = current * perPage - perPage;
    const take = skip + perPage;

    let data = [...this.cdsFgs];

    if (tipo) {
      data = data.filter((item) => item.tipo === tipo);
    }

    if (sigla) {
      data = data.filter((item) => item.sigla.includes(sigla));
    }

    if (nome) {
      data = data.filter((item) => item.nome.includes(nome));
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

export { FakeCdsFgsRepository };
