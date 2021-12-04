import { container } from 'tsyringe';

import { CdsFgsRepository } from '../repositories/implementations/CdsFgsRepository';
import { CargosRepository } from '../repositories/implementations/CargosRepository';
import { ICdsFgsRepository } from '../repositories/models/ICdsFgsRepository';
import { ICargosRepository } from '../repositories/models/ICargosRepository';

container.registerSingleton<ICdsFgsRepository>('CdsFgsRepository', CdsFgsRepository);

container.registerSingleton<ICargosRepository>('CargosRepository', CargosRepository);
