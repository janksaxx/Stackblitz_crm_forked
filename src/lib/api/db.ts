import { prisma } from '../db';

export const db = {
  // Users
  users: {
    create: (data: any) => prisma.user.create({ data }),
    findById: (id: string) => prisma.user.findUnique({ where: { id } }),
    findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),
    update: (id: string, data: any) => prisma.user.update({ where: { id }, data }),
    delete: (id: string) => prisma.user.delete({ where: { id } }),
  },

  // Contacts
  contacts: {
    create: (data: any) => prisma.contact.create({ data }),
    findById: (id: string) => prisma.contact.findUnique({ 
      where: { id },
      include: { company: true }
    }),
    findByUser: (userId: string) => prisma.contact.findMany({ 
      where: { userId },
      include: { company: true }
    }),
    update: (id: string, data: any) => prisma.contact.update({ where: { id }, data }),
    delete: (id: string) => prisma.contact.delete({ where: { id } }),
  },

  // Companies
  companies: {
    create: (data: any) => prisma.company.create({ data }),
    findById: (id: string) => prisma.company.findUnique({
      where: { id },
      include: { contacts: true }
    }),
    findByUser: (userId: string) => prisma.company.findMany({
      where: { userId },
      include: { contacts: true }
    }),
    update: (id: string, data: any) => prisma.company.update({ where: { id }, data }),
    delete: (id: string) => prisma.company.delete({ where: { id } }),
  },

  // Deals
  deals: {
    create: (data: any) => prisma.deal.create({ data }),
    findById: (id: string) => prisma.deal.findUnique({
      where: { id },
      include: { contact: true, company: true }
    }),
    findByUser: (userId: string) => prisma.deal.findMany({
      where: { userId },
      include: { contact: true, company: true }
    }),
    update: (id: string, data: any) => prisma.deal.update({ where: { id }, data }),
    delete: (id: string) => prisma.deal.delete({ where: { id } }),
  },

  // Tasks
  tasks: {
    create: (data: any) => prisma.task.create({ data }),
    findById: (id: string) => prisma.task.findUnique({ where: { id } }),
    findByUser: (userId: string) => prisma.task.findMany({ where: { userId } }),
    update: (id: string, data: any) => prisma.task.update({ where: { id }, data }),
    delete: (id: string) => prisma.task.delete({ where: { id } }),
  },
};