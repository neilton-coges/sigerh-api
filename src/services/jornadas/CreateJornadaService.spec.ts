import { FakeJornadasRepository } from '../../repositories/fakes/FakeJornadasRepository';
import { CreateJornadaService } from './CreateJornadaService';

let fakeJornadasRepository: FakeJornadasRepository;
let createJornadaService: CreateJornadaService;

describe('CreateJornada', () => {
  beforeEach(() => {
    fakeJornadasRepository = new FakeJornadasRepository();
    createJornadaService = new CreateJornadaService(fakeJornadasRepository);
  });

  it('deve ser possível criar uma nova jornada', async () => {
    const jornada = await createJornadaService.execute({
      nome: 'nome',
      horas: [
        {
          horaInicio: '07:30:00',
          horaFim: '13:30:00',
        },
      ],
    });

    expect(jornada).toHaveProperty('id');
  });
});
