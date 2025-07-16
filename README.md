# Styles Currency Converter

A modern, user-friendly currency conversion application built with Node.js and Express. This web application allows users to convert between multiple international currencies using real-time exchange rates.

## Features

- Real-time currency conversion
- Support for 170+ international currencies
- Clean and intuitive user interface
- Responsive design for all devices

## Tech Stack

- **Backend**: Node.js with Express.js
- **Frontend**: React.js
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

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


## License

ISC