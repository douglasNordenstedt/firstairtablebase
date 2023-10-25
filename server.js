const express = require('express');
const Airtable = require('airtable');

const app = express();
const base = new Airtable({ apiKey: 'patbJ1CKcZTZ8Vb1y.f4bf3258c78e56c125da719e713b3b18b6c9cbf957e3909d21d300fca6228b47' }).base('appGRW6nt8t4UQu8h');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('./public/index')
})


// Definiera en route för att hämta kontaktpersoner
app.get('/contacts', (req, res) => {
    // Skapa en tom array för att lagra kontaktpersoner
    let contacts = [];
    
    // Hämta data från Airtable
    base('contacts').select({
        view: 'Grid view'
    }).eachPage((records, fetchNextPage) => {
        // Lägg till varje post i contacts-arrayen
        records.forEach(record => {
            contacts.push({
                id: record.id,
                name: record.get('Name'),
                email: record.get('Email'),
                attachments: record.get('Attachments')
            });
        });
        // Hämta nästa sida med poster
        fetchNextPage();
    }, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server Error');
            return;
        }
        // Skicka kontaktpersonerna som ett JSON-svar
        res.json(contacts);
    });
});


// Starta servern
app.listen(4242, () => {
    console.log('Server is running on http://localhost:4242');
});