import React, {useState, useEffect} from 'react';
import {getItemById, searchByText, searchByImage} from './api';
import './App.css'; // Импорт отдельного файла CSS для стилей

// const BASE_URL = 'http://127.0.0.1:8000';
// const BASE_URL = 'https://7e44-5-16-34-252.ngrok-free.app';
const BASE_URL = 'https://factual-heavily-bass.ngrok-free.app';
const STATIC_DIR = '/static/'

const SearchResults = ({showTextResult, showImageResult, searchResults}) => (
    (showTextResult || showImageResult) && (
        <div className="search-results">
            <h3>Результаты поиска:</h3>
            {searchResults.map((resultItem) => (
                <div key={resultItem.item_id} className="result-item">
                    <img src={`${BASE_URL}${STATIC_DIR}${resultItem.image_path}`} alt={resultItem.product_name}/>
                    <p>{resultItem.product_name}</p>
                    <p>{resultItem.description}</p>
                </div>
            ))}
        </div>
    )
);

const SelectedItem = ({selectedItem}) => (
    selectedItem && (
        <div className="selected-item">
            <table>
                <thead>
                <tr valign='bottom' align='center'>
                    <th><big>{selectedItem.product_name} {selectedItem.product_type_name}</big></th>
                </tr>
                </thead>
                <tr valign='top' align='left'>
                    <td>
                        <img src={`${BASE_URL}${STATIC_DIR}${selectedItem.image_path}`}
                             style={{maxWidth: 'fit-content'}}/>
                    </td>

                    <td style={{width: "40%"}}>
                        <p><b>Description:</b> {selectedItem.description}</p>
                        <p><b>Product name: </b>{selectedItem.product_name}</p>
                        <p><b>Product type name: </b>{selectedItem.product_type_name}</p>
                        <p>
                            <b>Color: </b>{selectedItem.perceived_colour_master_name}, {selectedItem.colour_group_name}, {selectedItem.perceived_colour_value_name}
                        </p>
                        {/*<p><b></b>{selectedItem.perceived_colour_value_name}</p>*/}
                        {/*<p><b></b>{selectedItem.perceived_colour_master_name}</p>*/}
                        <p><b>Department name: </b>{selectedItem.department_name}</p>
                        <p><b>Group: </b>{selectedItem.index_name}</p>
                        <p><b>Group name: </b>{selectedItem.index_group_name}</p>
                        <p><b>Section: </b>{selectedItem.section_name}</p>
                        {/*<p>{selectedItem.garment_group_name}</p>*/}
                    </td>

                </tr>
            </table>
        </div>
    )
);

const ItemDisplay = ({item, handleItemClick, handleMouseEnter, handleMouseLeave, selectedItem}) => (
    <div
        key={item.item_id}
        // className={`item-display ${selectedItem === item ? 'selected' : ''}`}
        onClick={() => handleItemClick(item)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
    >
        <img src={`${BASE_URL}${STATIC_DIR}${item.image_path}`} alt={item.product_name} style={{maxWidth: '200px'}}/>
        <p>{item.product_name}</p>
    </div>
);

function App() {
    const [searchText, setSearchText] = useState('');
    const [items_id, setItems] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showTextResult, setShowTextResult] = useState(false);
    const [showImageResult, setShowImageResult] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [result, setResult] = useState({
        image: undefined,
        description: undefined,
    });

    const fetchItems = async (start, end) => {
        const fetchedItems = [];
        for (let i = start; i <= end; i++) {
            const item = await getItemById(i);
            fetchedItems.push(item);
        }
        console.log('fetchedItems', fetchedItems);
        setItems(fetchedItems);
    };

    useEffect(() => {
        // Fetch items from index 1 to 5 initially
        fetchItems(1, 12);
    }, []);


    const handleSearchText = async () => {
        const results = await searchByText(searchText);
        setSelectedItem(null);
        setShowTextResult(true);
        setShowImageResult(false);
        setSearchResults(results);
    };

    const handleSearchByImage = async (e) => {
        const imageFile = e.target.files[0];
        const results = await searchByImage(imageFile);
        setSelectedItem(null);
        setShowTextResult(false);
        setShowImageResult(true);
        setSearchResults(results);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const handleMouseEnter = (e) => {
        e.target.style.transform = 'scale(1.2)';
    };

    const handleMouseLeave = (e) => {
        e.target.style.transform = 'scale(1)';
    };

    return (
        <div className="app-container">
            <h1>WearU</h1>
            <div className="search-bar">
                <div className="search-text">
                    <label>Поиск по тексту: </label>
                    <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                    <button className="button" onClick={handleSearchText}>Искать текст</button>
                </div>
                <div className="search-image">
                    <label className="file">Поиск по изображению: </label>
                    <input type="file" onChange={handleSearchByImage}/>
                </div>
            </div>
            <SearchResults showTextResult={showTextResult} showImageResult={showImageResult}
                           searchResults={searchResults}/>

            <div className="selected-and-items">
                <h1>Список элементов</h1>
                <SelectedItem selectedItem={selectedItem}/>
                <div className="all-items">
                    {Array.isArray(items_id) && items_id.length > 0 ? (
                        items_id.map((item) => (
                            <ItemDisplay
                                key={item.item_id}
                                item={item}
                                handleItemClick={handleItemClick}
                                handleMouseEnter={handleMouseEnter}
                                handleMouseLeave={handleMouseLeave}
                                selectedItem={selectedItem}
                            />
                        ))
                    ) : (
                        <p>Нет данных для отображения</p>
                    )}
                </div>
            </div>


        </div>
    );
}

export default App;