const express = require('express');
const app = express();

app.post('/webhook', express.json(), (req, res) => {
    const signature = req.headers['x-chargily-signature'];
    
    // Verify webhook signature
    // Handle payment status updates
    const { status, payment_id, invoice_number } = req.body;
    
    if (status === 'paid') {
        // Update user subscription status in your database
        // Send confirmation email
        console.log(`Payment ${payment_id} completed successfully`);
    }
    
    res.status(200).send('Webhook received');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
}); 