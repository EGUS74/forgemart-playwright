export const users = {
  admin: { email: 'admin@forgemart.test', password: 'Admin123!' },
  support: { email: 'support@forgemart.test', password: 'Support123!' },
  inventory: { email: 'inventory@forgemart.test', password: 'Inventory123!' },
  customer: { email: 'customer1@forgemart.test', password: 'Customer123!' },
} as const;

export type UserRole = keyof typeof users;