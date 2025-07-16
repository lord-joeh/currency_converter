import { useEffect, useState } from "react";
import "./App.css";
import Input from "./components/Input";
import Button from "./components/Button";
import currencies from "./data/currencies";
import fetchConvention from "./api/fetchConvention";

function App() {
  const [currencyData, setCurrencyData] = useState([]);
  const [formData, setFormData] = useState({
    amount: "",
    from: "USD",
    to: "EUR",
  });
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurrencyData(currencies);
  }, []);

  const handleInputChange = ({ name, value }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSwap = () => {
    setFormData((prev) => ({ ...prev, from: prev.to, to: prev.from }));
    setError(null);
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const { amount, from, to } = formData;

      if (!amount || !from || !to) {
        setError("Please fill in all fields.");
        return;
      }

      if (isNaN(amount)) {
        setError("Amount must be a number.");
        return;
      }

      const fromCurrency = currencyData.find((c) => c.code === from);
      const toCurrency = currencyData.find((c) => c.code === to);

      if (!fromCurrency || !toCurrency) {
        setError("Invalid currency selection.");
        return;
      }

      const data = await fetchConvention({ amount, from, to });

      if (!data || !data.success) {
        setError(data?.error || "Conversion failed");
        return;
      }

      setResult(`${data?.result}`);
    } catch (error) {
      setError(error.message || "An error occurred during conversion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[url(/background.jpg)] bg-cover bg-center bg-no-repeat sm:max-w[95] sm:max-h-screen md:max-w[90vw] lg:max-w[80vw] xl:max-w[70vw] 2xl:max-w[60vw]">
      <h1 className="text-4xl font-bold text-white font-[Source Code Pro] mb-0.5 text-center tracking-wide lg:text-5xl lg:mb-2">
        Styles Currency Converter
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl backdrop-blur-lg flex flex-col items-center justify-center gap-5 rounded-xl bg-gray-100 p-6 sm:p-8 md:p-10 lg:p-12 mx-auto sm:max-w-[98vw] md:max-w-[90vw] xl:max-w-[50vw] fill-white drop-shadow-2xl/50"
      >
        <div className="w-full">
          <p className="text-left text-2xl font-semibold tracking-wide">
            Amount
          </p>
          <Input
            type="text"
            placeholder="Enter amount to convert"
            name="amount"
            value={formData.amount}
            handleChange={handleInputChange}
            disabled={loading}
          />
        </div>
        <div className="w-full z-40 mb-2">
          <p className="text-left text-2xl font-semibold tracking-wide">From</p>
          <Input
            type="text"
            placeholder="Select currency to convert From"
            name="from"
            data={currencyData}
            value={formData.from}
            handleChange={handleInputChange}
            disabled={loading}
          />
        </div>

        <div
          onClick={handleSwap}
          className="absolute w-full flex justify-center mt-3 mb-3"
        >
          <svg
            className="mx-auto z-20 relative hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer group"
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="arrowGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>

            <circle
              cx="12"
              cy="12"
              r="11"
              fill="white"
              stroke="url(#arrowGradient)"
              strokeWidth="1.5"
              className="opacity-90 group-hover:opacity-100 transition-opacity duration-300 shadow-md group-hover:shadow-lg"
            />

            <path
              d="M16.0686 15H7.9313C7.32548 15 7.02257 15 6.88231 15.1198C6.76061 15.2238 6.69602 15.3797 6.70858 15.5393C6.72305 15.7232 6.93724 15.9374 7.36561 16.3657L11.4342 20.4344C11.6323 20.6324 11.7313 20.7314 11.8454 20.7685C11.9458 20.8011 12.054 20.8011 12.1544 20.7685C12.2686 20.7314 12.3676 20.6324 12.5656 20.4344L16.6342 16.3657C17.0626 15.9374 17.2768 15.7232 17.2913 15.5393C17.3038 15.3797 17.2392 15.2238 17.1175 15.1198C16.9773 15 16.6744 15 16.0686 15Z"
              fill="url(#arrowGradient)"
              stroke="url(#arrowGradient)"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M7.9313 9.00005H16.0686C16.6744 9.00005 16.9773 9.00005 17.1175 8.88025C17.2393 8.7763 17.3038 8.62038 17.2913 8.46082C17.2768 8.27693 17.0626 8.06274 16.6342 7.63436L12.5656 3.56573C12.3676 3.36772 12.2686 3.26872 12.1544 3.23163C12.054 3.199 11.9458 3.199 11.8454 3.23163C11.7313 3.26872 11.6323 3.36772 11.4342 3.56573L7.36561 7.63436C6.93724 8.06273 6.72305 8.27693 6.70858 8.46082C6.69602 8.62038 6.76061 8.7763 6.88231 8.88025C7.02257 9.00005 7.32548 9.00005 7.9313 9.00005Z"
              fill="url(#arrowGradient)"
              stroke="url(#arrowGradient)"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="w-full z-30 mt-2">
          <p className="text-left text-2xl font-semibold tracking-wide">To</p>
          <Input
            type="text"
            placeholder="Select currency to convert To"
            name="to"
            data={currencyData}
            value={formData.to}
            handleChange={handleInputChange}
            disabled={loading}
          />
        </div>
        <div className="resultsOrError w-full min-h-[3rem]">
          {error && (
            <p className="text-red-500 text-2xl text-left transition-all duration-300 ease-in-out">
              {error}
            </p>
          )}

          {!error && result && (
            <p className="font-semibold text-2xl text-left transition-all duration-300 ease-in-out">
              {result}
            </p>
          )}
        </div>

        <Button isLoading={loading} disabled={loading} value="Convert" />
      </form>
    </div>
  );
}

export default App;
