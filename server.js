const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

// Example products
const products = [
    { id: 1, name: 'Laptop', description: 'A high performance laptop', price: 999.99, image: 'laptop.jpg' },
    { id: 2, name: 'Desktop', description: 'A powerful desktop computer', price: 799.99, image: 'desktop.jpg' },
    { id: 3, name: 'Mouse', description: 'A wireless mouse', price: 19.99, image: 'mouse.jpg' }
];

app.get('/products', (req, res) => {
    res.json(products);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
