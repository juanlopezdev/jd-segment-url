type typeTransform = 'CUSTOM' | 'ARRAY_TO_STR';
type fieldType = 'string' | 'number' | 'boolean' | 'array' | 'object';

interface IArrayToStrParams {
  separator: string;
}

interface ITransformValue {
  typeTransform: typeTransform;
  typeParams?: IArrayToStrParams;
  func?: (value: any) => any;
}

interface IDinamicParam {
  key: string; // Nombre del parametro
  isKeyVisible: boolean; // Si el parametro es visible en la URL
  fieldType?: fieldType; // Tipo de dato del parametro
  transformValue?: ITransformValue;
}

interface IConfig {
  staticParam: string; // Parametro estatico o base en la URL
  requestData: object; // Datos de la solicitud
  dinamicParams: IDinamicParam[]; // Parametros dinamico
}

function getSegmentByCustomFunc(fn: (val: any) => any, value: any): string {
  return `${fn(value)}/`;
}

function getSegmentByArrayToStrFunc(arrayValue: any[], separator: string = ','): string {
  return `${arrayValue.join(separator)}/`;
}

function processTransformValue(transformValue: ITransformValue, value: any, fieldType: fieldType = 'string'): string {
  const { typeTransform, typeParams, func } = transformValue;
  switch (typeTransform) {
    case 'CUSTOM':
      if (!func || typeof func !== 'function') throw new Error(`Invalid function for custom transformValue`);
      return getSegmentByCustomFunc(func, value);
    case 'ARRAY_TO_STR':
      if (!Array.isArray(value)) throw new Error(`Invalid value for transformValue typeTransform ARRAY_TO_STR`);
      if (fieldType !== 'array') throw new Error(`Invalid fieldType for transformValue typeTransform ARRAY_TO_STR`);
      return getSegmentByArrayToStrFunc(value, typeParams?.separator);
    default:
      throw new Error(`Invalid typeTransform for transformValue`);
  }
}

export function generateSegmentUrl(config: IConfig): string {
  const { requestData, staticParam, dinamicParams } = config;
  let url = `${staticParam}/`;

  dinamicParams.forEach((param) => {
    const { key, isKeyVisible, fieldType, transformValue } = param;

    if (!requestData.hasOwnProperty(key)) throw new Error(`Parameter ${key} not found in request(requestData)`);

    if (isKeyVisible) url += `${key}/`;

    const value: any = requestData[key as keyof typeof requestData];

    url += (transformValue) ? processTransformValue(transformValue, value, fieldType) : `${value}/`;
  });

  return url;
}