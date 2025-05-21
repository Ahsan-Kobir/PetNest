const IMGBB_API_KEY = '22cc77b369e955ea7ad5ebf29aec82c1'; // Replace with actual key
const API_BASE = 'http://127.0.01:5000/api/pets';

document.getElementById('images').addEventListener('change', function (e) {
    const preview = document.getElementById('imagePreview');
    preview.innerHTML = '';

    Array.from(e.target.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = document.createElement('img');
            img.src = event.target.result;
            img.className = 'preview-image';
            preview.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
});

document.getElementById('petForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('statusMessage');
    const loader = document.getElementById('loader');

    status.style.display = 'none';
    loader.style.display = 'block';

    try {
        const imageUrls = await uploadImagesToImgBB();


        const petData = {
            name: document.getElementById('name').value,
            category: document.getElementById('category').value,
            age: parseInt(document.getElementById('age').value),
            gender: document.querySelector('input[name="gender"]:checked')?.value,
            location: document.getElementById('location').value,
            description: document.getElementById('description').value,
            images: imageUrls,
            thumbnailUrl: imageUrls[0] || '',
            status: 'available'
        };


        const response = await fetch(API_BASE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(petData)
        });

        if (!response.ok) throw new Error('Failed to save pet');

        showStatus('Pet added successfully!', 'success');
        document.getElementById('petForm').reset();
        document.getElementById('imagePreview').innerHTML = '';
    } catch (error) {
        showStatus(`Error: ${error.message}`, 'error');
    } finally {
        loader.style.display = 'none';
    }
});

async function uploadImagesToImgBB() {
    const files = document.getElementById('images').files;
    const urls = [];

    for (const file of files) {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        if (!data.success) throw new Error('Image upload failed');
        urls.push(data.data.url);
    }

    return urls;
}

function showStatus(message, type) {
    const status = document.getElementById('statusMessage');
    status.textContent = message;
    status.className = `status ${type}`;
    status.style.display = 'block';
}

const CATEGORY_API = 'http://127.0.01:5000/api/pets/categories';

async function loadCategories() {
    const select = document.getElementById('category');
    select.innerHTML = '<option value="">Loading...</option>';

    try {
        const res = await fetch(CATEGORY_API);
        const categories = await res.json();

        select.innerHTML = '<option value="">Select Category</option>';
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.title;
            select.appendChild(option);
        });
    } catch (err) {
        select.innerHTML = '<option value="">Failed to load</option>';
        console.error('Error loading categories:', err);
    }
}

loadCategories();
