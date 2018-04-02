import {
  isIn,
  isInt,
  isLength
} from "validator"

import {
  charsetTypes,
  DEFAULT_FORMAT,
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  eccTypes,
  Format,
  GetQRData,
} from "./get-qr-data";

export interface InvalidField {
  readonly fieldName: string;
  readonly message?: string;
}

export type Validation = ReadonlyArray<InvalidField> | GetQRData;

export interface FieldValidation {
  readonly fieldName: keyof GetQRData;
  readonly message: string;
  readonly result: boolean;
}

export default function (data: GetQRData): Validation {
  const maxSize: number = maxSizeForFormat(data.format || DEFAULT_FORMAT);
  const fieldValidations: ReadonlyArray<FieldValidation> = [{
    fieldName: "data",
    message: "data length should be between 1 and 900",
    result: isLength(data.data, { min: 1, max: 900 })
  }, {
    fieldName: "size",
    message: "width and height should be equal",
    result: data.size ? data.size.width === data.size.height : true
  }, {
    fieldName: "size",
    message: "width should be greater of equal to 10",
    result: data.size ? data.size.width >= 10 : true
  }, {
    fieldName: "size",
    message: "height should be greater of equal to 10",
    result: data.size ? data.size.height >= 10 : true
  }, {
    fieldName: "size",
    message: `width should be less than ${maxSize}`,
    result: checkMax(data.size ? data.size.width : DEFAULT_WIDTH, maxSize)
  }, {
    fieldName: "size",
    message: `height should be less than ${maxSize}`,
    result: checkMax(data.size ? data.size.height : DEFAULT_HEIGHT, maxSize)
  }, {
    fieldName: "charsetSource",
    message: `charset source should be one of (${charsetTypes.join(", ")})`,
    result: data.charsetSource ? isIn(data.charsetSource, charsetTypes as any) : true
  }, {
    fieldName: "ecc",
    message: `ecc should be one of (${eccTypes.join(", ")})`,
    result: data.ecc ? isIn(data.ecc, eccTypes as any) : true
  }, {
    fieldName: "color",
    message: "color should be of the following formats ([0-255]-[0-255]-[0-255], [a-ab-a], [aabbcc], [abc])",
    result: data.color ? checkColor(data.color) : true
  }, {
    fieldName: "bgColor",
    message: "bgColor should be of the following formats ([0-255]-[0-255]-[0-255], #[aabbcc], #[abc])",
    result: data.bgColor ? checkColor(data.bgColor) : true
  }, {
    fieldName: "margin",
    message: "margin should be a integer between 0 and 50",
    result: data.margin ? isInt(data.margin.toString(), { min: 0, max: 50 }) : true
  }, {
    fieldName: "qZone",
    message: "qZone should be a integer between 0 and 100",
    result: data.qZone ? isInt(data.qZone.toString(), { min: 0, max: 100 }) : true
  }];

  const errorFields: ReadonlyArray<FieldValidation> = fieldValidations.filter(
    fieldValidation => fieldValidation.result
  );

  return errorFields.length
    ? getInvalidFields(errorFields)
    : data;
}

function maxSizeForFormat(format: Format): number {
  return isIn(format, ["png", "gif", "jpeg"]) ? 1000 : 1000000;
}

function checkMax(
  value: number,
  maxValue: number
) : boolean {
  return value <= maxValue;
}

function getInvalidFields(
  errorFields: ReadonlyArray<FieldValidation>
): ReadonlyArray<InvalidField> {
  return errorFields.map(errorField => ({
      fieldName: errorField.fieldName,
      message: errorField.message
    }
  ));
}

function checkColor(
  value: string
): boolean {
  const pattern = `^(([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])
  -([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])
  -([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])
  |#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}))$`;
  const colorRegexp = new RegExp(pattern);
  return colorRegexp.test(value);
}
