const isNullOrUndefined = (variable) => (
  !(
    typeof variable !== 'undefined'
    && variable !== null
  )
);

const isValidStringInput = (variable) => (
  !isNullOrUndefined(variable)
  && typeof variable === 'string'
  && variable.trim()
);

export {
  isNullOrUndefined,
  isValidStringInput,
}

export default {
  isNullOrUndefined,
  isValidStringInput,
}