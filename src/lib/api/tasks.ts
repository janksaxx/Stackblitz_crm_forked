import { prisma } from '../db';

export const tasksApi = {
  getTasks: async () => {
    return prisma.task.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  createTask: async (data: any) => {
    return prisma.task.create({
      data,
    });
  },

  updateTask: async (id: string, data: any) => {
    return prisma.task.update({
      where: { id },
      data,
    });
  },

  deleteTask: async (id: string) => {
    return prisma.task.delete({
      where: { id },
    });
  },
};