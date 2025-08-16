import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from 'react-router';
import { metaTemplates } from './shared/config/meta-templates';
import { userContext } from './shared/server/context';
import {
  globalStorageMiddleware,
  sessionMiddleware,
} from './shared/server/auth';
import TanstackQueryProvider from './shared/providers/TanstackQueryProvider';
import './styles/app.css';

import type { Route } from './+types/root';
import Navbar from './shared/components/common/Navbar';
import { Toaster } from './shared/components/ui/Toaster';
import ModalProvider from './shared/providers/ModalProvider';
import Footer from '@/shared/components/common/Footer';

export const unstable_middleware = [sessionMiddleware, globalStorageMiddleware];

if (import.meta.env.DEV && typeof window !== 'undefined') {
  import('./mocks/browser').then(({ worker }) => worker.start());
}

export const meta = () => {
  return metaTemplates.root();
};

export const links: Route.LinksFunction = () => [
  {
    rel: 'stylesheet',
    as: 'style',
    crossOrigin: 'anonymous',
    href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script></script>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export async function loader({ context }: Route.LoaderArgs) {
  const user = context.get(userContext);
  return { user };
}

export default function App() {
  const path = useLocation().pathname.slice(1);
  return (
    <TanstackQueryProvider>
      <div className="bg-white whitespace-pre-wrap text-black">
        <Navbar />
        <Outlet />
        <Toaster />
        <ModalProvider />

        {path !== 'login' && <Footer />}
      </div>
    </TanstackQueryProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
