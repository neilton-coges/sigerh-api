import {
  FakeClassesNiveisCargosRepository,
} from '../../repositories/fakes/FakeClassesNiveisCargosRepository';
import { ListClasseNivelCargoService } from './ListClasseNivelCargoService';

let fakeClassesNiveisCargosRepository: FakeClassesNiveisCargosRepository;
let listClasseNivelCargoService: ListClasseNivelCargoService;

describe('ListClasseNivelCargo', () => {
  beforeEach(() => {
    fakeClassesNiveisCargosRepository = new FakeClassesNiveisCargosRepository();
    listClasseNivelCargoService = new ListClasseNivelCargoService(
      fakeClassesNiveisCargosRepository,
    );
  });

  it('deve ser possível listar todas as classes de um nível de cargo', async () => {
    const classeNivelCargo1 = await fakeClassesNiveisCargosRepository.create({
      codigo: 'classeNivelCargo1Codigo',
      descricao: 'classeNivelCargo1Descricao',
      nivelCargoId: 'nivelCargoId',
    });

    const classeNivelCargo2 = await fakeClassesNiveisCargosRepository.create({
      codigo: 'classeNivelCargo2Codigo',
      descricao: 'classeNivelCargo2Descricao',
      nivelCargoId: 'nivelCargoId',
    });

    const list = await listClasseNivelCargoService.execute('nivelCargoId');

    expect(list).toEqual([classeNivelCargo1, classeNivelCargo2]);
  });
});
