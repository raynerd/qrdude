import {
  isIn,
  // isInt,
  isLength
} from "validator"

import {
  charsetTypes,
  DEFAULT_FORMAT,
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  Format,
  GetQRData,
} from "./get-qr-data";

export interface InvalidField {
  readonly fieldName: string;
  readonly message?: string;
}

export type Validation = ReadonlyArray<InvalidField> | GetQRData;

export interface FieldValidation {
  readonly message: string;
  readonly result: boolean;
}

export default function (data: GetQRData): Validation {
  const maxSize: number = maxSizeForFormat(data.format || DEFAULT_FORMAT);
  const fieldValidations: ReadonlyArray<FieldValidation> = [{
    message: "data length should be between 1 and 900",
    result: isLength(data.data, { min: 1, max: 900 })
  }, {
    message: "width and height should be equal",
    result: data.size ? data.size.width === data.size.height : true
  }, {
    message: "width should be greater of equal to 10",
    result: data.size ? data.size.width >= 10 : true
  }, {
    message: "height should be greater of equal to 10",
    result: data.size ? data.size.height >= 10 : true
  }, {
    message: `width should be less than ${maxSize}`,
    result: checkMax(data.size ? data.size.width : DEFAULT_WIDTH, maxSize)
  }, {
    message: `height should be less than ${maxSize}`,
    result: checkMax(data.size ? data.size.height : DEFAULT_HEIGHT, maxSize)
  }, {
    message: `charset source should be one of (${charsetTypes.join(", ")})`,
    result: data.charsetSource ? isIn(data.charsetSource, ["ISO-8859-1", "UTF-8"]) : true
  }];
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