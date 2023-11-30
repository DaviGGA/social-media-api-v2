import { NextFunction, Request, Response } from "express";
import { APIError } from "../errors/api-error";

export async function errorHandler(
    error: Error & Partial<APIError>,
    req: Request, 
    res: Response, 
    next: NextFunction) {
    let statusCode: number = error.statusCode ?? 500;
    let message: string = error.message ?? 'Internal Server Error';
    
    console.log(error);

    return res.status(statusCode).json({message});
}