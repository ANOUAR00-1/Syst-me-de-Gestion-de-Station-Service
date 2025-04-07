import { useState, useEffect } from 'react';
import {
  CurrencyDollarIcon,
  GasStationIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  // Sample data - Replace with actual API calls
  const [stats, setStats] = useState({
    totalSales: 0,
    fuelTypes: 0,
    lowStock: 0,
    averageDailySales: 0,
  });

  const [recentSales, setRecentSales] = useState([]);
  const [stockAlerts, setStockAlerts] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    setStats({
      totalSales: 15780.50,
      fuelTypes: 4,
      lowStock: 2,
      averageDailySales: 2500.75,
    });

    setRecentSales([
      { id: 1, fuelType: 'Regular Gasoline', quantity: '50L', amount: 175.50, date: '2024-04-07 14:30' },
      { id: 2, fuelType: 'Premium Gasoline', quantity: '30L', amount: 120.75, date: '2024-04-07 13:45' },
      { id: 3, fuelType: 'Diesel', quantity: '100L', amount: 310.25, date: '2024-04-07 12:15' },
    ]);

    setStockAlerts([
      { id: 1, fuelType: 'Regular Gasoline', currentStock: '500L', threshold: '1000L' },
      { id: 2, fuelType: 'Diesel', currentStock: '800L', threshold: '1500L' },
    ]);
  }, []);

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Overview of your gas station operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Sales"
          value={`$${stats.totalSales.toLocaleString()}`}
          icon={CurrencyDollarIcon}
          color="bg-green-500"
        />
        <StatCard
          title="Fuel Types"
          value={stats.fuelTypes}
          icon={GasStationIcon}
          color="bg-blue-500"
        />
        <StatCard
          title="Low Stock Alerts"
          value={stats.lowStock}
          icon={ExclamationTriangleIcon}
          color="bg-red-500"
        />
        <StatCard
          title="Avg. Daily Sales"
          value={`$${stats.averageDailySales.toLocaleString()}`}
          icon={ChartBarIcon}
          color="bg-purple-500"
        />
      </div>

      {/* Recent Sales and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Sales</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fuel Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentSales.map((sale) => (
                  <tr key={sale.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.fuelType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${sale.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stock Alerts */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Low Stock Alerts</h2>
          <div className="space-y-4">
            {stockAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                <div>
                  <p className="font-medium text-red-800">{alert.fuelType}</p>
                  <p className="text-sm text-red-600">
                    Current Stock: {alert.currentStock} / Threshold: {alert.threshold}
                  </p>
                </div>
                <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;