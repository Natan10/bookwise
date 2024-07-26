import { Suspense } from 'react';

import { db } from '@/infra/database/neon-client';

import { Explorer } from './components/explorer';

export default async function Explorar() {
  const categories = await getCategories();
  return (
    <Suspense fallback={<></>}>
      <Explorer categories={categories} />
    </Suspense>
  );
}

async function getCategories() {
  return await db.query.categories.findMany();
}
