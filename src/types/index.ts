export interface Style {
  width?: number;
  height?: number;
  fontSize?: string;
  fontWeight?: number;
  lineHeight?: string;
  letterSpacing?: number;
  textAlign?: string;
  color?: string;
  rotate?: number
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
  component: string;
  label: string;
  propValue: string;
  icon: string;
  request: Request;
  style: Style;
}