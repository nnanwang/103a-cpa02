'use Web_Database';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

var messageSchema = Schema( 
  {
    topic: String,
    message: String,
    date: Date,
    id: Number
  },
  {collection:"Message set"}
);

module.exports = mongoose.model( 'message', messageSchema );