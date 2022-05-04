import { AppError } from '../../error/AppError';
import { FakeProgressoesRepository } from '../../repositories/fakes/FakeProgressoesRepository';
import { ShowProgressaoService } from './ShowProgressaoService';

let fakeProgressoesRepository: FakeProgressoesRepository;
let showProgressaoService: ShowProgressaoService;

describe('ShowProgressaoService', () => {
  beforeEach(() => {
    fakeProgressoesRepository = new FakeProgressoesRepository();
    showProgressaoService = new ShowProgressaoService(
      fakeProgressoesRepository,
    );
  });

  it('deve ser possível mostrar uma progressão', async () => {
    const progressaoCreated = await fakeProgressoesRepository.create({
      cargoId: 'cargoId',
      classeNivelCargoId: 'classeNivelCargoId',
      padraoClasseNivelCargoId: 'padraoClasseNivelCargoId',
      servidorId: 'servidorId',
      lotacaoId: 'lotacaoId',
      processo: 'processo',
      observacao: 'observacao',
      dataProgressao: new Date(),
    });

    const progressao = await showProgressaoService.execute(progressaoCreated.id);

    expect(progressao).toEqual(progressaoCreated);
  });

  it('não deve ser possível mostrar uma progressão inexistente', async () => {
    await expect(
      showProgressaoService.execute('inexistente'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
