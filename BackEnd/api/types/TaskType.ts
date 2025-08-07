export type taskType = {
      id: string;
      Nome: string;
      Descricao: string;
      Status: string;
      Priority: string;
      createdAt: Date | null;
      updatedAt?: Date | null;
    }