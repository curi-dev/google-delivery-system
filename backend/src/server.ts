import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './routes/index';
import GlobalError from './Errors/GlobalError';

const server = express();

server.use(express.json());
server.use(cors());
server.use(routes);
server.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof GlobalError) {
        console.log(err.message)
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    };

    return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    });
})


server.listen(3333, () => {
    console.log('Server started on port 3333.')
});