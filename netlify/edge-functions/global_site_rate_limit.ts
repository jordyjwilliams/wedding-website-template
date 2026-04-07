declare const Deno: {
  env: {
    get(name: string): string | undefined;
  };
};

const IS_DEBUG_MODE = Deno.env.get('VITE_DEBUG_MODE') === 'true';
const GLOBAL_SITE_RATE_LIMIT = IS_DEBUG_MODE ? 40 : 180;
const GLOBAL_SITE_RATE_WINDOW_SECONDS = 60;

export default async (_request: Request, context: { next: () => Promise<Response> | Response }) => {
  return context.next();
};

export const config = {
  path: '/*',
  rateLimit: {
    windowLimit: GLOBAL_SITE_RATE_LIMIT,
    windowSize: GLOBAL_SITE_RATE_WINDOW_SECONDS,
    aggregateBy: ['ip', 'domain'],
  },
};
