import { unstable_cache } from 'next/cache';

interface Product {
  id: string;
  title: string;
}

export const revalidate = 60;

export const dynamicParams = true;

const products: Product[] = [
  {
    id: '1',
    title: 'Product 1',
  },
  {
    id: '2',
    title: 'Product 2',
  },
];

const getProducts = unstable_cache(
  async () => {
    await new Promise((resolve) => {
      setTimeout(() => resolve(null), 1000);
    });
    return products;
  },
  ['products'],
  { revalidate: 3600, tags: ['products'] }
);

const getProduct = unstable_cache(async (id: string): Promise<Product> => {
  await new Promise((resolve) => {
    setTimeout(() => resolve(null), 1000);
  });
  const p = products.find((p) => p.id === id);
  if (!p) {
    throw new Error('product not found');
  }
  return p;
});

export async function generateStaticParams() {
  return products.map((p) => ({
    id: p.id,
  }));
}

export default async function Page({ params }: { params: { id: string } }) {
  let product = await getProduct(params.id);
  return (
    <main>
      <h1>{product.id}</h1>
      <p>{product.title}</p>
    </main>
  );
}
