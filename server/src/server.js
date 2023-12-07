import express from 'express';
import cors from 'cors';
import route from './router/route.js';
const port = 7000;

const app = express();




app.use(express.json());
app.use(cors());
app.use('/', route);


app.listen(process.env.PORT || port, () => {
    console.log(`listening on ${port}`);
})

