import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const plantsArray = [
    {
      category: 'Air Purifying Plants',
      plants: [
        {
          name: 'Snake Plant',
          image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg',
          description: 'Produces oxygen at night and requires minimal care.',
          cost: '$15',
        },
        {
          name: 'Spider Plant',
          image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg',
          description: 'Filters indoor toxins and thrives in indirect light.',
          cost: '$12',
        },
        {
          name: 'Peace Lily',
          image: 'https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg',
          description: 'Elegant white blooms with strong air-cleaning ability.',
          cost: '$18',
        },
      ],
    },
    {
      category: 'Aromatic Fragrant Plants',
      plants: [
        {
          name: 'Lavender',
          image: 'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop',
          description: 'Calming fragrance ideal for bedrooms and relaxation spaces.',
          cost: '$20',
        },
        {
          name: 'Jasmine',
          image: 'https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop',
          description: 'Sweet-scented blossoms that brighten sunny indoor spots.',
          cost: '$18',
        },
      ],
    },
    {
      category: 'Low Maintenance Plants',
      plants: [
        {
          name: 'ZZ Plant',
          image: 'https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg',
          description: 'Tolerates low light and infrequent watering easily.',
          cost: '$25',
        },
        {
          name: 'Pothos',
          image: 'https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg',
          description: 'Trailing vines that adapt quickly to homes or offices.',
          cost: '$10',
        },
      ],
    },
  ];

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({
      ...prev,
      [plant.name]: true,
    }));
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handleContinueShopping = (e) => {
    if (e) e.preventDefault();
    setShowCart(false);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    setShowCart(false);
    if (onHomeClick) onHomeClick();
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand" onClick={handleHomeClick}>
          <h3>Paradise Nursery</h3>
          <span>Where Green Meets Serenity</span>
        </div>
        <div className="navbar-links">
          <a href="#plants" onClick={handleContinueShopping}>Plants</a>
          <a href="#cart" onClick={handleCartClick} className="cart-link">
            Cart (<span data-testid="cart-count">{totalQuantity}</span>)
          </a>
        </div>
      </nav>

      {!showCart ? (
        <div id="plants" className="product-grid">
          {plantsArray.map((categoryObj) => (
            <div key={categoryObj.category} className="category-section">
              <h2 className="category-title">{categoryObj.category}</h2>
              <div className="plants-container">
                {categoryObj.plants.map((plant) => {
                  const isAdded = Boolean(addedToCart[plant.name]);
                  return (
                    <div key={plant.name} className="plant-card">
                      <img
                        src={plant.image}
                        alt={plant.name}
                        className="plant-image"
                      />
                      <h3 className="plant-name">{plant.name}</h3>
                      <p className="plant-description">{plant.description}</p>
                      <p className="plant-cost">{plant.cost}</p>
                      <button
                        type="button"
                        className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
                        disabled={isAdded}
                        onClick={() => handleAddToCart(plant)}
                      >
                        {isAdded ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
