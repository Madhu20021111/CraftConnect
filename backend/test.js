const dbPromise = require('./config/db');
dbPromise.then(db => {
    db.all('SELECT * FROM artisans').then(rows => {
        console.log(rows);
    });
});
