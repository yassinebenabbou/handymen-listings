import { environment as env } from '../../environments/environment';

export function apiUrl(key, ...params) {
  return env.api[key] ? env.apiUrl + env.api[key](params) : env.apiUrl;
}
