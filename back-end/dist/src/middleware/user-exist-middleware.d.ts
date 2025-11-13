import type { NextFunction, Request, Response } from "express";
declare function existUser(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
export default existUser;
//# sourceMappingURL=user-exist-middleware.d.ts.map