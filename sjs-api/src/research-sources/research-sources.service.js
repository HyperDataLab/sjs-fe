import { ScholarlySourceError } from './scholarly-source.errors.js';
import { createCrossrefProvider } from './providers/crossref.provider.js';
import { createOpenAlexProvider } from './providers/openalex.provider.js';

export function createResearchSourceService({ env = {}, fetchImpl = globalThis.fetch } = {}) {
  const providers = new Map([
    ['openalex', createOpenAlexProvider({
      apiKey: env.OPENALEX_API_KEY,
      baseUrl: env.OPENALEX_BASE_URL,
      email: env.OPENALEX_EMAIL,
      timeout: env.OPENALEX_TIMEOUT,
      fetchImpl,
    })],
    ['crossref', createCrossrefProvider({ mailto: env.CROSSREF_MAILTO, fetchImpl })],
  ]);

  return {
    supports(source) {
      return providers.has(source);
    },
    async searchWorks({ source, query, limit = 25, cursor }) {
      const provider = providers.get(source);
      if (!provider) {
        throw new ScholarlySourceError({ source, statusCode: 400, code: 'UNSUPPORTED_SOURCE', message: 'The requested scholarly data source is not supported.' });
      }
      return provider.searchWorks({ query: query.trim(), limit, cursor });
    },
  };
}
