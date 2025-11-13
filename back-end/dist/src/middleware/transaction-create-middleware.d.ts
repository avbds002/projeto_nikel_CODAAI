import type { NextFunction, Request, Response } from "express";
declare function transactionCreate(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export default transactionCreate;
//# sourceMappingURL=transaction-create-middleware.d.ts.map