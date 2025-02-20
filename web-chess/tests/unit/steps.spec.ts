import { setActivePinia, createPinia } from "pinia";
import { useChessRulesStore } from "@/store/chessRules";
import { pieceArrGenerator } from "@/utils/steps"; // Adjust the import path

describe("pieceArrGenerator", () => {
  beforeEach(() => {
    setActivePinia(createPinia()); // Create a fresh Pinia instance for each test
  });

  it("should push only white pieces to pieceArr when turnOrder is true", () => {
    const chessStore = useChessRulesStore();

    chessStore.initBoard([
      [{ color: "white", piece: 1 }, null, { color: "black", piece: 2 }],
      [null, { color: "white", piece: 3 }, { color: "black", piece: 4 }],
    ]);
    pieceArrGenerator(); // Run function

    expect(chessStore.pieceArr).toEqual([
      { color: "white", piece: 1, row: 0, col: 0 },
      { color: "white", piece: 3, row: 1, col: 1 },
    ]);
  });

  it("should push only black pieces to pieceArr when turnOrder is false", () => {
    const chessStore = useChessRulesStore();

    chessStore.initBoard([
      [{ color: "white", piece: 1 }, null, { color: "black", piece: 2 }],
      [null, { color: "white", piece: 3 }, { color: "black", piece: 4 }],
    ]);

    chessStore.clearPieceArr();
    chessStore.setTurnOrder(false); // Black's turn

    pieceArrGenerator(); // Run function
    expect(chessStore.pieceArr).toEqual([
      { color: "black", piece: 2, row: 0, col: 2 },
      { color: "black", piece: 4, row: 1, col: 2 },
    ]);
  });

  it("should not push anything if boardArr is empty", () => {
    const chessStore = useChessRulesStore();
    pieceArrGenerator();
    expect(chessStore.pieceArr).toEqual([]); // No pieces should be added
  });

  it("should ignore null values in boardArr", () => {
    const chessStore = useChessRulesStore();

    chessStore.initBoard([
      [null, null, null],
      [null, { color: "white", piece: 1 }, null],
    ]);
    pieceArrGenerator();

    expect(chessStore.pieceArr).toEqual([
      { color: "white", piece: 1, row: 1, col: 1 },
    ]);
  });
});
