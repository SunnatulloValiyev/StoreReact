import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrement, increment } from "../app/feature/CartSlice";
import { useState } from "react";

function Product({ product }) {
  const dispatch = useDispatch();
  const [showControls, setShowControls] = useState(false);

  const cartItems = useSelector((state) => state.cart?.cart || []);
  const isAdded = cartItems.find((item) => item.id === product.id);

  const handleBuy = (e) => {
    e.preventDefault();
    dispatch(
      addToCart({
        ...product,
        amount: 1,
      })
    );
    setShowControls(true);
  };

  return (
        <div className="relative bg-white border border-gray-200 rounded-xl shadow-lg transition-transform hover:scale-[1.02] hover:shadow-xl overflow-hidden">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-64 object-cover"
            />
          </Link>

          <div className="p-5 space-y-3">
            <h2 className="text-xl font-semibold text-gray-800">
              {product.title}
            </h2>
            <p className="text-gray-600 text-sm">
              {product.description.substring(0, 80)}...
            </p>

            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-green-600">
                ${product.price}
              </span>
              <span className="text-yellow-500 text-sm">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < Math.floor(product.rating) ? "⭐" : "☆"}
                  </span>
                ))}
                ({product.rating})
              </span>
            </div>

            <div className="text-xs text-gray-500">
              In stock: {product.stock}
            </div>

            {!isAdded ? (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={handleBuy}
                  className="btn btn-active btn-success"
                >
                  Buy Now
                </button>
              </div>
            ) : (
              <div
                className={`absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
                  showControls ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => dispatch(decrement(product.id))}
                    className="bg-red-500 text-white w-10 h-10 rounded-full text-lg hover:bg-red-600"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">
                    {isAdded.amount}
                  </span>
                  <button
                    onClick={() => dispatch(increment(product.id))}
                    className="bg-green-500 text-white w-10 h-10 rounded-full text-lg hover:bg-green-600"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
);
}

export default Product;
