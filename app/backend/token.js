const jwt = require('jsonwebtoken');

const secret = 'mypersonaldiary2025';
const payload = { userId: 123 };
const token = jwt.sign(payload, secret, { expiresIn: '7d' });

console.log('Generated token:', token);
