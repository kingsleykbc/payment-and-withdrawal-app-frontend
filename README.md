# payment-and-withdrawal-frontend

This [Next.js](https://nextjs.org/) frontend is designed for a comprehensive payment and withdrawal system. It seamlessly integrates with Paystack and offers an intuitive user interface for handling various financial operations.

## Features

- **Paystack-Powered Payments**: Facilitate direct payments using the trusted Paystack gateway.
- **Payment Method Saving**: Allow users to save their preferred payment methods for quicker future transactions.
- **Receipt Generation**: Automatically generate and offer digital receipts upon successful transactions.
- **Paystack-Powered Withdrawals (Payouts)**: Let users initiate withdrawals directly through Paystack's payout system.

## Getting Started

Before diving into the frontend, ensure that the backend server is up and running. Follow the setup instructions on the backend repository: [payment-and-withdrawal-app-server](https://github.com/kingsleykbc/payment-and-withdrawal-app-server).

Once the backend server is operational, clone this frontend repository and navigate to its root directory. Next create an env local file and include the following paystack API keys.

```
TEST_SECRET_KEY=<YOUR_PAYSTACK_TEST_KEY>
TEST_PUBLIC_KEY=<YOUR_PAYSTACK_TEST_KEY>
```

Finally, initiate the development server:

`npm run dev`

Explore the application by opening [http://localhost:3000](http://localhost:3000/) in your browser.

You can start making adjustments to the main page at `pages/index.js`. Real-time changes will reflect in the browser upon saving the file.
