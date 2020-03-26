module.exports = {
    getTest: () => {
        return db.Test.findAll()
    }
}