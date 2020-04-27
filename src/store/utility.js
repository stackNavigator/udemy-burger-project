export const updateObject = (odlObj, properties) => ({ ...odlObj, ...properties })
export const updateArray = (oldArray, properties) => ([ ...oldArray, ...properties ])