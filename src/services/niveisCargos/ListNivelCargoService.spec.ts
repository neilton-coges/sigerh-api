import {
  FakeNiveisCargosRepository,
} from '../../repositories/fakes/FakeNiveisCargosRepository';
import { ListNivelCargoService } from './ListNivelCargoService';

let fakeNiveisCargosRepository: FakeNiveisCargosRepository;
let listNivelCargoService: ListNivelCargoService;

describe('ListNivelCargo', () => {
  beforeEach(() => {
    fakeNiveisCargosRepository = new FakeNiveisCargosRepository();
    listNivelCargoService = new ListNivelCargoService(fakeNiveisCargosRepository);
  });

  it('deve ser possível listar nível de cargo', async () => {
    const nivelCargo1 = await fakeNiveisCargosRepository.create({
      codigo: 'nivelCargo1Codigo',
      descricao: 'nivelCargo1Descricao',
    });

    const nivelCargo2 = await fakeNiveisCargosRepository.create({
      codigo: 'nivelCargo2Codigo',
      descricao: 'nivelCargo2Descricao',
    });

    const list = await listNivelCargoService.execute({});

    expect(list).toEqual([nivelCargo1, nivelCargo2]);
  });
});
