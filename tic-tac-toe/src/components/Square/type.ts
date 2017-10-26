export type TSquareStatus = 0 | 1 | 2;
export interface ISquareProps {
  id: number,
  status: TSquareStatus,
  handleMove: (id: number) => void
};
