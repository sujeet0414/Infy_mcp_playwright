const express = require('express');

const { runTest } = require('./worker');

const app = express();

app.use(express.json());

app.post('/run-test', async (req, res) => {

    try {

        console.log("Request Received");

        const result = await runTest(req.body);

        res.json(result);

    } catch (err) {

        console.log("SERVER ERROR:", err);

        res.status(500).json({
            error: err.message
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`MCP Server Running on Port ${PORT}`);
});