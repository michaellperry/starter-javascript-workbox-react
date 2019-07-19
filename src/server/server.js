import 'babel-polyfill';
import * as express from 'express';
import * as http from 'http';
import 'source-map-support/register';
import {configureRoutes} from './routes';

const app = express();
const server = http.createServer(app);

app.set('port', process.env.PORT || 8080);

configureRoutes(app);

server.listen(app.get('port'), () => {
  console.log(`  App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
  console.log('  Press CTRL-C to stop\n');
});
