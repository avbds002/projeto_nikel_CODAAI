import type { NextFunction, Request, Response } from "express";
declare function existTransaction(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
export default existTransaction;
//# sourceMappingURL=transaction-exist-middleware.d.ts.map