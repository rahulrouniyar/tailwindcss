import { Metadata } from 'next';
import ProductForm from '@/app/products/components/ProductForm'
// import CategoryProductsTable from '@/app/categories/components/ProductTable'

export const metadata: Metadata = {
  title: 'View Product'

}

type Props = {
    params: {
      slug: string;
    };
};

export default async function CategoryDetailPage({ params }: { params: { slug: string } }) {
    const {slug} = await params;
    const res = await fetch(`http://localhost:8000/api/products/${slug}`, {
      method: "GET",
      cache: "no-store", // ensure fresh data each request
    });
  
    if (!res.ok) {
      // Handle not found or server error
      return <div>Failed to load product</div>;
    }
  
    const product = await res.json();
  
    return (
        <>
            <h2 className='h2-bold'>Product Detail</h2>
            <div className='my-8'>
                <ProductForm
                type="Detail"
                product={product}
                productID={slug}
                />
            </div>
            {/* <CategoryProductsTable categoryId={slug} /> */}
        </>
    );
  }
// export default {CreateCategoryPage};