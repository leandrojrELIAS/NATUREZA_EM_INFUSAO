document.querySelectorAll('.product-images').forEach(gallery => {
    const images = gallery.querySelectorAll('img');
    let currentIndex = 0;

    setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }, 3000); // Alterna a cada 3 segundos
});
const express = require('express');
const app = express();

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'brl',
                    product_data: {
                        name: 'Pílulas de Revitalização',
                    },
                    unit_amount: 3990, // Preço em centavos
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
    });
    res.json({ id: session.id });
});

app.listen(3000, () => console.log('Server running on port 3000'));
const stripe = Stripe('your-public-key-from-stripe');

document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', async () => {
        const response = await fetch('/create-checkout-session', { method: 'POST' });
        const sessionId = await response.json();
        await stripe.redirectToCheckout({ sessionId });
    });
});
