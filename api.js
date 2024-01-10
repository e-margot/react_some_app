// api.js

// const BASE_URL = 'http://127.0.0.1:8000';
// const BASE_URL = 'https://7e44-5-16-34-252.ngrok-free.app';
const BASE_URL = 'https://factual-heavily-bass.ngrok-free.app';


export const getItemById = async (itemId) => {
    const response = await fetch(`${BASE_URL}/items/${itemId}`, {
        method: 'POST',
    });

    return response.json();
};

export const searchByText = async (text) => {
    const response = await fetch(`${BASE_URL}/search_text?limit=5&offset=0`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            // 'text': 'string'
            'text': text
        })
    });
    return response.json();
};

export const searchByImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('query', imageFile);

    const response = await fetch(`${BASE_URL}/search_image?limit=5&offset=0`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            // 'Content-Type': 'multipart/form-data'
        },
        body: formData
    });
    return response.json();
};
