import { db } from '../db';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(6),
  companyName: z.string().min(2),
});

export const auth = {
  login: async (data: z.infer<typeof loginSchema>) => {
    const validated = loginSchema.parse(data);
    const user = await db.users.findByEmail(validated.email);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // In a real app, you'd verify the password here
    return user;
  },

  register: async (data: z.infer<typeof registerSchema>) => {
    const validated = registerSchema.parse(data);
    
    const existingUser = await db.users.findByEmail(validated.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    return db.users.create({
      email: validated.email,
      name: validated.name,
      password: validated.password, // In a real app, hash this password
      role: 'user'
    });
  },
};