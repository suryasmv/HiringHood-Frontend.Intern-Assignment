import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";
import "./App.css";

const API_URL = "https://dummyjson.com/products";

const Card = ({ children, className }) => {
  return <div className={`card ${className}`}>{children}</div>;
};

const CardContent = ({ children }) => {
  return <div className="card-content">{children}</div>;
};

const Button = ({ children, onClick, className }) => {
  return (
    <button onClick={onClick} className={`button ${className}`}>
      {children}
    </button>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const filteredProducts = products
    .filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="product-list-container">
      {/* Search and Sort UI */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search products..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select className="sort-dropdown" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="default">Sort by</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Product Cards */}
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card key={product.id}>
              <img src={product.thumbnail} alt={product.title} className="product-image" />
              <CardContent>
                <h2 className="product-title">{product.title}</h2>
                <p className="product-price">${product.price}</p>
                <Link to={`/product/${product.id}`}>
                  <Button>View Details</Button>
                </Link>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details">
      <img src={product.images[0]} alt={product.title} className="details-image" />
      <h1 className="details-title">{product.title}</h1>
      <p className="details-description">{product.description}</p>
      <p className="details-price">${product.price}</p>
      <h3 className="details-reviews-title">Reviews:</h3>
      {product.reviews && product.reviews.length > 0 ? (
        <ul className="reviews-list">
          {product.reviews.map((review, index) => (
            <li key={index} className="review-item">
              <p className="reviewer-name">{review.reviewerName}</p>
              <p className="review-rating">Rating: {review.rating}/5</p>
              <p className="review-comment">{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="container">
        <h1 className="app-title">Product Listing</h1>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
