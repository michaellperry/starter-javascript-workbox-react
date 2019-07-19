import * as express from 'express';
import * as path from 'path';
import {manifest} from './manifest';
import {renderImage} from './images';

export function configureRoutes(app) {
  app.use((req, res, next) => {
    // Ensure the page is secure, or that we are running a development build
    if ( req.headers['x-forwarded-proto'] === 'https'
      || req.headers['x-arr-ssl']
      || process.env.NODE_ENV === 'development') {
      next();
    } else {
      res.redirect(`https://${req.hostname}${req.url}`);
    }
  });

  app.get('/manifest.json', (req, res) => {
    res
        .header('Content-Type', 'application/json')
        .send(JSON.stringify(manifest));
  });

  app.get(/^\/(index.html)?$/, (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
  });

  app.get('/images/logo.png', (req, res) => {
    const imageFileName = './images/logo.png';
    renderImage(req, res, imageFileName);
  });

  app.use('/scripts', express.static(path.join(__dirname, 'scripts')));

  app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.join(__dirname, './scripts/service-worker.js'));
  });
}
