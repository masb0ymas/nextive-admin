import _ from 'lodash'

const invalidValues = [
  null,
  undefined,
  '',
  false,
  0,
  'false',
  'FALSE',
  '0',
  'null',
  'undefined',
]

/**
 *
 * @param value
 */
function validateEmpty(value: any) {
  const emptyValues = [null, undefined, '', 'null', 'undefined']

  if (emptyValues.includes(value)) {
    return null
  }

  return value
}

/**
 *
 * @param value
 */
function validateBoolean(value: string | boolean | number | any) {
  if (invalidValues.includes(value)) {
    return false
  }

  return true
}

/**
 *
 * @param url
 * @returns
 */
function getUrlImage(url: string) {
  if (_.isEmpty(url)) {
    return '/static/images/no-image.jpeg'
  }

  return url
}

export { validateEmpty, validateBoolean, getUrlImage }
