import { useChessRulesStore } from "@/store/chessRules";
import { PiecesEnum } from "@/types/chess";
import { storeToRefs } from "pinia";
export function possibleCoordinates() {
  const chessRulesStore = useChessRulesStore();
  const { currentPiece } = storeToRefs(chessRulesStore);
  if (!currentPiece.value) {
    return [];
  }

  const { row, col, piece, color } = currentPiece.value;
  const direction = color === "white" ? -1 : 1;

  switch (piece) {
    case PiecesEnum.pawn:
      if (!chessRulesStore.boardArr[row + direction]?.[col]) {
        chessRulesStore.pieceTurnOpt.push({ row: row + direction, col });

        if (
          (color === "white" && row === 6) ||
          (color === "black" && row === 1)
        ) {
          if (!chessRulesStore.boardArr[row + 2 * direction]?.[col]) {
            chessRulesStore.pieceTurnOpt.push({
              row: row + 2 * direction,
              col,
            });
          }
        }
      }

      for (const dx of [-1, 1]) {
        const target = chessRulesStore.boardArr[row + direction]?.[col + dx];
        if (target && target.color !== color) {
          chessRulesStore.pieceTurnOpt.push({
            row: row + direction,
            col: col + dx,
          });
        }
      }
      break;

    case PiecesEnum.rook:
      for (const [dx, dy] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        let r = row + dy,
          c = col + dx;
        while (r >= 0 && r < 8 && c >= 0 && c < 8) {
          if (!chessRulesStore.boardArr[r][c]) {
            chessRulesStore.pieceTurnOpt.push({ row: r, col: c });
          } else {
            if (chessRulesStore.boardArr[r][c]?.color !== color) {
              chessRulesStore.pieceTurnOpt.push({ row: r, col: c });
            }
            break;
          }
          r += dy;
          c += dx;
        }
      }
      break;

    case PiecesEnum.bishop:
      for (const [dx, dy] of [
        [1, 1],
        [-1, -1],
        [1, -1],
        [-1, 1],
      ]) {
        let r = row + dy,
          c = col + dx;
        while (r >= 0 && r < 8 && c >= 0 && c < 8) {
          if (!chessRulesStore.boardArr[r][c]) {
            chessRulesStore.pieceTurnOpt.push({ row: r, col: c });
          } else {
            if (chessRulesStore.boardArr[r][c]!.color !== color) {
              chessRulesStore.pieceTurnOpt.push({ row: r, col: c });
            }
            break;
          }
          r += dy;
          c += dx;
        }
      }
      break;

    case PiecesEnum.knight:
      for (const [dx, dy] of [
        [2, 1],
        [2, -1],
        [-2, 1],
        [-2, -1],
        [1, 2],
        [1, -2],
        [-1, 2],
        [-1, -2],
      ]) {
        const r = row + dy,
          c = col + dx;
        if (r >= 0 && r < 8 && c >= 0 && c < 8) {
          if (
            !chessRulesStore.boardArr[r][c] ||
            chessRulesStore.boardArr[r][c]?.color !== color
          ) {
            chessRulesStore.pieceTurnOpt.push({ row: r, col: c });
          }
        }
      }
      break;

    case PiecesEnum.queen:
      for (const [dx, dy] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        let r = row + dy,
          c = col + dx;
        while (r >= 0 && r < 8 && c >= 0 && c < 8) {
          if (!chessRulesStore.boardArr[r][c]) {
            chessRulesStore.pieceTurnOpt.push({ row: r, col: c });
          } else {
            if (chessRulesStore.boardArr[r][c]?.color !== color) {
              chessRulesStore.pieceTurnOpt.push({ row: r, col: c });
            }
            break;
          }
          r += dy;
          c += dx;
        }
      }
      for (const [dx, dy] of [
        [1, 1],
        [-1, -1],
        [1, -1],
        [-1, 1],
      ]) {
        let r = row + dy,
          c = col + dx;
        while (r >= 0 && r < 8 && c >= 0 && c < 8) {
          if (!chessRulesStore.boardArr[r][c]) {
            chessRulesStore.pieceTurnOpt.push({ row: r, col: c });
          } else {
            if (chessRulesStore.boardArr[r][c]!.color !== color) {
              chessRulesStore.pieceTurnOpt.push({ row: r, col: c });
            }
            break;
          }
          r += dy;
          c += dx;
        }
      }
      break;

    case PiecesEnum.king:
      for (const [dx, dy] of [
        [1, 1],
        [1, 0],
        [1, -1],
        [0, 1],
        [0, -1],
        [-1, 1],
        [-1, 0],
        [-1, -1],
      ]) {
        const r = row + dy,
          c = col + dx;
        if (r >= 0 && r < 8 && c >= 0 && c < 8) {
          if (
            !chessRulesStore.boardArr[r][c] ||
            chessRulesStore.boardArr[r][c]?.color !== color
          ) {
            chessRulesStore.pieceTurnOpt.push({ row: r, col: c });
          }
        }
      }
      break;
  }
}
