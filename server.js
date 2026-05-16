const express = require('express');
const { Worker } = require('jest-worker');

const app = express();

app.use(express.json());

app.post('/run-test', async (req, res) => {

    try {

        const worker = new Worker(require.resolve('./worker'), {
            numWorkers: 4
        });

        const result = await worker.runTest(req.body);

        console.log(result);

        res.json(result);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });
    }
});

app.listen(3000, () => {
    console.log('MCP Server Running on Port 3000');
});