<template>
  <table class="chessboard">
    <tbody>
      <tr v-for="(row, rowIndex) in 8" :key="`row-${rowIndex}`">
        <td
          v-for="(col, colIndex) in 8"
          :key="`col-${colIndex}`"
          :class="(rowIndex + colIndex) % 2 === 0 ? 'white' : 'black'"
          @drop="onDrop($event, rowIndex, colIndex)"
          @dragover.prevent
        >
          <div
            v-if="pieces[rowIndex][colIndex]"
            class="piece"
            draggable="true"
            @dragstart="onDragStart($event, rowIndex, colIndex)"
            v-html="getPieceSvg(pieces[rowIndex][colIndex])"
          ></div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";

const pieces = ref([
  [
    "rook_black",
    "knight_black",
    "bishop_black",
    "queen_black",
    "king_black",
    "bishop_black",
    "knight_black",
    "rook_black",
  ],
  [
    "pawn_black",
    "pawn_black",
    "pawn_black",
    "pawn_black",
    "pawn_black",
    "pawn_black",
    "pawn_black",
    "pawn_black",
  ],
  ...Array(4).fill(Array(8).fill(null)), // Empty rows
  [
    "pawn_white",
    "pawn_white",
    "pawn_white",
    "pawn_white",
    "pawn_white",
    "pawn_white",
    "pawn_white",
    "pawn_white",
  ],
  [
    "rook_white",
    "knight_white",
    "bishop_white",
    "queen_white",
    "king_white",
    "bishop_white",
    "knight_white",
    "rook_white",
  ],
]);

const pieceSvgs = reactive({});
let draggingPiece = null;
let startRow = null;
let startCol = null;

// Fetch and store SVGs
const fetchSvg = async (piece) => {
  if (!piece) return "";
  if (pieceSvgs[piece]) return pieceSvgs[piece];

  try {
    const response = await fetch(`/chess/${piece}.svg`);
    if (!response.ok) throw new Error(`Failed to load ${piece}`);

    let svgText = await response.text();
    svgText = svgText.replace(
      "<svg",
      `<svg style="fill: currentColor; color: inherit;"`
    );

    pieceSvgs[piece] = svgText;
    return pieceSvgs[piece];
  } catch (error) {
    console.error(`Error loading SVG for ${piece}:`, error);
    return "";
  }
};

// Get piece SVG
const getPieceSvg = (piece) => pieceSvgs[piece] || "";

// Preload SVGs
onMounted(() => {
  const allPieces = [
    "pawn_white",
    "pawn_black",
    "knight_white",
    "knight_black",
    "bishop_white",
    "bishop_black",
    "rook_white",
    "rook_black",
    "queen_white",
    "queen_black",
    "king_white",
    "king_black",
  ];
  allPieces.forEach(fetchSvg);
});

// Drag start
const onDragStart = (event, row, col) => {
  draggingPiece = pieces.value[row][col];
  startRow = row;
  startCol = col;

  // Create a drag image
  const dragImg = document.createElement("img");
  dragImg.src = `/chess/${draggingPiece}.svg`;
  dragImg.style.width = "50px";
  dragImg.style.height = "50px";
  document.body.appendChild(dragImg);

  event.dataTransfer.setDragImage(dragImg, 25, 25);
  event.dataTransfer.effectAllowed = "move";

  setTimeout(() => document.body.removeChild(dragImg), 0);
};

// Drop
const onDrop = (event, row, col) => {
  if (draggingPiece) {
    // Clone pieces array to force Vue reactivity update
    const newPieces = pieces.value.map((row) => [...row]);

    newPieces[startRow][startCol] = null;
    newPieces[row][col] = draggingPiece;
    pieces.value = newPieces;

    draggingPiece = null;
  }
};
</script>

<style lang="less">
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
    font-size: 24px;
    font-weight: bold;
    vertical-align: middle;
    transition: background 0.2s ease-in-out;

    &.white {
      background-color: #f0d9b5; // Light square
    }

    &.black {
      background-color: #b58863; // Dark square
    }

    &:hover {
      background-color: rgba(255, 255, 0, 0.5); // Highlight on hover
    }

    .piece {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: grab;

      svg {
        width: 80%;
        height: 80%;
        pointer-events: none; // Prevent interaction with internal SVG elements
        fill: none !important; // Prevent external fill overrides
      }
    }
  }
}
</style>
