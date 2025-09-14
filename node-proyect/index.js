require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;
// habilitar CORS
// primero instalar cors: npm i cors
const cors = require('cors');
app.use(cors());

app.use(express.json());

const productRouter = require('./routes/products.routes.js')
const userRouter = require('./routes/users.routes.js')
const saleRouter = require('./routes/ventas.routes.js')
const authRouter = require('./routes/auth.routes.js')


app.use('/productos/', productRouter);
app.use('/usuarios/', userRouter); 
app.use('/ventas/', saleRouter);
app.use('/auth/', authRouter);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
}
);