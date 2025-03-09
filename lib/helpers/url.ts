
export function isAbsoluteUrl(url: string) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

export function combineURLs(baseURL: string, requestURL: string) {
  return requestURL
    ? baseURL.replace(/\/?\/$/, '') + '/' + requestURL.replace(/^\/+/, '')
    : baseURL;
}

export function buildFullPath(baseURL: string | undefined, requestURL: string) {
  if (baseURL && !isAbsoluteUrl(requestURL)) {
    return combineURLs(baseURL, requestURL);
  }
  return requestURL
}

export function buildFullURL(url: string) {
  return url
}
