// // function AdminFeatures() {
// //     return (
// //         <div>
// //             <h1>Admin Features</h1>
// //         </div>
// //     )
// // }

// // export default AdminFeatures;

// import React from "react";
// import {
//   ShoppingCart,
//   Users,
//   Package,
//   DollarSign,
//   Menu,
//   LogOut,
// } from "lucide-react";

// const AdminFeatures = () => {
//   return (
//     <div className="min-h-screen flex bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-lg hidden md:block">
//         <div className="p-6 text-xl font-bold border-b">Admin Panel</div>
//         <nav className="p-4 space-y-2">
//           <a href="#dashboard" className="block p-2 rounded hover:bg-gray-100">
//             Dashboard
//           </a>
//           <a href="#orders" className="block p-2 rounded hover:bg-gray-100">
//             Orders
//           </a>
//           <a href="#products" className="block p-2 rounded hover:bg-gray-100">
//             Products
//           </a>
//           <a href="#users" className="block p-2 rounded hover:bg-gray-100">
//             Users
//           </a>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1">
//         {/* Top Navbar */}
//         <header className="flex items-center justify-between bg-white p-4 shadow-md">
//           <div className="text-lg font-semibold">Dashboard</div>
//           <div className="flex items-center gap-4">
//             <button className="p-2 rounded-full hover:bg-gray-200">
//               <Menu />
//             </button>
//             <button className="p-2 rounded-full hover:bg-red-100">
//               <LogOut />
//             </button>
//           </div>
//         </header>

//         {/* Dashboard Content */}
//         <main className="p-6 space-y-6">
//           {/* Overview Cards */}
//           <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             <Card title="Total Orders" value="1,234" icon={<ShoppingCart />} />
//             <Card title="Revenue" value="$56,789" icon={<DollarSign />} />
//             <Card title="Products" value="340" icon={<Package />} />
//             <Card title="Users" value="890" icon={<Users />} />
//           </section>

//           {/* Orders Section */}
//           <section id="orders" className="bg-white p-6 rounded shadow">
//             <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
//             <div className="text-gray-500">[Orders Table Placeholder]</div>
//           </section>

//           {/* Products Section */}
//           <section id="products" className="bg-white p-6 rounded shadow">
//             <h2 className="text-xl font-semibold mb-4">Manage Products</h2>
//             <div className="text-gray-500">[Product Management Placeholder]</div>
//           </section>

//           {/* Users Section */}
//           <section id="users" className="bg-white p-6 rounded shadow">
//             <h2 className="text-xl font-semibold mb-4">User Management</h2>
//             <div className="text-gray-500">[User Management Placeholder]</div>
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// };

// const Card = ({ title, value, icon }) => (
//   <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
//     <div className="bg-gray-100 p-2 rounded-full text-gray-600">{icon}</div>
//     <div>
//       <div className="text-sm text-gray-500">{title}</div>
//       <div className="text-lg font-semibold">{value}</div>
//     </div>
//   </div>
// );

// export default AdminFeatures

