// import { DEFAULT_PAGE, DEFAULT_ITEMS_PER_PAGE } from '@/lib/constants';
// import { fetchCategories } from '@/lib/api/categories';

// import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
// import CategoriesTable from './CategoriesTable';

// export default async function CategoriesPage({searchParams}: { searchParams: { pageNumber?: string; itemsPerPage?: string }}) {
//   const pageNumber = searchParams.pageNumber ? parseInt(searchParams.pageNumber) : DEFAULT_PAGE;
//   const itemsPerPage = searchParams.itemsPerPage ? parseInt(searchParams.itemsPerPage) : DEFAULT_ITEMS_PER_PAGE;

//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery({
//     queryKey: ['posts', pageNumber, itemsPerPage],
//     queryFn: () => fetchCategories(pageNumber, itemsPerPage),
//   });

//   const dehydratedState = dehydrate(queryClient);

//   return (
//     <HydrationBoundary state={dehydratedState}>
//       <CategoriesTable pageNumber={pageNumber} itemsPerPage={itemsPerPage} />
//     </HydrationBoundary>
//   );
// }

// {/* <div className="max-w-5xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Categories</h1>

//       <button
//       onClick={() => router.push('/categories/new')}
//       className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//     >
//       Add New Category
//     </button>

//     </div> */}



import { DEFAULT_PAGE, DEFAULT_ITEMS_PER_PAGE } from '@/lib/constants';
import { fetchCategories } from '@/lib/api/categories';
import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import CategoriesTable from './CategoriesTable';

interface CategoriesPageProps {
  searchParams?: {
    pageNumber?: string;
    itemsPerPage?: string;
  };
}

export default async function CategoriesPage({ searchParams }: CategoriesPageProps) {
  const pageNumber = searchParams?.pageNumber
    ? parseInt(searchParams.pageNumber)
    : DEFAULT_PAGE;
  const itemsPerPage = searchParams?.itemsPerPage
    ? parseInt(searchParams.itemsPerPage)
    : DEFAULT_ITEMS_PER_PAGE;

  const queryClient = new QueryClient();

  // Prefetch categories
  await queryClient.prefetchQuery({
    queryKey: ['categories', pageNumber, itemsPerPage],
    queryFn: () => fetchCategories(pageNumber, itemsPerPage),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CategoriesTable pageNumber={pageNumber} itemsPerPage={itemsPerPage} />
    </HydrationBoundary>
  );
}
