import { setActivePinia, createPinia } from "pinia";
import { useChessRulesStore } from "@/store/chessRules";
import { PiecesEnum } from "@/types/chess";
import { possibleCoordinates } from "@/utils/pieceCoordinates";

describe("possibleCoordinates", () => {
  let chessStore: any;

  beforeEach(() => {
    setActivePinia(createPinia());
    chessStore = useChessRulesStore();
    chessStore.pieceTurnOpt = [];
  });

  it("should return possible moves for a white pawn on row 6", () => {
    chessStore.boardArr = Array(8)
      .fill(null)
      .map(() => Array(8).fill(null));
    chessStore.currentPiece = {
      row: 6,
      col: 0,
      piece: PiecesEnum.pawn,
      color: "white",
    };

    possibleCoordinates();

    expect(chessStore.pieceTurnOpt).toEqual([
      { row: 5, col: 0 },
      { row: 4, col: 0 },
    ]);
  });

  it("should return possible moves for a rook", () => {
    chessStore.boardArr = Array(8)
      .fill(null)
      .map(() => Array(8).fill(null));
    chessStore.currentPiece = {
      row: 3,
      col: 3,
      piece: PiecesEnum.rook,
      color: "white",
    };
    possibleCoordinates();

    expect(chessStore.pieceTurnOpt.length).toBeGreaterThan(0);
  });

  it("should return possible moves for a knight", () => {
    chessStore.boardArr = Array(8)
      .fill(null)
      .map(() => Array(8).fill(null));
    chessStore.currentPiece = {
      row: 4,
      col: 4,
      piece: PiecesEnum.horse,
      color: "black",
    };
    possibleCoordinates();

    const expectedMoves = [
      { row: 5, col: 6 },
      { row: 5, col: 2 },
      { row: 3, col: 6 },
      { row: 3, col: 2 },
      { row: 6, col: 5 },
      { row: 6, col: 3 },
      { row: 2, col: 5 },
      { row: 2, col: 3 },
    ];

    expect(chessStore.pieceTurnOpt).toHaveLength(expectedMoves.length);
    expectedMoves.forEach((move) => {
      expect(chessStore.pieceTurnOpt).toContainEqual(move);
    });
  });

  it("should return possible moves for a bishop", () => {
    chessStore.boardArr = Array(8)
      .fill(null)
      .map(() => Array(8).fill(null));
    chessStore.currentPiece = {
      row: 2,
      col: 2,
      piece: PiecesEnum.bishop,
      color: "white",
    };
    possibleCoordinates();

    expect(chessStore.pieceTurnOpt.length).toBeGreaterThan(0);
  });

  it("should return possible moves for a king", () => {
    chessStore.boardArr = Array(8)
      .fill(null)
      .map(() => Array(8).fill(null));
    chessStore.currentPiece = {
      row: 4,
      col: 4,
      piece: PiecesEnum.king,
      color: "white",
    };
    possibleCoordinates();

    expect(chessStore.pieceTurnOpt.length).toBe(8);
  });
});
