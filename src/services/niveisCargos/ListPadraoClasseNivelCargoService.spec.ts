import {
  FakePadroesClassesNiveisCargosRepository,
} from '../../repositories/fakes/FakePadroesClassesNiveisCargosRepository';
import {
  ListPadraoClasseNivelCargoService,
} from './ListPadraoClasseNivelCargoService';

let fakePadroesClassesNiveisCargosRepository: FakePadroesClassesNiveisCargosRepository;
let listPadraoClasseNivelCargoService: ListPadraoClasseNivelCargoService;

describe('ListPadraoClasseNivelCargo', () => {
  beforeEach(() => {
    fakePadroesClassesNiveisCargosRepository = new FakePadroesClassesNiveisCargosRepository();
    listPadraoClasseNivelCargoService = new ListPadraoClasseNivelCargoService(
      fakePadroesClassesNiveisCargosRepository,
    );
  });

  it('deve ser possível listar padrões de uma classe', async () => {
    const padraoNivelClasse1 = await fakePadroesClassesNiveisCargosRepository.create({
      codigo: 'padraoNivelClasse1Codigo',
      descricao: 'padraoNivelClasse1Descricao',
      valor: 4000,
      classeNivelCargoId: 'classeNivelCargoId',
    });

    const padraoNivelClasse2 = await fakePadroesClassesNiveisCargosRepository.create({
      codigo: 'padraoNivelClasse2Codigo',
      descricao: 'padraoNivelClasse2Descricao',
      valor: 3000,
      classeNivelCargoId: 'classeNivelCargoId',
    });

    const list = await listPadraoClasseNivelCargoService.execute('classeNivelCargoId');

    expect(list).toEqual([padraoNivelClasse1, padraoNivelClasse2]);
  });
});
