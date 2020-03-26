const sqlite3 = require('sqlite3').verbose()
var sqliteDB

exports.sqlitesqliteDB = sqliteDB

exports.open=function(path) {
    return new Promise(function(resolve) {
    this.sqliteDB = new sqlite3.Database(path, 
        function(err) {
            if(err) reject("Open error: "+ err.message)
            else    resolve(path + " opened")
        }
    )   
    })
}

exports.each=function(query, params, action) {
    return new Promise(function(resolve, reject) {
        var sqliteDB = this.sqliteDB
        sqliteDB.serialize(function() {
            sqliteDB.each(query, params, function(err, row)  {
                if(err) reject("Read error: " + err.message)
                else {
                    if(row) {
                        action(row)
                    }    
                }
            })
            sqliteDB.get("", function(err, row)  {
                resolve(true)
            })            
        })
    }) 
}

exports.close=function() {
    return new Promise(function(resolve, reject) {
        this.sqliteDB.close()
        resolve(true)
    }) 
}