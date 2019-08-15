// functions/index.ts
import { https } from 'firebase-functions';
import { readJSON } from 'fs-extra';
import { config } from 'firebase-functions';
import { apiServer } from './API';

const loadServer = async (): Promise<any> => {
  const manifest = await readJSON(`functions/parcel-manifest.json`);
  return import(`${__dirname}${manifest['server.tsx']}`);
};

export const ui = https.onRequest(async (req, res) => {
  const { uiServer } = await loadServer();
  return uiServer(
    req,
    res,
    ...Object.entries(config().ui).map(([a, b]) => ({
      [a.replace(/_(\D)/, (a, b) => b.toUpperCase())]: b
    }))
  );
});

export const api = https.onRequest(apiServer);
