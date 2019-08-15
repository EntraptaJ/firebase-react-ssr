// UI/server/Head.tsx
import React from 'react';
import { renderToString, renderToNodeStream } from 'react-dom/server';
import { Source } from './type';

const AppCSS = `
#app {
  display: flex;
  flex-direction: column;
}
html, body, #app {
  margin: 0;
  height: 100%;
  width: 100%;
}`;

interface AppHeadProps {
  sources: Source[];
}

const AppName = 'AppName'

export function AppHead({ sources }: AppHeadProps): React.ReactElement {
  return (
    <head>
      <link rel='manifest' href='/manifest.webmanifest' />
      <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
      <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#2196f3' />
      <meta name='apple-mobile-web-app-title' content={AppName} />
      <meta name='application-name' content={AppName} />
      <meta name='msapplication-TileColor' content='#da532c' />
      <meta name='theme-color' content='#2196f3' />
      <meta charSet='UTF-8' />
      <title>{AppName}</title>
      <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' name='viewport' />
      {sources && sources.map(({ src, type }, index) => <link rel='preload' href={src} as={type} key={index} />)}
      {sources &&
        sources
          .filter(({ type }) => type === 'style')
          .map(({ src }, index) => <link rel='stylesheet' type='text/css' href={src} key={index} />)}
      <style>{AppCSS}</style>
    </head>
  );
}

export function renderAppHeadStream(props: AppHeadProps): NodeJS.ReadableStream {
  return renderToNodeStream(<AppHead {...props} />);
}

export function renderAppHead(props: AppHeadProps): string {
  return renderToString(<AppHead {...props} />);
}
