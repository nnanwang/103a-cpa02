'use Web_Database';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

var contactSchema = Schema( 
  {
    name: String,
    email: String,
    subject: String,
    message: String,
    date: Number
  } );

module.exports = mongoose.model( 'Contact', contactSchema );