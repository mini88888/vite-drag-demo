export * from './store'
export interface Position {
  x: number,
  y: number
}
export interface Style {
  // width?: number;
  // height?: number;
  // top?: number
  // left?: number
  // fontSize?: string;
  // fontWeight?: number;
  // lineHeight?: string;
  // letterSpacing?: number;
  // textAlign?: string;
  // color?: string;
  // rotate?: number;
  [key: string]: string | number,
}

interface Request {
  method: string;
  data: any[];
  url: string;
  series: boolean;
  time: number;
  paramType: string;
  requestCount: number;
}

export interface componentItem {
  id: string,
  component: string;
  label: string;
  propValue: string;
  icon: string;
  request: Request;
  style: Style;
}