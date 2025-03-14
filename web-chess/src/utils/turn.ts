import { useChessRulesStore } from "@/store/chessRules";
import { possibleCoordinates } from "@/utils/pieceCoordinates";
import { storeToRefs } from "pinia";
import { ICoordinate } from "@/types/chess";

export function makeMove(target: ICoordinate) {
  const chessRulesStore = useChessRulesStore();
  const { currentPiece, turnOrder, boardArr, pieceTurnOpt } =
    storeToRefs(chessRulesStore);

  if (!currentPiece.value) return { isValid: false, capturedPiece: null };

  // Ensure the correct player's turn
  if (
    (turnOrder.value && currentPiece.value.color !== "white") ||
    (!turnOrder.value && currentPiece.value.color !== "black")
  ) {
    console.warn("Not your turn!");
    return { isValid: false, capturedPiece: null };
  }

  // Generate possible moves for this piece
  // chessRulesStore.clearPieceTurnOpt();
  // possibleCoordinates();

  // Check if move is legal
  const isValidMove = pieceTurnOpt.value.some(
    (opt) => opt.row === target.row && opt.col === target.col
  );
  if (!isValidMove) {
    console.warn("Invalid move!");
    return { isValid: false, capturedPiece: null };
  }

  // Capture piece if needed
  const capturedPiece = boardArr.value[target.row][target.col] || null;

  // Update board
  boardArr.value[target.row][target.col] = { ...currentPiece.value };
  boardArr.value[currentPiece.value.row][currentPiece.value.col] = null;

  // Clear selection and switch turn
  chessRulesStore.setCurrentPiece(null);
  chessRulesStore.clearPieceTurnOpt();
  chessRulesStore.setTurnOrder(!turnOrder.value);

  return { isValid: true, capturedPiece: capturedPiece }; // Return captured piece if needed
}
