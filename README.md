# Styles Currency Converter

A modern, user-friendly currency conversion application built with Node.js and Express. This web application allows users to convert between multiple international currencies using real-time exchange rates.

## Features

- Real-time currency conversion
- Support for 170+ international currencies
- Clean and intuitive user interface
- Responsive design for all devices
- Formatted numerical output with thousands separators

## Tech Stack

- **Backend**: Node.js with Express.js
- **Frontend**: EJS templating engine
- **Styling**: Custom CSS
- **HTTP Client**: Axios
- **Environment Variables**: dotenv

## Prerequisites

Before running this application, make sure you have:

- Node.js (v12 or higher)
- npm (Node Package Manager)
- API key for currency conversion service

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/lord-joeh/currency_converter.git
   cd CurrencyConverter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your API configuration:
   ```env
   PORT=10000
   API_URL=your_api_url_here
   ```

## Usage

1. Start the application:
   ```bash
   npm start
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:10000
   ```

3. Enter the amount you want to convert, select the source currency (From) and target currency (To), then click the convert button.

## Project Structure

```
├── public/
│   ├── images/
│   │   └── swap_icon.png
│   ├── favicon.ico
│   └── styles.css
├── views/
│   └── index.ejs
├── index.js
├── package.json
└── README.md
```

## Dependencies

- `express`: ^4.21.2 - Web application framework
- `ejs`: ^3.1.10 - Templating engine
- `axios`: ^1.7.9 - HTTP client
- `body-parser`: ^1.20.3 - Request body parsing middleware
- `dotenv`: ^16.4.7 - Environment variable management

## License

ISC