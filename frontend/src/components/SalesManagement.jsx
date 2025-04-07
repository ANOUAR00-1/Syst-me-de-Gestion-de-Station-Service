import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { PlusIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const SalesManagement = () => {
  const [sales, setSales] = useState([]);
  const [fuels, setFuels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fuelId: '',
    quantity: '',
    paymentMethod: 'cash',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate fetching fuels data
    setFuels([
      { id: 1, name: 'Regular Gasoline', price: 3.50, quantity: 1500 },
      { id: 2, name: 'Premium Gasoline', price: 4.20, quantity: 1200 },
      { id: 3, name: 'Diesel', price: 3.80, quantity: 2000 },
    ]);

    // Simulate fetching sales data
    setSales([
      { 
        id: 1, 
        fuelName: 'Regular Gasoline', 
        quantity: 30, 
        unitPrice: 3.50,
        total: 105.00,
        paymentMethod: 'cash',
        date: '2024-04-07 15:30:00' 
      },
      { 
        id: 2, 
        fuelName: 'Premium Gasoline', 
        quantity: 25, 
        unitPrice: 4.20,
        total: 105.00,
        paymentMethod: 'card',
        date: '2024-04-07 14:45:00' 
      },
    ]);
  }, []);

  const calculateTotal = () => {
    const selectedFuel = fuels.find(f => f.id === parseInt(formData.fuelId));
    if (!selectedFuel || !formData.quantity) return 0;
    return (selectedFuel.price * parseFloat(formData.quantity)).toFixed(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form data
      if (!formData.fuelId || !formData.quantity || parseFloat(formData.quantity) <= 0) {
        throw new Error('Please fill in all fields correctly');
      }

      const selectedFuel = fuels.find(f => f.id === parseInt(formData.fuelId));
      if (!selectedFuel) throw new Error('Invalid fuel selection');

      if (parseFloat(formData.quantity) > selectedFuel.quantity) {
        throw new Error('Insufficient fuel stock');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create new sale record
      const newSale = {
        id: Date.now(),
        fuelName: selectedFuel.name,
        quantity: parseFloat(formData.quantity),
        unitPrice: selectedFuel.price,
        total: parseFloat(calculateTotal()),
        paymentMethod: formData.paymentMethod,
        date: new Date().toISOString().slice(0, 19).replace('T', ' ')
      };

      setSales(prev => [newSale, ...prev]);
      
      // Update fuel quantity
      setFuels(prev => prev.map(fuel => 
        fuel.id === parseInt(formData.fuelId)
          ? { ...fuel, quantity: fuel.quantity - parseFloat(formData.quantity) }
          : fuel
      ));

      toast.success('Sale recorded successfully');
      handleCloseModal();
    } catch (error) {
      toast.error(error.message || 'Failed to record sale');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      fuelId: '',
      quantity: '',
      paymentMethod: 'cash',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Management</h1>
          <p className="text-gray-500">Record and manage fuel sales</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          New Sale
        </button>
      </div>

      {/* Sales List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fuel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sales.map((sale) => (
                <tr key={sale.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sale.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {sale.fuelName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sale.quantity}L
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${sale.unitPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${sale.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      sale.paymentMethod === 'cash' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {sale.paymentMethod.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Sale Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Record New Sale</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
                <select
                  name="fuelId"
                  value={formData.fuelId}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                >
                  <option value="">Select Fuel</option>
                  {fuels.map(fuel => (
                    <option key={fuel.id} value={fuel.id}>
                      {fuel.name} - ${fuel.price}/L (Stock: {fuel.quantity}L)
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Quantity (L)</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="0.1"
                  step="0.1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                >
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                </select>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Total Amount:</span>
                  <span className="text-lg font-bold text-gray-900">${calculateTotal()}</span>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:bg-blue-400"
                >
                  {isLoading && <ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />}
                  Record Sale
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesManagement;