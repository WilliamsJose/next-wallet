export type Transaction = {
  id: string;
  type: "deposit" | "transfer" | "refund";
  amount: number;
  date: string;
  toUserID?: string;
  fromUserID?: string;
};
