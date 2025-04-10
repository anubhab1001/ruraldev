import React, { useState } from 'react';

// Mock database for demonstration
let productDatabase = [
  {
    id: 1,
    name: 'Handmade Ceramic Mug',
    seller: 'Priya Sharma',
    price: 12.99,
    category: 'Home Decor',
    description: 'Beautiful hand-painted ceramic mug, food-safe glaze',
    image: 'https://via.placeholder.com/300x300?text=Ceramic+Mug',
    approved: true,
    featured: false
  },
  {
    id: 2,
    name: 'Organic Cotton Tote Bag',
    seller: 'Maria Gonzalez',
    price: 18.50,
    category: 'Fashion',
    description: 'Eco-friendly cotton bag with hand-stitched design',
    image: 'https://via.placeholder.com/300x300?text=Cotton+Tote',
    approved: false,
    featured: false
  }
];

let transactionLog = [];

const WomensMarketplace = () => {
  // Product data state
  const [products, setProducts] = useState(productDatabase);
  const [transactions, setTransactions] = useState(transactionLog);

  // UI state
  const [view, setView] = useState('marketplace'); // 'marketplace', 'sell', or 'admin'
  const [showProductModal, setShowProductModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: ''
  });

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitProduct = (e) => {
    e.preventDefault();
    const product = {
      id: products.length + 1,
      name: newProduct.name,
      seller: 'Current User', // In a real app, this would be the logged-in user
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      description: newProduct.description,
      image: newProduct.image || 'https://via.placeholder.com/300x300?text=Product+Image',
      approved: false, // Needs admin approval
      featured: false
    };
    
    setProducts([...products, product]);
    productDatabase = [...products, product]; // Update mock DB
    setNewProduct({
      name: '',
      price: '',
      category: '',
      description: '',
      image: ''
    });
    setView('marketplace');
    alert('Your product has been submitted for approval!');
  };

  // Purchase function
  const handlePurchase = (product) => {
    const transaction = {
      id: transactions.length + 1,
      productId: product.id,
      productName: product.name,
      buyer: 'Current User', // In a real app, this would be the logged-in user
      seller: product.seller,
      price: product.price,
      date: new Date().toISOString()
    };
    
    setTransactions([...transactions, transaction]);
    transactionLog = [...transactions, transaction]; // Update mock DB
    alert(`Thank you for purchasing ${product.name}!`);
    setShowProductModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Women's Collective Marketplace</h1>
          <div className="space-x-4">
            <button 
              onClick={() => setView('marketplace')}
              className={`px-4 py-2 rounded-md ${view === 'marketplace' ? 'bg-white text-blue-700' : 'text-white'}`}
            >
              Marketplace
            </button>
            <button 
              onClick={() => setView('sell')}
              className={`px-4 py-2 rounded-md ${view === 'sell' ? 'bg-white text-blue-700' : 'text-white'}`}
            >
              Sell Products
            </button>
            <button 
              onClick={() => setView('admin')}
              className={`px-4 py-2 rounded-md ${view === 'admin' ? 'bg-white text-blue-700' : 'text-white'}`}
            >
              Admin Panel
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {view === 'marketplace' ? (
          <>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white p-8 mb-8">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold mb-4">Empowering Women Entrepreneurs</h2>
                <p className="text-lg mb-6">
                  Discover unique handmade products and support women-owned businesses
                </p>
                <button 
                  onClick={() => setView('sell')}
                  className="bg-white text-blue-700 px-6 py-2 rounded-lg font-medium"
                >
                  Sell Your Products
                </button>
              </div>
            </section>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.filter(p => p.approved).map(product => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    {product.featured && (
                      <span className="absolute top-2 left-2 bg-blue-400 text-xs font-bold px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">by {product.seller}</p>
                    <p className="text-blue-700 font-bold mb-3">${product.price}</p>
                    <button 
                      onClick={() => {
                        setCurrentProduct(product);
                        setShowProductModal(true);
                      }}
                      className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : view === 'sell' ? (
          /* Sell Products Form */
          <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Sell Your Product</h2>
            <form onSubmit={handleSubmitProduct}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="price">
                  Price ($)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="category">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home Decor">Home Decor</option>
                  <option value="Jewelry">Jewelry</option>
                  <option value="Art">Art</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  rows="4"
                  required
                ></textarea>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="image">
                  Image URL (optional)
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={newProduct.image}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setView('marketplace')}
                  className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Submit Product
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Admin Panel */
          <AdminPanel 
            products={products} 
            setProducts={setProducts} 
            transactions={transactions} 
          />
        )}
      </main>

      {/* Product Detail Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={currentProduct.image} 
                alt={currentProduct.name}
                className="w-full h-64 object-cover"
              />
              <button 
                onClick={() => setShowProductModal(false)}
                className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{currentProduct.name}</h2>
                  <p className="text-blue-700 font-bold text-lg">${currentProduct.price}</p>
                </div>
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                  {currentProduct.category}
                </span>
              </div>
              
              <p className="text-gray-600 mb-2">Sold by: {currentProduct.seller}</p>
              <p className="mb-6">{currentProduct.description}</p>
              
              <div className="flex space-x-4">
                <button 
                  onClick={() => handlePurchase(currentProduct)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg flex-grow hover:bg-blue-700"
                >
                  Buy Now
                </button>
                <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50">
                  Save for Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Separate Admin Panel Component
const AdminPanel = ({ products, setProducts, transactions }) => {
  // Admin actions
  const approveProduct = (productId) => {
    const updatedProducts = products.map(p => 
      p.id === productId ? {...p, approved: true} : p
    );
    setProducts(updatedProducts);
    productDatabase = updatedProducts; // Update mock DB
  };

  const featureProduct = (productId) => {
    const updatedProducts = products.map(p => 
      p.id === productId ? {...p, featured: !p.featured} : p
    );
    setProducts(updatedProducts);
    productDatabase = updatedProducts; // Update mock DB
  };

  const rejectProduct = (productId) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
    productDatabase = updatedProducts; // Update mock DB
  };

  return (
    <div className="space-y-8">
      {/* Approval Queue */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Product Approval Queue</h2>
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">
              {products.filter(p => !p.approved).length}
            </span>
            Products Needing Approval
          </h3>
          
          {products.filter(p => !p.approved).length > 0 ? (
            <div className="space-y-4">
              {products.filter(p => !p.approved).map(product => (
                <div key={product.id} className="border rounded-lg p-4 flex flex-col sm:flex-row">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full sm:w-24 h-24 object-cover rounded mb-2 sm:mb-0 sm:mr-4"
                  />
                  <div className="flex-grow">
                    <h4 className="font-bold">{product.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">by {product.seller}</p>
                    <p className="text-sm mb-2">{product.description}</p>
                    <p className="font-bold text-blue-700">${product.price}</p>
                  </div>
                  <div className="flex space-x-2 mt-2 sm:mt-0 sm:flex-col sm:space-x-0 sm:space-y-2">
                    <button 
                      onClick={() => approveProduct(product.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => rejectProduct(product.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No products waiting for approval</p>
          )}
        </div>
      </div>

      {/* Featured Products Management */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.filter(p => p.approved).map(product => (
            <div key={product.id} className="border rounded-lg p-3">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <h4 className="font-bold text-sm">{product.name}</h4>
              <p className="text-sm text-gray-600 mb-1">${product.price}</p>
              <button 
                onClick={() => featureProduct(product.id)}
                className={`mt-2 w-full text-sm py-1 rounded ${
                  product.featured 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {product.featured ? 'Featured ★' : 'Make Featured'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction Log */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Transaction Log</h2>
        {transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.productName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.buyer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.seller}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${transaction.price.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No transactions yet</p>
        )}
      </div>
    </div>
  );
};

export default WomensMarketplace;