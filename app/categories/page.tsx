// import Link from 'next/link';
// import { Category } from '@/lib/validation-schema';
// import SearchFilter from './SearchFilter';
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table" 
// // Mock data fetch function
// async function getCategories(): Promise<Category[]> {
//      // In a real app, you'd fetch this from your database/API
//   return [
//     { id: '1', name: 'Electronics', slug: 'electronics', description: 'Gadgets and devices' },
//     { id: '2', name: 'Books', slug: 'books', description: 'Printed and digital books' },
//     { id: '3', name: 'Apparel', slug: 'apparel', description: 'Clothing and accessories' },
//   ];

//     // const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/apis/categories`;
//     // try {
//     //     const response = await fetch(apiUrl, {cache: 'no-store'});
//     //     if (!response.ok){
//     //         throw new Error('Failed to fetch categories');
//     //     }
//     //     return response.json();
//     // } catch (error){
//     //     console.log(error);
//     //     return [];
//     // }
//  // In a real app, you'd fetch this from your database/API
// //   return [
// //     { id: '1', name: 'Electronics', slug: 'electronics', description: 'Gadgets and devices' },
// //     { id: '2', name: 'Books', slug: 'books', description: 'Printed and digital books' },
// //     { id: '3', name: 'Apparel', slug: 'apparel', description: 'Clothing and accessories' },
// //   ];
// }
 
// export default async function CategoryListPage() {
//   const categories = await getCategories();
 
//   return (
// <>
//     <SearchFilter/>
//       <Table>
//     <TableCaption>A list of your recent invoices.</TableCaption>
//     <TableHeader>
//       <TableRow>
//         <TableHead className="w-[100px]">Invoice</TableHead>
//         <TableHead>Status</TableHead>
//         <TableHead>Method</TableHead>
//         <TableHead className="text-right">Amount</TableHead>
//       </TableRow>
//     </TableHeader>
//     <TableBody>
//       <TableRow>
//         <TableCell className="font-medium">INV001</TableCell>
//         <TableCell>Paid</TableCell>
//         <TableCell>Credit Card</TableCell>
//         <TableCell className="text-right">$250.00</TableCell>
//       </TableRow>
//     </TableBody>
//   </Table>
//     <div className="relative overflow-x-auto bg-white shadow-md sm:rounded-lg">
//       <table className="w-full text-sm text-left text-gray-700">
//         <thead className="bg-gray-50 text-xs uppercase text-gray-500">
//           <tr>
//             <th scope="col" className="px-6 py-3">
//               Name
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Slug
//             </th>
//             <th scope="col" className="px-6 py-3">
//               <span className="sr-only">View</span>
//             </th>
//             <th scope="col" className="px-6 py-3">
//               <span className="sr-only">Edit</span>
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {categories.map((category) => (
//             <tr key={category.id} className="border-b hover:bg-gray-50">
//               <th scope="row" className="whitespace-nowrap px-6 py-4  text-gray-900">
//                 {category.name}
//               </th>
//               <td className="px-6 py-4 font-mono text-gray-600">
//                 {category.slug}
//               </td>
//               <td className="px-6 py-4 text-right">
//                 <Link
//                   href={`/categories/${category.slug}`}
//                   className="font-medium text-blue-600 hover:underline"
//                 >
//                   View Details
//                 </Link>
//               </td>
//               <td className="px-6 py-4 text-right">
//                 <Link
//                   href={`/categories/edit/${category.slug}`}
//                   className="font-medium text-indigo-600 hover:underline"
//                 >
//                   Edit
//                 </Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//      <div className="p-6 bg-white rounded-md shadow-md">
//       <h2 className="font-poppins text-xl font-bold mb-4">Category List</h2>
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm text-left text-gray-700">
//           <thead className="bg-gray-100 uppercase text-xs text-gray-500 ">
//             <tr>
//               <th scope="col" className="px-6 py-3">No.</th>
//               <th scope="col" className="px-6 py-3">Name</th>
//               <th scope="col" className="px-6 py-3">Slug</th>
//               <th scope="col" className="px-6 py-3">Edit</th>
//               <th scope="col" className="px-6 py-3">View Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             {categories.map((category, index) => (
//               <tr key={category.slug} className="border-b hover:bg-gray-50">
//                 <td className="px-6 py-1">{String(index + 1).padStart(2, '0')}</td>
//                 <td className="px-6 py-1 font-medium">{category.name}</td>
//                 <td className="px-6 py-1 text-gray-600">{category.slug}</td>
//                 <td className="px-6 py-1">
//                   <Link href={`/categories/edit/${category.slug}`}>
//                     <span className="text-blue-600 hover:underline cursor-pointer">Edit</span>
//                   </Link>
//                 </td>
//                 <td className="px-6 py-4">
//                   <Link href={`/categories/${category.slug}`}>
//                     <span className="text-green-600 hover:underline cursor-pointer">View</span>
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//     {/* <MyComponent/> */}
// </>
//   );
// }


// 'use client';

// import { useEffect, useState } from 'react';

// type Category = {
//   id: number;
//   name: string;
//   slug: string;
//   description?: string;
// };

// type PaginatedResponse = {
//   count: number;
//   next: string | null;
//   previous: string | null;
//   results: Category[];
// };

// export default function CategoriesPage() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [nextPage, setNextPage] = useState<string | null>(null);
//   const [prevPage, setPrevPage] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   const fetchCategories = async (url = 'http://127.0.0.1:8000/api/categories/') => {
//     setLoading(true);
//     const res = await fetch(url);
//     const data: PaginatedResponse = await res.json();
//     setCategories(data.results);
//     setNextPage(data.next);
//     setPrevPage(data.previous);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Categories</h1>

//       {loading && <p>Loading...</p>}

//       {!loading && (
//         <>
//           <ul className="border rounded p-4 space-y-2">
//             {categories.map((cat) => (
//               <li key={cat.id} className="border-b last:border-0 pb-2">
//                 <strong>{cat.name}</strong> <span className="text-gray-500">({cat.slug})</span>
//               </li>
//             ))}
//           </ul>

//           <div className="flex justify-between mt-4">
//             <button
//               disabled={!prevPage}
//               onClick={() => prevPage && fetchCategories(prevPage)}
//               className={`px-4 py-2 rounded ${
//                 prevPage ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               }`}
//             >
//               Previous
//             </button>

//             <button
//               disabled={!nextPage}
//               onClick={() => nextPage && fetchCategories(nextPage)}
//               className={`px-4 py-2 rounded ${
//                 nextPage ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               }`}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }






'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Category = {
  category_id: number;
  name: string;
  slug: string;
  description?: string;
};

type PaginatedResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Category[];
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const fetchCategories = async (url = 'http://127.0.0.1:8000/api/categories/') => {
    setLoading(true);
    const res = await fetch(url);
    const data: PaginatedResponse = await res.json();
    setCategories(data.results);
    setNextPage(data.next);
    setPrevPage(data.previous);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      <button
      onClick={() => router.push('/categories/new')}
      className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Add New Category
    </button>

      {loading && <p>Loading...</p>}

      {!loading && (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300">
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Slug</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.category_id} className="border-b border-gray-300">
                    <td className="px-4 py-2">{cat.category_id}</td>
                    <td className="px-4 py-2">{cat.name}</td>
                    <td className="px-4 py-2">{cat.slug}</td>
                    <td className="px-4 py-2">{cat.description || '-'}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => router.push(`/categories/${cat.category_id}`)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => router.push(`/categories/${cat.category_id}/edit`)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between mt-4">
            <button
              disabled={!prevPage}
              onClick={() => prevPage && fetchCategories(prevPage)}
              className={`px-4 py-2 rounded ${
                prevPage
                  ? 'bg-gray-800 text-white hover:bg-gray-900'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Previous
            </button>

            <button
              disabled={!nextPage}
              onClick={() => nextPage && fetchCategories(nextPage)}
              className={`px-4 py-2 rounded ${
                nextPage
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
