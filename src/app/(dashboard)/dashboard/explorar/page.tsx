import { Explorer } from './components/explorer';
import { db } from '@/infra/database/neon-client';

export default async function Explorar() {
  const categories = await getCategories();
  return <Explorer categories={categories} />;
}

async function getCategories() {
  return await db.query.categories.findMany();
}
