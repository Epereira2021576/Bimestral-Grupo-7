'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js';
import authRoutes from '../src/auth/auth.routes.js';
import roomRoutes from '../src/room/room.routes.js'
import hotelRoutes from '../src/hotel/hotel.routes.js'
import eventRoutes from '../src/events/event.routes.js'
import bookingRoutes from '../src/booking/booking.routes.js'
import hotelAmenitiesRoutes from '../src/hotelAmenity/hotelAmenities.routes.js'
import reviewRoutes from '../src/review/review.routes.js'

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/HotelManagement/v1/auth';
        this.roomPath = '/HotelManagement/v1/room';
        this.hotelPath = '/HotelManagement/v1/hotel';
        this.eventPath = '/HotelManagement/v1/event';
        this.bookingPath = '/HotelManagement/v1/booking';
        this.hotelAmenitiesPath = '/HotelManagement/v1/HotelAmenities'
        this.reviewPath = '/HotelManagement/v1/review'



        this.middlewares();
        this.conectarDB();
        this.routes();
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
    routes() {
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.roomPath, roomRoutes);
        this.app.use(this.hotelPath, hotelRoutes);
        this.app.use(this.eventPath, eventRoutes);
        this.app.use(this.bookingPath, bookingRoutes);
        this.app.use(this.hotelAmenitiesPath, hotelAmenitiesRoutes);
        this.app.use(this.reviewPath, reviewRoutes);

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo', this.port);
        });
    }
}

export default Server;