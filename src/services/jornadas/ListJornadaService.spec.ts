import { FakeJornadasRepository } from '../../repositories/fakes/FakeJornadasRepository';
import { ListJornadaService } from './ListJornadaService';

let fakeJornadasRepository: FakeJornadasRepository;
let listJornadaService: ListJornadaService;

describe('ListJornada', () => {
  beforeEach(() => {
    fakeJornadasRepository = new FakeJornadasRepository();
    listJornadaService = new ListJornadaService(fakeJornadasRepository);
  });

  it('deve ser possível listar jornadas', async () => {
    const jornada1 = await fakeJornadasRepository.create({
      nome: 'jornada1',
      horas: [
        { horaInicio: '07:00:00', horaFim: '12:00:00' },
        { horaInicio: '14:00:00', horaFim: ':1800:00' },
      ],
    });

    const jornada2 = await fakeJornadasRepository.create({
      nome: 'jornada2',
      horas: [
        { horaInicio: '07:00:00', horaFim: '12:00:00' },
        { horaInicio: '13:00:00', horaFim: '17:00:00' },
      ],
    });

    const jornadas = await listJornadaService.execute();

    expect(jornadas).toHaveLength(2);
    expect(jornadas).toEqual(expect.arrayContaining([jornada1, jornada2]));
  });
});
