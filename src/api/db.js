import PouchDB from 'pouchdb-browser'
const db = new PouchDB('janis_db')
if(window) window.db = db

export default db
