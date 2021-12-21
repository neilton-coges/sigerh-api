import { FakeLotacoesRepository } from '../../repositories/fakes/FakeLotacoesRepository';
import { ListServidorLotacaoService } from './ListServidorLotacaoService';

let fakeLotacoesRepository: FakeLotacoesRepository;
let listServidorLotacaoService: ListServidorLotacaoService;

describe('ListLotacao', () => {
  beforeEach(() => {
    fakeLotacoesRepository = new FakeLotacoesRepository();
    listServidorLotacaoService = new ListServidorLotacaoService(fakeLotacoesRepository);
  });

  it('deve ser possível listar lotações de um determinado servidor', async () => {
    const lotacao1 = await fakeLotacoesRepository.create({
      cargoId: 'lotacao1CargoId',
      cdsFgId: 'lotacao1CdsFgId',
      unidadeId: 'lotacao1UnidadeId',
      servidorId: 'servidorId',
    });

    const lotacao2 = await fakeLotacoesRepository.create({
      cargoId: 'lotacao2CargoId',
      cdsFgId: 'lotacao2CdsFgId',
      unidadeId: 'lotacao2UnidadeId',
      servidorId: 'servidorId',
    });

    const lotacoes = await listServidorLotacaoService.execute('servidorId');

    expect(lotacoes).toEqual([lotacao1, lotacao2]);
  });
});
