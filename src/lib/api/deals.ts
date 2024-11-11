import { prisma } from '../db';

export const dealsApi = {
  getDeals: async () => {
    return prisma.deal.findMany({
      include: {
        company: true,
        contact: true,
      },
    });
  },

  createDeal: async (data: any) => {
    return prisma.deal.create({
      data,
      include: {
        company: true,
        contact: true,
      },
    });
  },

  updateDeal: async (id: string, data: any) => {
    return prisma.deal.update({
      where: { id },
      data,
      include: {
        company: true,
        contact: true,
      },
    });
  },

  deleteDeal: async (id: string) => {
    return prisma.deal.delete({
      where: { id },
    });
  },
};