module.exports = {
    getLayouts: async (user_id = 1) => {
        return db.Layout.findAll({where: {
            user_id
        },
        order: [
            ['order', 'ASC'],
        ]});
    },
    createOrUpdateLayout: async (data) => {
        const { nx_layout_id, user_id } = data
        const layout = await db.Layout.findOne({
            where: {
                nx_layout_id
            }
        })
        if (layout) {
            return db.Layout.update({
                name: data.name,
                image: data.backgroundImageFilename
            }, {
                where: {
                    nx_layout_id
                }
            })
        } else {
            const layouts = await db.Layout.findAll({
                where: {
                    user_id
                },
                order: [
                    ['order', 'DESC'],
                ]
            })

            const order = layouts[0] && layouts[0].order

            return db.Layout.create({...data, order: order ? order + 1 : 1})
        }
        
    },
    deleteLayout: async (nx_layout_id) => {
        return db.Layout.destroy({ where: { nx_layout_id } })
    }
}