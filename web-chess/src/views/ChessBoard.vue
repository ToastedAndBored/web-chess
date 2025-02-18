<template>
  <table class="chessboard">
    <tbody>
      <tr v-for="row in 8" :key="row">
        <td
          v-for="col in 8"
          :class="(row + col) % 2 === 0 ? 'white' : 'black'"
          :key="col"
        >
          s
        </td>
      </tr>
    </tbody>
  </table>
  <span v-for="(value, key) in 10" :key="value - key"
    >{{ value }} {{ key }}</span
  >
</template>
