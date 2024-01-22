export default eventHandler(async () => {
  const { counter } = (await $fetch("/counter")) as { counter: number };
  return `<div>Counter: ${counter}</div>`;
});
