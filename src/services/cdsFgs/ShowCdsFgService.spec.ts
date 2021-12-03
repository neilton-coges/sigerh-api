import { AppError } from '../../error/AppError';
import { FakeCdsFgsRepository } from '../../repositories/fakes/FakeCdsFgsRepository';
import { ShowCdsFgService } from './ShowCdsFgService';

let fakeCdsFgsRepository: FakeCdsFgsRepository;
let showCdsFgService: ShowCdsFgService;

describe('ShowCdsFg', () => {
  beforeEach(() => {
    fakeCdsFgsRepository = new FakeCdsFgsRepository();
    showCdsFgService = new ShowCdsFgService(fakeCdsFgsRepository);
  });

  it('deve ser possivel mostrar um CDS/FG', async () => {
    const { id } = await fakeCdsFgsRepository.create({
      tipo: 'CDS',
      sigla: 'sigla',
      nome: 'nome',
      valor: 4000,
      qtdVagas: 10,
    });

    const cdsFg = await showCdsFgService.execute(id);

    expect(cdsFg.id).toBe(id);
  });

  it('não deve ser possivel mostrar um CDS/FG inexistente', async () => {
    await expect(
      showCdsFgService.execute('inexistente'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
