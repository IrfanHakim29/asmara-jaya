// This file contains the remaining admin tab render functions
// Add this code to the end of admin page.tsx before the closing brace

export function renderOrdersTab(orders: any[], handleOrderStatusChange: any, formatPrice: any, getStatusColor: any, getStatusIcon: any) {
  return `
  function renderOrdersTab() {
    return (
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Manajemen Pesanan</h2>
          <p className="text-gray-600">Kelola pesanan pelanggan</p>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-[#faf8f3] to-[#f5e6e8] rounded-2xl p-6 border border-[#d4a5a5]/20"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Pesanan #{order.id}</h3>
                    <span className={\`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 \${getStatusColor(order.status)}\`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#c48b8b]">{formatPrice(order.total)}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Pelanggan</p>
                  <p className="font-medium text-gray-800">{order.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Produk</p>
                  <p className="font-medium text-gray-800">{order.product}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Jumlah</p>
                  <p className="font-medium text-gray-800">{order.quantity} pcs</p>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  onClick={() => handleOrderStatusChange(order.id, "processing")}
                  className="bg-blue-500 text-white hover:bg-blue-600"
                  disabled={order.status === "processing" || order.status === "completed"}
                >
                  Proses
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleOrderStatusChange(order.id, "completed")}
                  className="bg-green-500 text-white hover:bg-green-600"
                  disabled={order.status === "completed"}
                >
                  Selesai
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleOrderStatusChange(order.id, "cancelled")}
                  variant="outline"
                  className="border-red-300 text-red-500 hover:bg-red-50"
                  disabled={order.status === "completed" || order.status === "cancelled"}
                >
                  Batalkan
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-4 border border-yellow-200">
            <div className="text-2xl font-bold text-yellow-700">{orders.filter(o => o.status === "pending").length}</div>
            <div className="text-sm text-yellow-600">Pending</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200">
            <div className="text-2xl font-bold text-blue-700">{orders.filter(o => o.status === "processing").length}</div>
            <div className="text-sm text-blue-600">Processing</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 border border-green-200">
            <div className="text-2xl font-bold text-green-700">{orders.filter(o => o.status === "completed").length}</div>
            <div className="text-sm text-green-600">Completed</div>
          </div>
          <div className="bg-gradient-to-br from-[#f5e6e8] to-[#faf8f3] rounded-2xl p-4 border border-[#d4a5a5]/20">
            <div className="text-2xl font-bold text-[#c48b8b]">{formatPrice(orders.reduce((acc, o) => acc + o.total, 0))}</div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </div>
        </div>
      </div>
    );
  }
  `;
}
