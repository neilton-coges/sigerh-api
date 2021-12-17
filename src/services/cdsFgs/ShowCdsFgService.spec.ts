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
      simbologia: 'cdsFgSimbologia',
      remuneracao: 4000,
      quantidadeVagas: 10,
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
