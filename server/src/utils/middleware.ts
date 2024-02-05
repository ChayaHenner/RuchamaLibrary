import express, { Request, Response, NextFunction } from 'express';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error caught by middleware:', err);
  
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        error: 'ValidationError',
        info: err
      });
    }
  
    res.status(500).json({
      error: 'Internal Server Error',
      info: err
    });
  
  };
  
  export default errorHandler;
