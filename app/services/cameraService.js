module.exports = {
    getCameras: async (layout_id) => {
        return db.Camera.findAll({
            attributes: ["id", "name", "url", ["axisX", "x"], ["axisY", "y"], ["camera_id", "cameraId"], ["layout_id", "layoutId"], ["status_id", "statusId"]],
            where: {
            layout_id
        }});
    },
    addCamera: async (data) => {
        return db.Camera.create(data)
    },
    updateCamera: async (criteria, data) => {
        return db.Camera.update(data, {
            where: criteria
        })
    },
    deleteCamera: async (criteria) => {
        return db.Camera.destroy({ where: criteria })
    }
}