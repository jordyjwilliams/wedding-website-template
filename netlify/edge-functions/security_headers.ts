// @ts-expect-error cannot find module in Node type-checking
import type { Config, Context } from 'netlify:edge';

const REQUIRED_CSP_DIRECTIVES: Record<string, string> = {
  'object-src': "'none'",
  'base-uri': "'self'",
  'frame-ancestors': "'none'",
  'form-action': "'self'",
};

const REQUIRED_SCRIPT_SRC_TOKENS = ["'wasm-unsafe-eval'"];

function mergeCspDirectives(cspValue: string): string {
  const directives = cspValue
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean);

  const directiveMap = new Map<string, string>();
  for (const directive of directives) {
    const [name] = directive.split(/\s+/, 1);
    if (name) {
      directiveMap.set(name, directive);
    }
  }

  for (const [name, value] of Object.entries(REQUIRED_CSP_DIRECTIVES)) {
    if (!directiveMap.has(name)) {
      directiveMap.set(name, `${name} ${value}`);
    }
  }

  const scriptSrc = directiveMap.get('script-src');
  if (scriptSrc) {
    const tokens = scriptSrc.split(/\s+/).filter(Boolean);
    for (const requiredToken of REQUIRED_SCRIPT_SRC_TOKENS) {
      if (!tokens.includes(requiredToken)) {
        tokens.push(requiredToken);
      }
    }
    directiveMap.set('script-src', tokens.join(' '));
  }

  return Array.from(directiveMap.values()).join('; ');
}

export default async (_request: Request, context: Context) => {
  const response = await context.next();

  const csp = response.headers.get('content-security-policy');
  if (csp) {
    response.headers.set('content-security-policy', mergeCspDirectives(csp));
  }

  response.headers.set('x-frame-options', 'DENY');
  response.headers.set('referrer-policy', 'strict-origin-when-cross-origin');
  response.headers.set('permissions-policy', 'geolocation=(), microphone=(), camera=()');
  response.headers.set('x-content-type-options', 'nosniff');

  if (!response.headers.get('content-security-policy-report-only')) {
    response.headers.set(
      'content-security-policy-report-only',
      "require-trusted-types-for 'script'"
    );
  }

  return response;
};

export const config: Config = {
  path: '/*',
};
