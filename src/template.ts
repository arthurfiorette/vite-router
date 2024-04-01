export function buildFile(router: string, routes: string[], imports: string[], layoutImports: string[]) {
  return `
// @ts-nocheck
// eslint-disable 
// prettier-ignore

// Generated by Vite Router
// https://www.npmjs.com/package/vite-plugin-router
// https://github.com/felipe-bergamaschi/vite-router

import { lazy, Suspense } from 'react';
import { ${router}, Route, Routes } from 'react-router-dom';
import type { RouteProps } from 'vite-plugin-router';

${imports.join('\n').trim()}
${layoutImports.join('\n').trim()}

/**
 * Generated by Vite Router
 *
 * @link https://www.npmjs.com/package/vite-plugin-router
 * @link https://github.com/felipe-bergamaschi/vite-router
 */
export function AppRoutes(props: RouteProps) {
  return (
    <${router}>
      <Suspense fallback={props.loadingPage || <div>Loading...</div>}>
        <Routes>

${routes.join('\n').trim()}

          <Route
            path="*"
            element={props.notFoundPage || <div>404</div>}
          />
        </Routes>
      </Suspense> 
    </${router}>
  );
}

`.trim();
}

export function buildComponent(
  name: string,
  properties?: Record<string, string | undefined>,
  ...child: string[]
) {
  const props =
    properties &&
    Object.entries(properties)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => `${key}={${value}}`)
      .join(' ');

  return `

<${name}${props ? ' ' + props : ''}>${child.join('\n')}</${name}>

`.trim();
}

export function buildLazyImport(name: string, path: string) {
  return `

const ${name} = lazy(() => import('${path}'));

`.trim();
}
