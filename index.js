const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// endpoints de productos
app.use('/products', require('./routes/products'));

//endpoints de categorías
app.use('/categories', require('./routes/categories'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
