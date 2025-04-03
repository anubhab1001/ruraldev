import React, { useState } from 'react';

const WomensMarketplace = () => {
  // Product data state
  const [products, setProducts] = useState([
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
  ]);

  // UI state
  const [view, setView] = useState('marketplace'); // 'marketplace' or 'admin'
  const [showProductModal, setShowProductModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // Admin actions
  const approveProduct = (productId) => {
    setProducts(products.map(p => 
      p.id === productId ? {...p, approved: true} : p
    ));
  };

  const featureProduct = (productId) => {
    setProducts(products.map(p => 
      p.id === productId ? {...p, featured: true} : p
    ));
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
                <button className="bg-white text-blue-700 px-6 py-2 rounded-lg font-medium">
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
        ) : (
          /* Admin Panel */
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
            
            {/* Approval Queue */}
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
                          className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                        >
                          Approve
                        </button>
                        <button className="bg-gray-200 px-3 py-1 rounded text-sm">
                          Request Changes
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No products waiting for approval</p>
              )}
            </div>

            {/* Featured Products Management */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Manage Featured Products</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.filter(p => p.approved).map(product => (
                  <div key={product.id} className="border rounded-lg p-3">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                    <h4 className="font-bold text-sm">{product.name}</h4>
                    <button 
                      onClick={() => featureProduct(product.id)}
                      disabled={product.featured}
                      className={`mt-2 w-full text-sm py-1 rounded ${
                        product.featured 
                          ? 'bg-blue-400 text-gray-800' 
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      {product.featured ? 'Featured' : 'Make Featured'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg flex-grow hover:bg-blue-700">
                  Contact Seller
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

export default WomensMarketplace;