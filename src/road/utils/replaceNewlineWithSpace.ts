export function replaceNewlineWithSpace(obj: any): any {
  if (typeof obj === 'string') {
    return obj.replace(/\n/g, ' ')
  } else if (typeof obj === 'object' && obj !== null) {
    const newObj: any = Array.isArray(obj) ? [] : {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        newObj[key] = replaceNewlineWithSpace(obj[key])
      }
    }
    return newObj
  }

  return obj
}
