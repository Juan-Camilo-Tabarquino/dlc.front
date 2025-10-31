import { get, isPlainObject, isString } from 'lodash';

const PARAM_REGEX = /\$\{(.+?)\}/;

/**
 * Reemplaza variables `${param}` en un string con los valores de un objeto.
 *
 * @param {string} url
 * @param {Object} paramsObj
 * @returns {string}
 */
export const template = (url: string, paramsObj: unknown): string => {
  if (isString(url) && url.length > 0 && isPlainObject(paramsObj)) {
    const match = url.match(PARAM_REGEX);

    if (match) {
      const [matchRegex, matchValue] = match;
      const replaceValue = get(paramsObj, matchValue, '') as string;

      const newUrl = url.replace(matchRegex, replaceValue || '');
      return template(newUrl, paramsObj); // recursion para múltiples params
    }
  }

  return url;
};
