import { CdsFg } from '../../entities/CdsFg';
import {
  CreateCdsFgData, ListCdsFgData, ICdsFgsRepository, PaginateCdsFgData,
} from '../models/ICdsFgsRepository';
import { IPage } from '../models/IPage';

class FakeCdsFgsRepository implements ICdsFgsRepository {
  private cdsFgs: CdsFg[] = [];

  async create({
    tipo, simbologia, remuneracao, quantidadeVagas,
  }: CreateCdsFgData): Promise<CdsFg> {
    const cdsFg = new CdsFg();

    Object.assign(cdsFg, {
      tipo,
      simbologia,
      remuneracao,
      quantidadeVagas,
      quantidadeNomeados: 0,
    });

    this.cdsFgs.push(cdsFg);

    return cdsFg;
  }

  async update(cdsFg: CdsFg): Promise<CdsFg> {
    const index = this.cdsFgs.findIndex((item) => item.id === cdsFg.id);
    this.cdsFgs[index] = cdsFg;

    return cdsFg;
  }

  async destroy(id: string): Promise<void> {
    const index = this.cdsFgs.findIndex((item) => item.id === id);

    this.cdsFgs.splice(index, 1);
  }

  async findById(id: string): Promise<CdsFg> {
    return this.cdsFgs.find((item) => item.id === id);
  }

  async findBySimbologia(simbologia: string): Promise<CdsFg> {
    return this.cdsFgs.find((item) => item.simbologia === simbologia);
  }

  async list({ tipo, simbologia }: ListCdsFgData): Promise<CdsFg[]> {
    let data = [...this.cdsFgs];

    if (tipo || simbologia) {
      data = this.cdsFgs.filter(
        (item) => item.tipo.includes(tipo) || item.simbologia.includes(simbologia),
      );
    }

    if (tipo && simbologia) {
      data = this.cdsFgs.filter(
        (item) => item.tipo.includes(tipo) && item.simbologia.includes(simbologia),
      );
    }

    return data;
  }

  async paginate({
    tipo, simbologia, current, perPage,
  }: PaginateCdsFgData): Promise<IPage<CdsFg>> {
    const skip = current * perPage - perPage;
    const take = skip + perPage;

    let data = [...this.cdsFgs];

    if (tipo) {
      data = data.filter((item) => item.tipo === tipo);
    }

    if (simbologia) {
      data = data.filter((item) => item.simbologia.includes(simbologia));
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
