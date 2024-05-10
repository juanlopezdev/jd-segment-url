"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSegmentUrl = void 0;
function getSegmentByCustomFunc(fn, value) {
    return `${fn(value)}/`;
}
function getSegmentByArrayToStrFunc(arrayValue, separator = ',') {
    return `${arrayValue.join(separator)}/`;
}
function processTransformValue(transformValue, value, fieldType = 'string') {
    const { typeTransform, typeParams, func } = transformValue;
    switch (typeTransform) {
        case 'CUSTOM':
            if (!func || typeof func !== 'function')
                throw new Error(`Invalid function for custom transformValue`);
            return getSegmentByCustomFunc(func, value);
        case 'ARRAY_TO_STR':
            if (!Array.isArray(value))
                throw new Error(`Invalid value for transformValue typeTransform ARRAY_TO_STR`);
            if (fieldType !== 'array')
                throw new Error(`Invalid fieldType for transformValue typeTransform ARRAY_TO_STR`);
            return getSegmentByArrayToStrFunc(value, typeParams === null || typeParams === void 0 ? void 0 : typeParams.separator);
        default:
            throw new Error(`Invalid typeTransform for transformValue`);
    }
}
function generateSegmentUrl(config) {
    const { requestData, staticParam, dinamicParams } = config;
    let url = `${staticParam}/`;
    dinamicParams.forEach((param) => {
        const { key, isKeyVisible, fieldType, transformValue } = param;
        if (!requestData.hasOwnProperty(key))
            throw new Error(`Parameter ${key} not found in request(requestData)`);
        if (isKeyVisible)
            url += `${key}/`;
        const value = requestData[key];
        url += (transformValue) ? processTransformValue(transformValue, value, fieldType) : `${value}/`;
    });
    return url;
}
exports.generateSegmentUrl = generateSegmentUrl;
