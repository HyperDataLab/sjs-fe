export class ScholarlySourceError extends Error {
  constructor({ source, statusCode = 502, code = 'UPSTREAM_SOURCE_ERROR', message = 'A scholarly data source could not complete the request.', upstreamStatus = null, retryAfter = null }) {
    super(message);
    this.name = 'ScholarlySourceError';
    this.source = source;
    this.statusCode = statusCode;
    this.code = code;
    this.upstreamStatus = upstreamStatus;
    this.retryAfter = retryAfter;
  }
}
