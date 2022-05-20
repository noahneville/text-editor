import { openDB} from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

/* this stores items in the database. First we establish what the database is, jateDb, then we
 authorize read/write transactions. Then we store whatever content was in the put request.  
*/
export const putDb = async (content) => {
  const jateDb = await openDB('jate', 1)
  const tx = jateDb.transaction('jate', 'readwrite')
  const store = tx.objectStore('jate')
  const request = store.put({id: 1, value: content})
  const result = await request;
};

// retrieves data from the database. 
// Basically the same as the put request, but its a readonly transaction and it's a get request instead of a put.
export const getDb = async () => {
  const jateDb = await openDB('jate', 1)
  const tx = jateDb.transaction('jate', 'readonly')
  const store = tx.objectStore('jate')
  const request = store.get(1)
  const result = await request;
  result
    ? console.log('Data successfully fetched from database!')
    : console.log('no data found in database :(')
  return result?.value;
};

initdb();
