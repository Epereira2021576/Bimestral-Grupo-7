'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js';


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/api/v1/users'
        this.empresasPath = '/api/v1/empresa'
        this.reportePath = '/empresaAPI/v1/report';


        this.middlewares();
        this.conectarDB();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo', this.port);
        });
    }
}

export default Server;