import type { Request, Response } from "express";
export declare class UserController {
    index(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    update(): void;
    show(): void;
    delete(): void;
}
//# sourceMappingURL=user-controller.d.ts.map