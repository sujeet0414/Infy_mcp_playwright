import JestWorker from 'jest-worker';

async function main() {
  const worker = new JestWorker(require.resolve('./Worker'));
  const result = await worker.hello('Alice'); // "Hello, Alice"
}

main();
