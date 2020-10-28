export function getCookiesMap(cookiesString: string) {
  return cookiesString
    .split(';')
    .map((cookieString) => {
      return cookieString.trim().split('=')
    })
    .reduce((acc, curr) => {
      acc[curr[0]] = curr[1];
      return acc;
    }, {});
}
