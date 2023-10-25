// Definiera URL:en till din server
const url = 'http://localhost:4242/contacts';

// Använd fetch för att skicka en GET-förfrågan till servern
fetch(url)
    .then(response => {
        // Kontrollera om förfrågan var framgångsrik
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();  // Konvertera svaret till JSON
    })
    .then(data => {
        // Hämta div-elementet där kontaktpersonerna ska visas
        const contactsDiv = document.getElementById('contacts');

        // Skapa en ul-element för att lista kontaktpersonerna
        const ul = document.createElement('ul');

        // Loopa igenom datan och skapa ett li-element för varje kontaktperson
        data.forEach(contact => {
            const li = document.createElement('li');
            li.textContent = `${contact.name} - ${contact.email}`;
            ul.appendChild(li);
        });

        // Lägg till ul-elementet i div-elementet
        contactsDiv.appendChild(ul);
    })
    
    .catch(error => {
        // Logga eventuella fel till konsolen
        console.error('There has been a problem with your fetch operation:', error);
    });