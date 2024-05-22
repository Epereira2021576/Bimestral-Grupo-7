import Event from './event.model.js';

// Agregar un nuevo evento
export const postEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id, ...resto } = req.body;

        // Crear un nuevo evento asociado al hotel con el ID proporcionado
        const event = new Event({
            ...resto,
            hotel: id
        });

        // Guardar el evento en la base de datos
        await event.save();

        // Buscar el hotel por su ID y añadir el ID del evento a su lista de eventos
        const hotel = await Hotel.findById(id);
        if (hotel) {
            hotel.events.push(event._id);
            await hotel.save();
        }

        // Responder con el evento creado
        res.status(200).json({
            msg: "Evento creado exitosamente",
            event,
        });
    } catch (error) {
        // Manejar errores y responder con un mensaje de error
        console.error(error);
        res.status(500).json({
            msg: "Error al publicar el evento",
            error: error.message
        });
    }
}

// Listar todos los eventos
export const getEvents = async (req, res) => {
    try {
        // Buscar todos los eventos en la base de datos
        const events = await Event.find();
        
        // Responder con la lista de eventos
        res.status(200).json({
            events
        });
    } catch (error) {
        // Manejar errores y responder con un mensaje de error
        console.error(error);
        res.status(500).json({
            msg: 'Error al obtener los eventos',
            error: error.message
        });
    }
}

// Editar un evento existente
export const putEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { ...resto } = req.body;

        // Buscar y actualizar el evento por su ID
        const updatedEvent = await Event.findByIdAndUpdate(id, { ...resto });

        // Responder con el evento actualizado
        res.status(200).json({
            msg: "Evento actualizado exitosamente",
            updatedEvent
        });
    } catch (error) {
        // Manejar errores y responder con un mensaje de error
        console.error(error);
        res.status(500).json({
            msg: 'Error al actualizar el evento',
            error: error.message
        });
    }
}

// Eliminar un evento existente
export const deleteEvents = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar y eliminar el evento por su ID
        const deletedEvent = await Event.findByIdAndDelete(id);

        // Si el evento no se encuentra
        if (!deletedEvent) {
            return res.status(404).json({
                msg: "Evento no encontrado"
            });
        }

        // Responder con el evento eliminado
        res.status(200).json({
            msg: "Evento eliminado exitosamente",
            deletedEvent
        });
    } catch (error) {
        // Manejar errores y responder con un mensaje de error
        console.error(error);
        res.status(500).json({
            msg: 'Error al eliminar el evento',
            error: error.message
        });
    }
}
