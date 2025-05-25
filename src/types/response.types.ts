export type ErrorResponse = {
  status: string;
  code: number;
  message: string;
  data?: {
    details: string;
  };
};
