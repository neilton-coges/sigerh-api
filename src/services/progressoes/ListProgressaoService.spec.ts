import { FakeProgressoesRepository } from '../../repositories/fakes/FakeProgressoesRepository';
import { ListProgressaoService } from './ListProgresssaoService';

let fakeProgressoesRepository: FakeProgressoesRepository;
let listProgressaoService: ListProgressaoService;

describe('ListProgressaoService', () => {
  beforeEach(() => {
    fakeProgressoesRepository = new FakeProgressoesRepository();
    listProgressaoService = new ListProgressaoService(
      fakeProgressoesRepository,
    );
  });

  it('deve ser possível listar progressoes', async () => {
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

    const list = await listProgressaoService.execute({});

    expect(list).toHaveLength(2);
    expect(list).toEqual([progressao1, progressao2]);
  });
});
