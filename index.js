const express = require('express');
const path = require('path');
const app = express();
const { typeError } = require('./middlewares/errors');
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.use('/products', require('./routes/products'));
app.use('/categories', require('./routes/categories'));
app.use('/orders', require('./routes/orders'));
app.use('/reviews', require('./routes/reviews'));
app.use('/users', require('./routes/users'));

app.use(typeError);
app.use(
    '/assets/uploads',
    express.static(path.join(__dirname, 'assets', 'uploads'))
);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
