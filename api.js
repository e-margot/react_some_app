// api.js

const BASE_URL = 'http://127.0.0.1:8000';

export const getItemById = async (itemId) => {
    const response = await fetch(`${BASE_URL}/items/${itemId}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });
    return response.json();
};

export const searchByText = async (text) => {
    const response = await fetch(`${BASE_URL}/search_text?limit=0&offset=5`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'text': 'string'
        })
    });
    return response.json();
};

export const searchByImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('query', imageFile);

    const response = await fetch(`${BASE_URL}/search_image?limit=0&offset=5`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            // 'Content-Type': 'multipart/form-data'
        },
        body: formData
    });
    return response.json();
};
