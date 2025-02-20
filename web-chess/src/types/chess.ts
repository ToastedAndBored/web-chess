export interface IBoardPiece {
  color: string;
  piece: number;
}

export interface IPiece extends IBoardPiece {
  row: number; //y
  col: number; //x
}

export interface ICoordinate {
  row: number;
  col: number;
}

export enum PiecesEnum {
  pawn = 1,
  king = 2,
  queen = 3,
  rook = 4,
  horse = 5,
  bishop = 6,
}
