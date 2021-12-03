import { container } from 'tsyringe';

import { CdsFgsRepository } from '../repositories/implementations/CdsFgsRepository';
import { ICdsFgsRepository } from '../repositories/models/ICdsFgsRepository';

container.registerSingleton<ICdsFgsRepository>('CdsFgsRepository', CdsFgsRepository);
