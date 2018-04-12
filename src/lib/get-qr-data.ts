export type Format = 'png' | 'gif' | 'jpeg' | 'jpg' | 'svg' | 'eps';

export type Charset = 'ISO-8859-1' | 'UTF-8';

export type Ecc = 'L' | 'M' | 'Q' | 'H';

export interface Size {
  readonly width: number;
  readonly height: number;
}

export interface GetQRData {
  readonly data: string;
  readonly size?: Size;
  readonly format?: Format;
  readonly charsetSource?: Charset;
  readonly charsetTarget?: Charset;
  readonly ecc?: Ecc;
  readonly color?: string;
  readonly bgColor?: string;
  readonly margin?: number;
  readonly qZone?: number;
}

export const DEFAULT_FORMAT: Format = 'png';
export const DEFAULT_WIDTH: number = 200;
export const DEFAULT_HEIGHT: number = 200;
export const DEFAULT_CHARSET: Charset = 'UTF-8';
export const DEFAULT_CHARSET_TARGET: Charset = 'UTF-8';
export const DEFAULT_ECC: Ecc = 'L';
export const DEFAULT_COLOR: string = '0-0-0';
export const DEFAULT_BGCOLOR: string = '0-0-0';
export const DEFAULT_MARGIN: number = 1;
export const DEFAULT_QZONE: number = 0;

export const charsetTypes: ReadonlyArray<Charset> = ['ISO-8859-1', 'UTF-8'];

export const eccTypes: ReadonlyArray<Ecc> = ['L', 'M', 'Q', 'H'];
