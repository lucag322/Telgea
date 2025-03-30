const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type TopUpRequest = {
  phoneNumber?: string;
  option?: string;
  country?: string;
  dataOption?: string;
  date?: Date;
};

export const api = {
  sendConfirmationCode: async (
    phoneNumber: string
  ): Promise<{ success: boolean }> => {
    await delay(2000);
    if (Math.random() > 0.2) {
      return { success: true };
    }
    throw new Error("Failed to send confirmation code");
  },

  requestTopUp: async (
    payload: TopUpRequest
  ): Promise<{ success: boolean }> => {
    await delay(2000);
    if (Math.random() > 0.3) {
      return { success: true };
    }
    throw new Error("Failed to request top-up");
  },

  retryTopUp: async (payload: TopUpRequest): Promise<{ success: boolean }> => {
    await delay(1500);
    return { success: true };
  },
};
