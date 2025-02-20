<template>
  <table class="chessboard">
    <tbody>
      <tr v-for="row in 8" :key="`rows-${row}`">
        <td
          v-for="col in 8"
          :class="(row + col) % 2 === 0 ? 'white' : 'black'"
          :key="`col-${col}`"
        >
          s
        </td>
      </tr>
    </tbody>
  </table>
  <span v-for="(value, index) in 10" :key="index">{{ value }} {{ index }}</span>
</template>
