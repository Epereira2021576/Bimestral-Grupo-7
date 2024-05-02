import Event from './event.model';
import User from '../user/user.model'

export const postEvent = async ( req, res ) => {
    try {
        const { eventTitle, eventDescription, eventDate, location, eventServices } = req.body;
        const newEvent = new Event( {
            eventTitle, eventDescription, eventDate, location, additionalInfo, eventServices
        } );
        const clientID = req.headers['client']

        const checkClient = User.findById( clientID );

        if ( !checkClient.role === 'CLIENT_ROLE' ) {
            return res.status( 401 ).json( {
                msg: 'Cannot authorize event without a client'
            } );
        }
        //check if role is HOTEL_ADMIN_ROLE
        if ( req.user.role !== 'HOTEL_ADMIN_ROLE' ) {
            return res.status( 401 ).json( {
                msg: 'Unauthorized access'
            } );
        }
        await newEvent.save();

        return res.status( 201 ).json( {
            msg: 'Event is created successfully',
            newEvent
        } );
    } catch ( e ) {
        console.error( e );
        res.status( 500 ).json( {
            msg: 'Failed to create event.',
            error: e.message
        } );
    }
}

export const getEvents = async ( req, res ) => {
    try {
        const events = await Event.find();
        res.status( 200 ).json( {
            events
        } );
    } catch ( e ) {
        console.error( e );
        res.status( 500 ).json( {
            msg: 'Failed to get events.',
            error: e.message
        } );
    }
}

export const putEvents = async ( req, res ) => {
    try {
        const { id } = req.params;
        const { eventTitle, eventDescription, eventDate, location, eventServices } = req.body;

        const updatedEvent = await Event.findByIdAndUpdate( id, {
            eventTitle, eventDescription, eventDate, location, eventServices
        }, { new: true } );

        res.status( 200 ).json( {
            msg: 'Event updated successfully',
            updatedEvent
        } );
    } catch ( e ) {
        console.error( e );
        res.status( 500 ).json( {
            msg: 'Failed to update event.',
            error: e.message
        } );
    }
}

export const deleteEvents = async ( req, res ) => {
    try {
        const { id } = req.params;
        await Event.findByIdAndDelete( id );
        res.status( 200 ).json( {
            msg: 'Event deleted successfully'
        } );
    } catch ( e ) {
        console.error( e );
        res.status( 500 ).json( {
            msg: 'Failed to delete event.',
            error: e.message
        } );
    }
}                                                                                                                                               