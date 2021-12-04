import { Router } from 'express';

import { cdsFgsRoutes } from './cdsFgs.routes';
import { cargosRoutes } from './cargos.routes';

const routes = Router();

routes.use('/cds_fgs', cdsFgsRoutes);
routes.use('/cargos', cargosRoutes);

export { routes };
