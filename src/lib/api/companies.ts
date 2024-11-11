import { prisma } from '../db';

export const companiesApi = {
  getCompanies: async () => {
    return prisma.company.findMany({
      include: {
        contacts: true,
        deals: true,
      },
    });
  },

  createCompany: async (data: any) => {
    return prisma.company.create({
      data,
      include: {
        contacts: true,
        deals: true,
      },
    });
  },

  updateCompany: async (id: string, data: any) => {
    return prisma.company.update({
      where: { id },
      data,
      include: {
        contacts: true,
        deals: true,
      },
    });
  },

  deleteCompany: async (id: string) => {
    return prisma.company.delete({
      where: { id },
    });
  },
};