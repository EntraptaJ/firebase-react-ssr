// functions/server.tsx
import React from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import { Request, Response } from 'express';
import { readJSON } from 'fs-extra';
import { Source, AppState } from './type';
import { Capture, preloadAll } from 'react-loadable';
import 'isomorphic-unfetch';
import { renderAppHeadStream } from './Head';
import { renderScripts } from './Sources';
import { StaticRouter, StaticRouterContext } from 'react-router';
import { Config, ConfigProvider } from 'UI/Components/Providers/ConfigProvider';
import { initApollo } from 'UI/Utils/initApollo';
import { App } from 'UI/App';
import { renderToString } from 'react-dom/server';
import { ApolloProvider } from 'UI/Components/Providers/ApolloProvider';

export async function uiServer(req: Request, res: Response, config: Config): Promise<void> {
  res.write('<!doctype html>\n<html>');

  const manifestFile = `public/parcel-manifest.json`;
  const cssFile = `CSS.json`;
  const [parcelManifest, cssManifest] = await Promise.all([
    readJSON(manifestFile) as Promise<{ [key: string]: string }>,
    readJSON(cssFile) as Promise<{ [any: string]: string }>
  ]);

  const sources: Source[] = [
    { type: 'script', src: parcelManifest['client.tsx'] },
    { type: 'style', src: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' },
    { type: 'style', src: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
  ];

  const modules: string[] = [];

  await preloadAll();

  const client = initApollo({ baseUrl: config.baseUrl });

  const context: StaticRouterContext = {};

  const coreApp = (
    <ConfigProvider {...config}>
      <ApolloProvider client={client}>
          <App />
      </ApolloProvider>
    </ConfigProvider>
  );

  const MainApp = (
    <StaticRouter location={req.url} context={context}>
      {coreApp}
    </StaticRouter>
  );

  await getDataFromTree(<Capture report={moduleName => modules.push(moduleName)}>{MainApp}</Capture>);

  modules.map(moduleName =>
    Object.entries(parcelManifest)
      .filter(([a, b]) => a.replace('../node_modules/', '') === moduleName || cssManifest[moduleName] === b)
      .map(([, file]) => sources.push({ src: file, type: file.includes('.js') ? 'script' : 'style' }))
  );

  const headStream = renderAppHeadStream({ sources });

  const TopStream = headStream;

  TopStream.pipe(
    res,
    { end: false }
  );

  const appState: AppState = {
    PROPS: {},
    APOLLO_STATE: client.cache.extract(),
    CONFIG: config
  };

  const htmlEnd = `</div><script type="text/javascript">window.APP_STATE = ${JSON.stringify(appState)}</script>${renderScripts(
    sources
  )}`;
  TopStream.on('end', () => {
    res.write('<div id="app">');
    res.write(`${renderToString(MainApp)}`);
    res.write(htmlEnd);

    res.end(`</body></html>`);
  });
}
