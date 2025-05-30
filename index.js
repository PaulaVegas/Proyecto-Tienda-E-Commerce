const express = require('express');
const app = express();
const { typeError } = require('./middlewares/errors');
const PORT = 3000;

app.use(express.json());

// endpoints de productos
app.use('/products', require('./routes/products'));

//endpoints de categorías
app.use('/categories', require('./routes/categories'));

//endpoints de pedidos
app.use('/orders', require('./routes/orders'));

//endpoints de reviews
app.use('/reviews', require('./routes/reviews'));

//endpoints de users
app.use('/users', require('./routes/users'));

app.use(typeError);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
