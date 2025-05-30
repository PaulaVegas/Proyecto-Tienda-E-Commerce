const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error(
            'Error de JSON mal formado en ruta:',
            req.method,
            req.url
        );
        return res.status(400).json({ message: 'JSON malformado o vacío' });
    }
    next();
});

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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
