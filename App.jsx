import React from 'react';

export default function AadhyaCafeApp() {
  const menuItems = [
    {
      id: 1,
      name: 'Chicken Burger',
      price: 150,
      category: 'Fast Food',
      available: true,
      image:
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 2,
      name: 'French Fries',
      price: 150,
      category: 'Snacks',
      available: true,
      image:
        'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 3,
      name: 'Cold Coffee',
      price: 180,
      category: 'Beverages',
      available: true,
      image:
        'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  const [cart, setCart] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [chefOrders, setChefOrders] = React.useState([]);
  const [paid, setPaid] = React.useState(false);

  const addToCart = (item) => {
    const existing = cart.find((c) => c.id === item.id);

    if (existing) {
      setCart(
        cart.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const vat = subtotal * 0.13;
  const total = subtotal + vat;

  const placeOrder = () => {
    if (cart.length === 0) return;

    const newOrder = {
      id: Date.now(),
      items: cart,
      total,
      status: 'Pending',
    };

    setOrders([...orders, newOrder]);
    setChefOrders([...chefOrders, newOrder]);
    setCart([]);
  };

  const updateChefStatus = (id, status) => {
    setChefOrders(
      chefOrders.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <h1 className="text-4xl font-bold text-center text-orange-600">
            AADHYA FAST FOOD AND CAFE
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Menu</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-2xl overflow-hidden shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-44 object-cover"
                  />

                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <span className="text-orange-600 font-semibold">
                        Rs. {item.price}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                      {item.category}
                    </p>

                    <button
                      onClick={() => addToCart(item)}
                      className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Customer Order</h2>

            {cart.length === 0 ? (
              <p className="text-gray-500">No items added.</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between border-b pb-2"
                  >
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold">
                      Rs. {item.price * item.quantity}
                    </p>
                  </div>
                ))}

                <div className="pt-4 border-t space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>VAT (13%)</span>
                    <span>Rs. {vat.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>Rs. {total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={placeOrder}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
                >
                  Place Order
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Chef Dashboard</h2>

            {chefOrders.length === 0 ? (
              <p className="text-gray-500">No incoming orders.</p>
            ) : (
              <div className="space-y-4">
                {chefOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border rounded-2xl p-4"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-bold">Order #{order.id}</h3>
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                        {order.status}
                      </span>
                    </div>

                    <ul className="text-sm text-gray-600 mb-4 list-disc ml-5">
                      {order.items.map((item) => (
                        <li key={item.id}>
                          {item.name} × {item.quantity}
                        </li>
                      ))}
                    </ul>

                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() =>
                          updateChefStatus(order.id, 'Preparing')
                        }
                        className="bg-yellow-500 text-white px-3 py-2 rounded-lg"
                      >
                        Preparing
                      </button>

                      <button
                        onClick={() => updateChefStatus(order.id, 'Ready')}
                        className="bg-blue-500 text-white px-3 py-2 rounded-lg"
                      >
                        Ready
                      </button>

                      <button
                        onClick={() => updateChefStatus(order.id, 'Completed')}
                        className="bg-green-600 text-white px-3 py-2 rounded-lg"
                      >
                        Completed
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              QR Payment & Bill
            </h2>

            <div className="flex flex-col items-center">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=AadhyaCafePayment"
                alt="QR Code"
                className="rounded-2xl border"
              />

              <p className="mt-4 text-gray-600 text-center">
                Scan this QR to pay online.
              </p>

              <button
                onClick={() => setPaid(true)}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl"
              >
                Confirm Payment
              </button>

              {paid && (
                <div className="mt-6 w-full bg-green-100 border border-green-300 rounded-2xl p-4">
                  <h3 className="font-bold text-green-700 text-lg">
                    Payment Successful
                  </h3>

                  <p className="text-sm text-gray-700 mt-2">
                    Digital bill has been generated successfully.
                  </p>

                  <div className="mt-4 text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>Rs. {subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>VAT</span>
                      <span>Rs. {vat.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between font-bold">
                      <span>Total Paid</span>
                      <span>Rs. {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
}

