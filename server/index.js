import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/mini_ecommerce',
});

// Initialize database tables
const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Initialize database
initDb();

// Routes
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/api/products', async (req, res) => {
  const { name, price, description, image_url } = req.body;
  
  if (!name || !price || !description) {
    return res.status(400).json({ error: 'Name, price, and description are required' });
  }
  
  try {
    const result = await pool.query(
      'INSERT INTO products (name, price, description, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, price, description, image_url || null]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Search endpoint
app.get('/api/products/search', async (req, res) => {
  const { query } = req.query;
  
  if (!query) {
    return res.redirect('/api/products');
  }
  
  try {
    const result = await pool.query(
      `SELECT * FROM products 
       WHERE name ILIKE $1 OR description ILIKE $1
       ORDER BY created_at DESC`,
      [`%${query}%`]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ error: 'Failed to search products' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});