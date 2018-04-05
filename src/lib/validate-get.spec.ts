// tslint:disable:no-expression-statement

import { ExecutionContext, test } from 'ava';

import { GetQRData } from './get-qr-data';
import validateGet, {
  getCharsetMessage,
  getEccMessage,
  InvalidField,
  maxSizeForFormat
} from './validate-get';

const maxSize: number = maxSizeForFormat();

test('data lenght is zero', t => {
  testValidation(
    t,
    { data: '' },
    'data',
    'data length should be between 1 and 900'
  );
});

test('data lenght is greater than 900', t => {
  const largeString: string = Array(900 + 2).join('x');
  testValidation(
    t,
    { data: largeString },
    'data',
    'data length should be between 1 and 900'
  );
});

test('width and height are different', t => {
  testValidation(
    t,
    {
      data: 'somedata',
      size: { width: 10, height: 20 }
    },
    'size',
    'width and height should be equal'
  );
});

test(`width and height are greater than ${maxSize}`, t => {
  const additionalError = {
    fieldName: 'size',
    message: `height should be less than ${maxSize}`
  };
  testValidation(
    t,
    {
      data: 'somedata',
      size: { width: maxSize + 10, height: maxSize + 10 }
    },
    'size',
    `width should be less than ${maxSize}`,
    [additionalError]
  );
});

test('charsetSource is unknown', t => {
  testValidation(
    t,
    {
      charsetSource: 'WA' as any,
      data: 'somedata'
    },
    'charsetSource',
    getCharsetMessage('source')
  );
});

test('charsetTarget is unknown', t => {
  testValidation(
    t,
    {
      charsetTarget: 'WA' as any,
      data: 'somedata'
    },
    'charsetTarget',
    getCharsetMessage('target')
  );
});

test('ecc is unknown', t => {
  testValidation(
    t,
    {
      data: 'somedata',
      ecc: 'WA' as any
    },
    'ecc',
    getEccMessage()
  );
});

function testValidation(
  t: ExecutionContext,
  qrOptions: GetQRData,
  fieldName: keyof GetQRData,
  message: string,
  additionalOutput: ReadonlyArray<InvalidField> = []
): void {
  t.deepEqual(validateGet(qrOptions).errors, [
    { fieldName, message },
    ...additionalOutput
  ]);
}
