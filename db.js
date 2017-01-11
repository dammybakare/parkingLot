const mongoose = require('mongoose');
 const conn = mongoose.createConnection('localhost', 'mydatabase');
conn.once('open', function() {
  console.log('Connection Successful');
});
//conn.open('localhost', 'database')
var Lot;
var DB = {
  initDb: function initDb() {
    const lotSchema = new mongoose.Schema({
      key: String,
      value: String
    });
    Lot = conn.model('Lot', lotSchema);
  },
  search: function(str, callback) {
    return Lot.find(str, callback);
  },
  save: function(params){
    const lot = new Lot({key: params.id, value: params.data});
    lot.save(function(err){
      if(err) throw err;
    });
  }
}

module.exports = DB;
