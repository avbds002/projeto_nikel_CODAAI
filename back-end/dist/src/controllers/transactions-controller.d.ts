import type { Request, Response } from "express";
export declare class TransactionController {
    index(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
    show(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    delete(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=transactions-controller.d.ts.map