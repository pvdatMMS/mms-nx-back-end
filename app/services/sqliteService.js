const sqlite3 = require('sqlite3').verbose()
var sqliteDB

exports.sqlitesqliteDB = sqliteDB

exports.open = path => new Promise((resolve) => {
    this.sqliteDB = new sqlite3.Database(path, (err) => {
        if (err) reject("Open error: " + err.message)
        else resolve(path + " opened")
    })
})

exports.each = (query, params, action) => new Promise((resolve, reject) => {
    var sqliteDB = this.sqliteDB
    sqliteDB.serialize(() => {
        sqliteDB.each(query, params, (err, row) => {
            if (err) reject("Read error: " + err.message)
            else if (row) action(row)
        })
        sqliteDB.get("", (err, row) => {
            resolve(true)
        })
    })
})

exports.close = () => new Promise((resolve, reject) => {
    this.sqliteDB.close()
    resolve(true)
}) 