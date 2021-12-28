import {
  FakeNiveisCargosRepository,
} from '../../repositories/fakes/FakeNiveisCargosRepository';
import { PaginateNivelCargoService } from './PaginateNivelCargoService';

let fakeNiveisCargosRepository: FakeNiveisCargosRepository;
let paginateNivelCargoService: PaginateNivelCargoService;

describe('ListNivelCargo', () => {
  beforeEach(() => {
    fakeNiveisCargosRepository = new FakeNiveisCargosRepository();
    paginateNivelCargoService = new PaginateNivelCargoService(fakeNiveisCargosRepository);
  });

  it('deve ser possível paginar nível de cargo', async () => {
    const nivelCargo1 = await fakeNiveisCargosRepository.create({
      codigo: 'nivelCargo1Codigo',
      descricao: 'nivelCargo1Descricao',
    });

    const nivelCargo2 = await fakeNiveisCargosRepository.create({
      codigo: 'nivelCargo2Codigo',
      descricao: 'nivelCargo2Descricao',
    });

    const page = await paginateNivelCargoService.execute({});

    expect(page.data).toEqual([nivelCargo1, nivelCargo2]);
  });
});
