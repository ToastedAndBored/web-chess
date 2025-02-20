import { setActivePinia, createPinia } from "pinia";
import { useChessRulesStore } from "@/store/chessRules";
import { PiecesEnum } from "@/types/chess";
import { possibleCoordinates } from "@/utils/pieceCoordinates"; // Adjust the import path

describe("possibleCoordinates", () => {
  let chessStore: any;

  beforeEach(() => {
    setActivePinia(createPinia());
    chessStore = useChessRulesStore();
  });

  it("should return possible coordinates for a pawn when it is on row 6 (white)", () => {
    chessStore.boardArr = [
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(null),
      [
        { color: "white", piece: PiecesEnum.pawn },
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      Array(8).fill(null),
    ];

    chessStore.currentPiece = {
      value: { row: 6, col: 0, piece: PiecesEnum.pawn, color: "white" },
    };
    chessStore.pieceTurnOpt = [];

    possibleCoordinates();

    expect(chessStore.pieceTurnOpt).toEqual([
      { row: 5, col: 0 }, // Can move 1 square forward
      { row: 4, col: 0 }, // Can move 2 squares forward from initial position
    ]);
  });

  it("should not allow pawn to move 2 squares if blocked", () => {
    chessStore.boardArr = [
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(null),
      [
        { color: "white", piece: PiecesEnum.pawn },
        { color: "black", piece: PiecesEnum.pawn },
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      Array(8).fill(null),
    ];

    chessStore.currentPiece = {
      value: { row: 6, col: 0, piece: PiecesEnum.pawn, color: "white" },
    };
    chessStore.pieceTurnOpt = [];

    possibleCoordinates();

    expect(chessStore.pieceTurnOpt).toEqual([{ row: 5, col: 0 }]); // Only 1 square forward, 2 squares blocked
  });

  it("should return possible coordinates for a rook", () => {
    chessStore.boardArr = [
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(null),
      [
        { color: "white", piece: PiecesEnum.rook },
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      Array(8).fill(null),
    ];

    chessStore.currentPiece = {
      value: { row: 6, col: 0, piece: PiecesEnum.rook, color: "white" },
    };
    chessStore.pieceTurnOpt = [];

    possibleCoordinates();

    expect(chessStore.pieceTurnOpt).toEqual([
      { row: 7, col: 0 }, // Can move forward
      { row: 5, col: 0 }, // Can move backward
      { row: 6, col: 1 }, // Can move right
      { row: 6, col: -1 }, // Can move left
    ]);
  });

  it("should return possible coordinates for a horse", () => {
    chessStore.boardArr = [
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(null),
      [
        { color: "white", piece: PiecesEnum.horse },
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      Array(8).fill(null),
    ];

    chessStore.currentPiece = {
      value: { row: 6, col: 0, piece: PiecesEnum.horse, color: "white" },
    };
    chessStore.pieceTurnOpt = [];

    possibleCoordinates();

    expect(chessStore.pieceTurnOpt).toEqual([
      { row: 5, col: 2 }, // Horse's possible move
      { row: 7, col: 2 },
      { row: 4, col: 1 },
      { row: 4, col: -1 },
      { row: 8, col: 1 },
      { row: 8, col: -1 },
    ]);
  });

  it("should return possible coordinates for a queen", () => {
    chessStore.boardArr = [
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(null),
      [
        { color: "white", piece: PiecesEnum.queen },
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      Array(8).fill(null),
    ];

    chessStore.currentPiece = {
      value: { row: 6, col: 0, piece: PiecesEnum.queen, color: "white" },
    };
    chessStore.pieceTurnOpt = [];

    possibleCoordinates();

    expect(chessStore.pieceTurnOpt).toEqual([
      { row: 7, col: 0 },
      { row: 5, col: 0 },
      { row: 6, col: 1 },
      { row: 6, col: -1 },
      { row: 7, col: 1 },
      { row: 5, col: -1 },
    ]);
  });

  it("should return possible coordinates for a king", () => {
    chessStore.boardArr = [
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(null),
      [
        { color: "white", piece: PiecesEnum.king },
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      Array(8).fill(null),
    ];

    chessStore.currentPiece = {
      value: { row: 6, col: 0, piece: PiecesEnum.king, color: "white" },
    };
    chessStore.pieceTurnOpt = [];

    possibleCoordinates();

    expect(chessStore.pieceTurnOpt).toEqual([
      { row: 5, col: 0 },
      { row: 5, col: 1 },
      { row: 6, col: 1 },
      { row: 7, col: 1 },
    ]);
  });
});
