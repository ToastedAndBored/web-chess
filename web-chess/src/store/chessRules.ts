import { IBoardPiece, ICoordinate, IPiece } from "@/types/chess";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useChessRulesStore = defineStore("chessRules", () => {
  const pieceArr: IPiece[] = reactive([]);
  function clearPieceArr() {
    pieceArr.splice(0, pieceArr.length);
  }

  const currentPiece = ref<IPiece | null>(null);
  function setCurrentPiece(value: IPiece | null) {
    currentPiece.value = value;
  }

  const boardArr: (IBoardPiece | null)[][] = reactive([]);
  function clearBoard() {
    boardArr.splice(0, boardArr.length);
  }
  function initBoard(newBoard: (IBoardPiece | null)[][]) {
    clearBoard(); // Ensure it's empty before initializing
    newBoard.forEach((row) => {
      boardArr.push([...row]); // Push copies of new rows to maintain reactivity
    });
  }

  const pieceTurnOpt: ICoordinate[] = reactive([]);
  function clearPieceTurnOpt() {
    pieceTurnOpt.splice(0, pieceTurnOpt.length);
  }

  const turnOrder = ref(true);
  function setTurnOrder(value: boolean) {
    turnOrder.value = value;
  }

  const capturedWhite: IBoardPiece[] = reactive([]);
  const capturedBlack: IBoardPiece[] = reactive([]);
  return {
    pieceArr,
    clearPieceArr,
    currentPiece,
    setCurrentPiece,
    boardArr,
    initBoard,
    clearBoard,
    pieceTurnOpt,
    clearPieceTurnOpt,
    turnOrder,
    setTurnOrder,
    capturedBlack,
    capturedWhite,
  };
});
