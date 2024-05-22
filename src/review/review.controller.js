import Review from "./review.model.js";

// Agregar una nueva reseña
export const postReview = async (req, res) => {
    try {
        // Extraer el ID y el resto de los datos de la solicitud
        const { _id, ...resto } = req.body;
        
        // Crear una nueva instancia de Review con los datos de la solicitud
        const review = new Review({
            ...resto
        });
        
        // Guardar la nueva reseña en la base de datos
        await review.save();
        
        // Responder con un mensaje de éxito y la reseña creada
        res.status(200).json({
            msg: "Reseña agregada exitosamente",
            review
        });
    } catch (e) {
        // Manejar cualquier error que pueda ocurrir y responder con un mensaje de error
        console.error(e);
        res.status(500).json({
            msg: "Error al agregar la reseña",
            error: e.message
        });
    }
}

// Actualizar una reseña existente
export const putReview = async (req, res) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;
    try {
        // Buscar y actualizar la reseña con el ID proporcionado
        const updatedReview = await Review.findByIdAndUpdate(
            id,
            { ...resto },
            { new: true } // Devolver la versión actualizada de la reseña
        );

        // Verificar si la reseña fue encontrada y actualizada correctamente
        if (!updatedReview) {
            return res.status(404).json({
                msg: "Reseña no encontrada"
            });
        }

        // Responder con un mensaje de éxito y la reseña actualizada
        res.status(200).json({
            msg: "Reseña actualizada exitosamente",
            updatedReview
        });
    } catch (e) {
        // Manejar cualquier error que pueda ocurrir y responder con un mensaje de error
        console.error(e);
        res.status(500).json({
            msg: "Error al actualizar la reseña",
            error: e.message
        });
    }
}

// Eliminar una reseña
export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        // Buscar y eliminar la reseña con el ID proporcionado
        const deletedReview = await Review.findByIdAndDelete(id);

        // Verificar si la reseña fue encontrada y eliminada correctamente
        if (!deletedReview) {
            return res.status(404).json({
                msg: "Reseña no encontrada"
            });
        }

        // Responder con un mensaje de éxito y la reseña eliminada
        res.status(200).json({
            msg: "Reseña eliminada exitosamente",
            deletedReview
        });
    } catch (e) {
        // Manejar cualquier error que pueda ocurrir y responder con un mensaje de error
        console.error(e);
        res.status(500).json({
            msg: "Error al eliminar la reseña",
            error: e.message
        });
    }
}

// Obtener todas las reseñas
export const getReview = async (req, res) => {
    try {
        // Buscar y obtener todas las reseñas de la base de datos
        const reviews = await Review.find();
        
        // Responder con todas las reseñas encontradas
        res.status(200).json({
            reviews
        });
    } catch (e) {
        // Manejar cualquier error que pueda ocurrir y responder con un mensaje de error
        console.error(e);
        res.status(500).json({
            msg: "Error al obtener las reseñas",
            error: e.message
        });
    }
}
