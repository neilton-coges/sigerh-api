import { Router } from 'express';

import { cdsFgsRoutes } from './cdsFgs.routes';
import { cargosRoutes } from './cargos.routes';
import { unidadesRoutes } from './unidades.routes';

const routes = Router();

routes.use('/cds_fgs', cdsFgsRoutes);
routes.use('/cargos', cargosRoutes);
routes.use('/unidades', unidadesRoutes);

export { routes };
