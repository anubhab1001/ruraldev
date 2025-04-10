import React from 'react';
import { Link } from 'react-router-dom';

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

const AdminPanel = () => {
  const [products, setProducts] = React.useState(productDatabase);
  const [transactions, setTransactions] = React.useState(transactionLog);

  // Admin actions
  const approveProduct = (productId) => {
    const updatedProducts = products.map(p => 
      p.id === productId ? {...p, approved: true} : p
    );
    setProducts(updatedProducts);
    productDatabase = updatedProducts;
  };

  const featureProduct = (productId) => {
    const updatedProducts = products.map(p => 
      p.id === productId ? {...p, featured: !p.featured} : p
    );
    setProducts(updatedProducts);
    productDatabase = updatedProducts;
  };

  const rejectProduct = (productId) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
    productDatabase = updatedProducts;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-8">
      <Link to="/" className="text-blue-600 hover:underline block mb-4">
        ← Back to Marketplace
      </Link>

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

export default AdminPanel;