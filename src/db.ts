import Dexie, { type EntityTable } from 'dexie';

interface Secret {
  id: number;
  secretKey: string;
  secretValue: string;
}

const db = new Dexie('SecretsDatabase') as Dexie & {
  secrets: EntityTable<
    Secret,
    'id'
  >;
};

// Schema declaration:
db.version(1).stores({
  secrets: '++id, secretKey, secretValue'
});

export type { Secret };
export { db };