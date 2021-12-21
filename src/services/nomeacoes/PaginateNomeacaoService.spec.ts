import { TipoNomeacao } from '../../entities/Nomeacao';
import { FakeNomeacoesRepository } from '../../repositories/fakes/FakeNomeacoesRepository';
import { PaginateNomeacaoService } from './PaginateNomeacaoService';

let fakeNomeacoesRepository: FakeNomeacoesRepository;
let paginateNomeacaoService: PaginateNomeacaoService;

describe('PaginateNomeacao', () => {
  beforeEach(() => {
    fakeNomeacoesRepository = new FakeNomeacoesRepository();
    paginateNomeacaoService = new PaginateNomeacaoService(fakeNomeacoesRepository);
  });

  it('deve ser possível paginar nomeação', async () => {
    const nomeacao1 = await fakeNomeacoesRepository.create({
      tipo: TipoNomeacao.NOMEACAO,
      cargoId: 'nomeacao1CargoId',
      cdsFgId: 'nomeacao1CdsFgId',
      servidorId: 'nomeacao1ServidorId',
      unidadeId: 'nomeacao1UnidadeId',
      data: new Date(),
      diofProcesso: 'nomeacao1DiofProcesso',
      observacao: 'nomeacao1Observacao',
    });

    const nomeacao2 = await fakeNomeacoesRepository.create({
      tipo: TipoNomeacao.NOMEACAO,
      cargoId: 'nomeacao2CargoId',
      cdsFgId: 'nomeacao2CdsFgId',
      servidorId: 'nomeacao2ServidorId',
      unidadeId: 'nomeacao2UnidadeId',
      data: new Date(),
      diofProcesso: 'nomeacao2DiofProcesso',
      observacao: 'nomeacao2Observacao',
    });

    const page = await paginateNomeacaoService.execute({});

    expect(page.data).toEqual([nomeacao1, nomeacao2]);
  });
});
