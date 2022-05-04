import { FakeProgressoesRepository } from '../../repositories/fakes/FakeProgressoesRepository';
import { PaginateProgressaoService } from './PaginateProgressaoService';

let fakeProgressoesRepository: FakeProgressoesRepository;
let paginateProgressaoService: PaginateProgressaoService;

describe('PaginateProgressaoService', () => {
  beforeEach(() => {
    fakeProgressoesRepository = new FakeProgressoesRepository();
    paginateProgressaoService = new PaginateProgressaoService(
      fakeProgressoesRepository,
    );
  });

  it('deve ser possível paginar nomeação', async () => {
    const progressao1 = await fakeProgressoesRepository.create({
      cargoId: 'progressao1CargoId',
      classeNivelCargoId: 'progressao1ClasseNivelCargoId',
      padraoClasseNivelCargoId: 'progressao1PadraoClasseNivelCargoId',
      lotacaoId: 'progressao1LotacaoId',
      servidorId: 'progressao1ServidorId',
      dataProgressao: new Date(),
      observacao: 'progressao1Observacao',
      processo: 'progressao1Processo',
    });

    const progressao2 = await fakeProgressoesRepository.create({
      cargoId: 'progressao2CargoId',
      classeNivelCargoId: 'progressao2ClasseNivelCargoId',
      padraoClasseNivelCargoId: 'progressao2PadraoClasseNivelCargoId',
      lotacaoId: 'progressao2LotacaoId',
      servidorId: 'progressao2ServidorId',
      dataProgressao: new Date(),
      observacao: 'progressao2Observacao',
      processo: 'progressao2Processo',
    });

    const page = await paginateProgressaoService.execute({});

    expect(page.data).toEqual([progressao1, progressao2]);
    expect(page.size).toBe(2);
    expect(page.total).toBe(1);
  });
});
