import { AppError } from '../../error/AppError';
import { FakeJornadasRepository } from '../../repositories/fakes/FakeJornadasRepository';
import { ShowJornadaService } from './ShowJornadaService';

let fakeJornadasRepository: FakeJornadasRepository;
let showJornadaService: ShowJornadaService;

describe('ShowJornada', () => {
  beforeEach(() => {
    fakeJornadasRepository = new FakeJornadasRepository();
    showJornadaService = new ShowJornadaService(fakeJornadasRepository);
  });

  it('deve ser possível mostrar uma jornada', async () => {
    const { id } = await fakeJornadasRepository.create({
      descricao: 'descricao',
      horas: [
        { horaInicio: '07:00:00', horaFim: '12:00:00' },
      ],
    });

    const jornada = await showJornadaService.execute(id);

    expect(jornada.descricao).toBe('descricao');
    expect(jornada.horas).toContainEqual({ horaInicio: '07:00:00', horaFim: '12:00:00' });
  });

  it('não deve ser possível mostrar uma jornada inexistente', async () => {
    await expect(
      showJornadaService.execute('inexistente'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
