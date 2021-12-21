import { container } from 'tsyringe';

import { CdsFgsRepository } from '../repositories/implementations/CdsFgsRepository';
import { CargosRepository } from '../repositories/implementations/CargosRepository';
import { ICdsFgsRepository } from '../repositories/models/ICdsFgsRepository';
import { ICargosRepository } from '../repositories/models/ICargosRepository';
import { IUnidadesRepository } from '../repositories/models/IUnidadesRepository';
import { UnidadesRepository } from '../repositories/implementations/UnidadesRepository';
import { IJornadasRepository } from '../repositories/models/IJornadasRepository';
import { JornadasRepository } from '../repositories/implementations/JornadasRepository';
import { IServidoresRepository } from '../repositories/models/IServidoresRepository';
import { ServidoresRepository } from '../repositories/implementations/ServidoresRepository';
import { ILotacoesRepository } from '../repositories/models/ILotacoesRepository';
import { LotacoesRepository } from '../repositories/implementations/LotacoesRepository';
import { NomeacoesRepository } from '../repositories/implementations/NomeacoesRepository';
import { INomeacoesRepository } from '../repositories/models/INomeacoesRepository';

container.registerSingleton<ICdsFgsRepository>('CdsFgsRepository', CdsFgsRepository);
container.registerSingleton<ICargosRepository>('CargosRepository', CargosRepository);
container.registerSingleton<IUnidadesRepository>('UnidadesRepository', UnidadesRepository);
container.registerSingleton<IJornadasRepository>('JornadasRepository', JornadasRepository);
container.registerSingleton<IServidoresRepository>('ServidoresRepository', ServidoresRepository);
container.registerSingleton<ILotacoesRepository>('LotacoesRepository', LotacoesRepository);
container.registerSingleton<INomeacoesRepository>('NomeacoesRepository', NomeacoesRepository);
