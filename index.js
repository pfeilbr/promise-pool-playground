const { PromisePool } = require("@supercharge/promise-pool");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  const randomNumbers = Array.from({ length: 100 }, () =>
    Math.floor(Math.random() * 40)
  );

  const { results, errors } = await PromisePool.for(randomNumbers)
    .withConcurrency(100)
    .process(async (num, index, pool) => {
        console.log(`${index}: start`)
      await sleep(Math.floor(Math.random() * 250));
      return num * 2;
    });

  console.log({ results, errors });
})();
