import Event from './event.model.js';


//Agregar Evento
export const postEvent = async ( req, res ) => {
    try {
        const { id } = req.params;
        const { _id, ...resto } = req.body;
        const event = new Event( {
            ...resto,
            hotel: id

        } );
        await event.save();
        const hotel = await Hotel.findById( id );
        if ( hotel ) {
            hotel.events.push( event._id );
            await hotel.save();
        }
        res.status( 200 ).json( {
            msg: "Event successfully created",
            event,
        } );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( {
            msg: "Error publishing event",
            error: error.message
        } );
    }
}

//Listar Eventos
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

//Editar Evento
export const putEvent = async ( req, res ) => {
    try {
        const { id } = req.params;
        const { ...resto } = req.body;
        const updatedEvent = await Event.findByIdAndUpdate( id, {
            ...resto
        } )
        res.status( 200 ).json( {
            msg: "Event updated successfully",
            updatedEvent
        } )
    } catch ( e ) {
        console.error( e );
        res.status( 500 ).json( {
            msg: 'Failed to update event.',
            error: e.message
        } );
    }
}
//Eliminar Evento
export const deleteEvents = async ( req, res ) => {
    try {
        const { id } = req.params;
        const deletedEvent = await Event.findByIdAndDelete( id );
        if ( !deletedEvent ) {
            return res.status( 404 ).json( {
                msg: "Event not found"
            } );
        }
        res.status( 200 ).json( {
            msg: "Event successfully deleted",
            deletedEvent
        } );
    } catch ( e ) {
        console.error( e );
        res.status( 500 ).json( {
            msg: 'Failed to delete event.',
            error: e.message
        } );
    }
}                                                                                                                                               