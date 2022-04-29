import React ,{useState} from 'react';
import Parse from 'parse/dist/parse.min.js';
const Parse = require('parse');
// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'b7seVwvkuKvXCA8OSYfn5QCagO01EIBiGnAy6GMr';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'GcagYgPfQG2wZ02VxVZP4zirRi8LRD3zCJFtYKva';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;