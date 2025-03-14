<template>
  <table class="chessboard">
    <tbody>
      <!-- Loop from 1 to 8 for rows (subtract 1 for array index) -->
      <tr v-for="rowIndex in 8" :key="`row-${rowIndex}`">
        <td
          v-for="colIndex in 8"
          :key="`col-${colIndex}`"
          :class="(rowIndex + colIndex) % 2 === 0 ? 'white' : 'black'"
          @drop="handleDrop(rowIndex - 1, colIndex - 1)"
          @dragover.prevent
          :data-opt="isOpt(rowIndex - 1, colIndex - 1)"
        >
          <!-- Render piece if the cell is not null -->
          <div
            v-if="boardArr[rowIndex - 1]?.[colIndex - 1]"
            class="piece"
            draggable="true"
            @click="selectPiece(rowIndex - 1, colIndex - 1)"
            @dragstart="handleDragStart(rowIndex - 1, colIndex - 1, $event)"
            v-html="
            getPieceSvg(
              boardArr[rowIndex - 1][colIndex - 1]!.pieceName,  // Non-null assertion
              boardArr[rowIndex - 1][colIndex - 1]!.color       // Non-null assertion
            )
          "
          ></div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useChessRulesStore } from "@/store/chessRules";
import { makeMove } from "@/utils/turn";

// Get the store instance
const chessRulesStore = useChessRulesStore();

// Use storeToRefs to get refs for reactive properties
const { boardArr, pieceTurnOpt, turnOrder } = storeToRefs(chessRulesStore);

// Initialize board with starting positions on mount
onMounted(() => {
  const startingBoard = [
    [
      { color: "black", piece: 4, pieceName: "rook" },
      { color: "black", piece: 5, pieceName: "knight" },
      { color: "black", piece: 6, pieceName: "bishop" },
      { color: "black", piece: 3, pieceName: "queen" },
      { color: "black", piece: 2, pieceName: "king" },
      { color: "black", piece: 6, pieceName: "bishop" },
      { color: "black", piece: 5, pieceName: "knight" },
      { color: "black", piece: 4, pieceName: "rook" },
    ],
    Array.from({ length: 8 }, () => ({
      color: "black",
      piece: 1,
      pieceName: "pawn",
    })),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array.from({ length: 8 }, () => ({
      color: "white",
      piece: 1,
      pieceName: "pawn",
    })),
    [
      { color: "white", piece: 4, pieceName: "rook" },
      { color: "white", piece: 5, pieceName: "knight" },
      { color: "white", piece: 6, pieceName: "bishop" },
      { color: "white", piece: 3, pieceName: "queen" },
      { color: "white", piece: 2, pieceName: "king" },
      { color: "white", piece: 6, pieceName: "bishop" },
      { color: "white", piece: 5, pieceName: "knight" },
      { color: "white", piece: 4, pieceName: "rook" },
    ],
  ];
  chessRulesStore.initBoard(startingBoard);
});

// --- Inline SVG handling ---
const pieceSvgs: Record<string, string> = {};

// Fetch and cache SVG content from /public/chess/
const fetchSvg = async (pieceName: string): Promise<string> => {
  if (pieceSvgs[pieceName]) return pieceSvgs[pieceName];
  try {
    const res = await fetch(`/chess/${pieceName}.svg`);
    if (!res.ok) throw new Error("Fetch error");
    pieceSvgs[pieceName] = await res.text();
    return pieceSvgs[pieceName];
  } catch (err) {
    console.error("SVG error", err);
    return "";
  }
};

const getPieceSvg = (pieceName: string, color: string): string => {
  return pieceSvgs[`${pieceName}_${color}`] || "";
};

// Preload SVGs on mount
onMounted(() => {
  const pieces = [
    "pawn_white",
    "pawn_black",
    "rook_white",
    "rook_black",
    "knight_white",
    "knight_black",
    "bishop_white",
    "bishop_black",
    "queen_white",
    "queen_black",
    "king_white",
    "king_black",
  ];
  pieces.forEach((piece) => fetchSvg(piece));
});

// --- Selection & Drag & Drop ---
// Only allow selection if the piece's color matches the current turn.
// With turnOrder false, only black pieces are selectable.
const selectPiece = (row: number, col: number) => {
  const cell = boardArr.value[row]?.[col];
  if (!cell) return;
  if (
    (turnOrder.value && cell.color === "white") ||
    (!turnOrder.value && cell.color === "black")
  ) {
    chessRulesStore.setCurrentPiece({ ...cell, row, col });
  }
};

const handleDragStart = (row: number, col: number, event: DragEvent) => {
  const cell = boardArr.value[row]?.[col];
  if (!cell) return;
  if (
    (turnOrder.value && cell.color !== "white") ||
    (!turnOrder.value && cell.color !== "black")
  ) {
    event.preventDefault();
    return;
  }
  chessRulesStore.setCurrentPiece({ ...cell, row, col });
  const dragImg = document.createElement("img");
  dragImg.src = `/chess/${cell.pieceName}_${cell.color}.svg`;
  dragImg.style.width = "50px";
  dragImg.style.height = "50px";
  document.body.appendChild(dragImg);
  event.dataTransfer?.setDragImage(dragImg, 25, 25);
  setTimeout(() => document.body.removeChild(dragImg), 0);
};

const handleDrop = (row: number, col: number) => (_: DragEvent) => {
  makeMove({ row, col });
};

const isOpt = (row: number, col: number): boolean => {
  return pieceTurnOpt.value.some((opt) => opt.row === row && opt.col === col);
};
</script>

<style lang="less" scoped>
.chessboard {
  width: 400px;
  height: 400px;
  border-collapse: collapse;
  border: 2px solid #333;
  table-layout: fixed;

  td {
    width: 50px;
    height: 50px;
    text-align: center;
    position: relative;

    &[data-opt="true"] {
      background-color: rgba(0, 255, 0, 0.3);
    }

    .piece {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: grab;

      svg {
        width: 80%;
        height: 80%;
        pointer-events: none;
      }
    }
  }
}
</style>
