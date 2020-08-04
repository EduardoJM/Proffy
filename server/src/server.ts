import express from 'express';

const app = express();

app.get('/users', (request, response) => {
    return response.json([
        { name: 'Eduardo', age: 23 }
    ]);
});

app.listen(3333);
