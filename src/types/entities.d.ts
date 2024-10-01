export const INITIAL_LINE_WIDTH = 5;

export enum LineCap {
  BUTT = 'butt',
  ROUND = 'round',
  SQUARE = 'square',
}

export enum Tool {
  DRAW = 'draw',
  CLEAR = 'clear',
  ERASE = 'erase',
  TEXT = 'text',
}

export type GlobalCompositeOperationType = 'source-over' | 'destination-out';

export enum GlobalCompositeOperation {
  SOURCE_OVER = 'source-over',
  DESTINATION_OUT = 'destination-out',
}

export type DrawingProviderProps = {
  children: ReactNode;
};

export type ToolProps = Tool.DRAW | Tool.ERASE | Tool.CLEAR | Tool.TEXT;
