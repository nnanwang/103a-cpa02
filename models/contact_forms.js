'use Web_Database';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

var messageSchema = Schema( 
  {
    name: String,
    email: String,
    subject: String,
    message: String
  },
  {collection:"Contact Forms"}
);

module.exports = mongoose.model( 'message', messageSchema );