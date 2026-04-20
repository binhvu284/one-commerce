export interface VnpayResult {
  status: 'paid';
  transactionId: string;
  amount: number;
}

export class VnpayError extends Error {
  constructor(message = 'VNPay transaction failed. Please try again.') {
    super(message);
    this.name = 'VnpayError';
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function payWithVnpayMock(amount: number): Promise<VnpayResult> {
  await delay(1200);
  const success = Math.random() > 0.05;
  if (!success) {
    throw new VnpayError();
  }
  const rand = Math.random().toString(36).slice(2, 10).toUpperCase();
  return {
    status: 'paid',
    transactionId: `VNP-${Date.now()}-${rand}`,
    amount,
  };
}
