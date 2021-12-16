import { Router } from 'express';

import { cdsFgsRoutes } from './cdsFgs.routes';
import { cargosRoutes } from './cargos.routes';
import { unidadesRoutes } from './unidades.routes';
import { jornadasRoutes } from './jornadas.routes';
import { servidoresRoutes } from './servidores.routes';

const routes = Router();

routes.use('/cds_fgs', cdsFgsRoutes);
routes.use('/cargos', cargosRoutes);
routes.use('/unidades', unidadesRoutes);
routes.use('/jornadas', jornadasRoutes);
routes.use('/servidores', servidoresRoutes);

export { routes };
