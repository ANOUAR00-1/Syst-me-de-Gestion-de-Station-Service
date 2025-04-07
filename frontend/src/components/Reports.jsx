import { useState, useEffect } from 'react';
import { CalendarIcon, DocumentChartBarIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

const Reports = () => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });
  const [reportType, setReportType] = useState('sales');
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateReport = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Sample data - Replace with actual API data
      const sampleSalesData = {
        totalSales: 12580.75,
        transactions: 45,
        averageTransaction: 279.57,
        fuelsSold: [
          { name: 'Regular Gasoline', quantity: 1500, revenue: 5250.00 },
          { name: 'Premium Gasoline', quantity: 800, revenue: 3360.00 },
          { name: 'Diesel', quantity: 1200, revenue: 3970.75 },
        ],
        paymentMethods: {
          cash: 7548.45,
          card: 5032.30,
        },
      };

      const sampleInventoryData = {
        currentStock: [
          { name: 'Regular Gasoline', quantity: 2500, value: 8750.00 },
          { name: 'Premium Gasoline', quantity: 1800, value: 7560.00 },
          { name: 'Diesel', quantity: 3000, value: 11400.00 },
        ],
        lowStock: [
          { name: 'Premium Gasoline', current: 1800, threshold: 2000 },
        ],
        totalValue: 27710.00,
      };

      setReportData(reportType === 'sales' ? sampleSalesData : sampleInventoryData);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExport = () => {
    // In a real application, this would generate and download a PDF/Excel file
    alert('Export functionality would generate a downloadable report file');
  };

  const SalesReport = ({ data }) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total Sales</h3>
          <p className="text-2xl font-bold text-blue-600">${data.totalSales.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Transactions</h3>
          <p className="text-2xl font-bold text-blue-600">{data.transactions}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Average Transaction</h3>
          <p className="text-2xl font-bold text-blue-600">${data.averageTransaction.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Fuels Sold</h3>
          <div className="space-y-4">
            {data.fuelsSold.map((fuel, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{fuel.name}</p>
                  <p className="text-sm text-gray-500">{fuel.quantity}L sold</p>
                </div>
                <p className="font-medium text-gray-900">${fuel.revenue.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Methods</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="font-medium text-gray-900">Cash</p>
              <p className="font-medium text-gray-900">${data.paymentMethods.cash.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-medium text-gray-900">Card</p>
              <p className="font-medium text-gray-900">${data.paymentMethods.card.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const InventoryReport = ({ data }) => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">Current Stock Value</h3>
          <p className="text-2xl font-bold text-blue-600">${data.totalValue.toFixed(2)}</p>
        </div>
        <div className="space-y-4">
          {data.currentStock.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">{item.quantity}L in stock</p>
              </div>
              <p className="font-medium text-gray-900">${item.value.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      {data.lowStock.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Low Stock Alerts</h3>
          <div className="space-y-4">
            {data.lowStock.map((item, index) => (
              <div key={index} className="bg-red-50 p-4 rounded-lg">
                <p className="font-medium text-red-800">{item.name}</p>
                <p className="text-sm text-red-600">
                  Current: {item.current}L / Threshold: {item.threshold}L
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-500">Generate and view detailed reports</p>
        </div>
        {reportData && (
          <button
            onClick={handleExport}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
            Export Report
          </button>
        )}
      </div>

      {/* Report Controls */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="date"
                name="startDate"
                value={dateRange.startDate}
                onChange={handleDateChange}
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="date"
                name="endDate"
                value={dateRange.endDate}
                onChange={handleDateChange}
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="sales">Sales Report</option>
              <option value="inventory">Inventory Report</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={generateReport}
            disabled={isLoading}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {isLoading ? (
              <>
                <CalendarIcon className="w-5 h-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <DocumentChartBarIcon className="w-5 h-5 mr-2" />
                Generate Report
              </>
            )}
          </button>
        </div>
      </div>

      {/* Report Content */}
      {reportData && (
        <div className="mt-6">
          {reportType === 'sales' ? (
            <SalesReport data={reportData} />
          ) : (
            <InventoryReport data={reportData} />
          )}
        </div>
      )}
    </div>
  );
};

export default Reports;