import express from 'express';

const app = express();
const port= 3000;

app.get('/', (req, res) => {
    const response='{ "text": "Hello from sss^erver!"}';
    res.send(response);
});

app.listen(port, ()=>{
    console.log(`server listening on port ${port}`);
});
