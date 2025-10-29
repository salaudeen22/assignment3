function ReceiptModal({ receipt, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-2xl border border-gray-200">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h2>
          <p className="text-sm text-gray-600">Thank you for your purchase</p>
        </div>

        <div className="mb-8 space-y-6 bg-gray-50 rounded-xl p-6">
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Order ID</div>
            <div className="font-mono text-sm font-semibold text-gray-900 bg-white px-3 py-2 rounded-lg border border-gray-200">{receipt.orderId}</div>
          </div>

          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Customer Details</div>
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <div className="text-sm font-semibold text-gray-900">{receipt.customerName}</div>
              <div className="text-sm text-gray-600 mt-1">{receipt.customerEmail}</div>
            </div>
          </div>

          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Order Items</div>
            <div className="space-y-2 bg-white rounded-lg border border-gray-200 p-3">
              {receipt.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm py-1.5 border-b border-gray-100 last:border-0">
                  <span className="text-gray-700 font-medium">
                    {item.name} <span className="text-gray-500">× {item.quantity}</span>
                  </span>
                  <span className="text-gray-900 font-semibold">₹{item.subtotal.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t-2 border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-base font-bold text-gray-900">Total Paid</span>
              <span className="text-xl font-bold text-gray-900">₹{receipt.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="text-center pt-2">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {new Date(receipt.timestamp).toLocaleString()}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 transition-all shadow-md hover:shadow-lg"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default ReceiptModal;
