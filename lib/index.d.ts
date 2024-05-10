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
    key: string;
    isKeyVisible: boolean;
    fieldType?: fieldType;
    transformValue?: ITransformValue;
}
interface IConfig {
    staticParam: string;
    requestData: object;
    dinamicParams: IDinamicParam[];
}
export declare function generateSegmentUrl(config: IConfig): string;
export {};
