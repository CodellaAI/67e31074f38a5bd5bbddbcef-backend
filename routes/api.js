
const express = require('express');
const router = express.Router();
const Data = require('../models/Data');

// GET: Fetch sample data
router.get('/data', async (req, res) => {
  try {
    // Try to get the most recent data entry
    let data = await Data.findOne().sort({ createdAt: -1 });
    
    // If no data exists, create a sample entry
    if (!data) {
      data = await Data.create({
        message: 'Hello from the backend!',
        items: ['Item 1', 'Item 2', 'Item 3'],
        timestamp: new Date()
      });
    }
    
    res.json({
      message: data.message,
      items: data.items,
      timestamp: data.timestamp
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// POST: Create new data
router.post('/data', async (req, res) => {
  try {
    const { message, items } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const newData = await Data.create({
      message,
      items: items || [],
      timestamp: new Date()
    });
    
    res.status(201).json(newData);
  } catch (error) {
    console.error('Error creating data:', error);
    res.status(500).json({ error: 'Failed to create data' });
  }
});

module.exports = router;
