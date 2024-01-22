<script setup lang="ts">
const { data } = await useFetch("/counter");
</script>

<template>
  <div>Counter: {{ data }}</div>
</template>
