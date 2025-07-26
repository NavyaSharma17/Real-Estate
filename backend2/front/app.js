document.addEventListener('DOMContentLoaded', () => {
    fetchProperties();

    // Add Property Form Submission
    document.getElementById('property-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const newProperty = {
            title: document.getElementById('title').value,
            price: document.getElementById('price').value,
            size: document.getElementById('size').value,
            location: document.getElementById('location').value,
            image: document.getElementById('image').value
        };
        
        await fetch('/api/properties', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProperty)
        });

        document.getElementById('property-form').reset();
        fetchProperties();
    });

    // Edit Property Form Submission
    document.getElementById('edit-property-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('edit-id').value;
        const updatedProperty = {
            title: document.getElementById('edit-title').value,
            price: document.getElementById('edit-price').value,
            size: document.getElementById('edit-size').value,
            location: document.getElementById('edit-location').value,
            image: document.getElementById('edit-image').value
        };

        await fetch(`/api/properties/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProperty)
        });

        document.getElementById('edit-property').style.display = 'none';
        fetchProperties();
    });
});

async function fetchProperties() {
    const res = await fetch('/api/properties');
    const properties = await res.json();

    const propertiesDiv = document.getElementById('properties');
    propertiesDiv.innerHTML = '';
    properties.forEach(property => {
        propertiesDiv.innerHTML += `
            <div class="property">
                <h3>${property.title}</h3>
                <p>Price: $${property.price}</p>
                <p>Size: ${property.size} sqft</p>
                <p>Location: ${property.location}</p>
                <img src="${property.image}" alt="${property.title}" style="width: 100px; height: auto;">
                <button onclick="editProperty('${property._id}')">Edit</button>
                <button onclick="deleteProperty('${property._id}')">Delete</button>
            </div>
        `;
    });
}

async function deleteProperty(id) {
    await fetch(`/api/properties/${id}`, {
        method: 'DELETE'
    });
    fetchProperties();
}

function editProperty(id) {
    const propertyDiv = document.querySelector(`.property[data-id='${id}']`);
    document.getElementById('edit-id').value = id;
    document.getElementById('edit-title').value = propertyDiv.querySelector('h3').innerText;
    document.getElementById('edit-price').value = propertyDiv.querySelector('p:nth-of-type(1)').innerText.replace('Price: $', '');
    document.getElementById('edit-size').value = propertyDiv.querySelector('p:nth-of-type(2)').innerText.replace('Size: ', '').replace(' sqft', '');
    document.getElementById('edit-location').value = propertyDiv.querySelector('p:nth-of-type(3)').innerText.replace('Location: ', '');
    document.getElementById('edit-image').value = propertyDiv.querySelector('img').src;

    document.getElementById('edit-property').style.display = 'block';
}