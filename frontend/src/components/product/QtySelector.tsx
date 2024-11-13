interface QuantitySelectorProps {
  qty: number;
  onQtyChange: (qty: number) => void;
  maxQty?: number;
}

export default function QuantitySelector({
  qty,
  onQtyChange,
  maxQty = 9, // Default maxQty to Infinity if not provided
}: QuantitySelectorProps) {
  const increaseQty = () => {
    if (qty < maxQty) {
      onQtyChange(qty + 1);
    }
  };

  const decreaseQty = () => {
    if (qty > 1) {
      onQtyChange(qty - 1);
    }
  };

  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      // Clamp the value to ensure it does not exceed maxQty
      onQtyChange(Math.min(value, maxQty));
    } else if (e.target.value === "") {
      onQtyChange(1); // Allow empty input temporarily
    }
  };

  return (
    <form className="max-w-xs">
      <div className="relative flex items-center max-w-[8rem] border border-gray-300 rounded-lg">
        <button
          type="button"
          id="decrement-button"
          onClick={decreaseQty}
          data-input-counter-decrement="quantity-input"
          className="hover:bg-gray-50 rounded-s-lg p-2"
        >
          <svg
            className="w-3 h-3 text-gray-900"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          value={qty}
          onChange={handleQtyChange}
          type="text"
          id="quantity-input"
          data-input-counter
          aria-describedby="helper-text-explanation"
          className="self-stretch border-x-0 border-gray-300 text-center text-gray-900 text-sm block w-full outline-none"
          placeholder="1"
          required
          min={1}
          max={maxQty}  
        />
        <button
          type="button"
          id="increment-button"
          onClick={increaseQty}
          data-input-counter-increment="quantity-input"
          className="hover:bg-gray-50 rounded-e-lg p-2"
        >
          <svg
            className="w-3 h-3 text-gray-900"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
