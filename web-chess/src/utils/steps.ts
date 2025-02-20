import { useChessRulesStore } from "@/store/chessRules";
import { storeToRefs } from "pinia";

export function pieceArrGenerator() {
  const chessRulesStore = useChessRulesStore();
  const { turnOrder } = storeToRefs(chessRulesStore);
  // throw chessRulesStore.boardArr.entries();
  for (const [rowIndex, row] of chessRulesStore.boardArr.entries()) {
    for (const [colIndex, col] of row.entries()) {
      if (!col) {
        continue;
      }
      if (turnOrder.value) {
        if (col.color === "white") {
          chessRulesStore.pieceArr.push({
            ...col,
            row: rowIndex,
            col: colIndex,
          });
        }
      } else {
        if (col.color === "black") {
          chessRulesStore.pieceArr.push({
            ...col,
            row: rowIndex,
            col: colIndex,
          });
        }
      }
    }
  }
}
