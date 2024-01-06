import React, {useState} from 'react';
import {getItemById, searchByText, searchByImage} from './api';
import {items} from './mockedItems';

const BASE_URL = 'http://127.0.0.1:8000';

function App() {
    const [searchText, setSearchText] = useState('');
    const [itemId, setItemId] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showTextResult, setShowTextResult] = useState(false);
    const [showImageResult, setShowImageResult] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [result, setResult] = useState({
        image: undefined,
        description: undefined,
    });

    const handleGetItem = async () => {
        try {
            const item = await getItemById(itemId);
            setResult({
                image: `${BASE_URL}${item.image_path}`,
                description: item.description,
            })
            setSelectedItem(item);
            setShowTextResult(false);
            setShowImageResult(false);
        } catch (error) {
            console.error('Error fetching item:', error);
        }
    };

    const handleSearchText = async () => {
        // const items = await searchByText(searchText);
        // setResult({
        //     image: undefined,
        //     description: JSON.stringify(items),
        // });
        const results = await searchByText(searchText);
        setSelectedItem(null);
        setShowTextResult(true);
        setShowImageResult(false);
        setSearchResults(results);
    };

    const handleSearchByImage = async (e) => {
        const imageFile = e.target.files[0];
        const results = await searchByImage(imageFile);
        // const items = await searchByImage(imageFile);
        // setResult({
        //     image: undefined,
        //     description: JSON.stringify(items),
        // });
        setSelectedItem(null);
        setShowTextResult(false);
        setShowImageResult(true);
        setSearchResults(results);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item); // 2. Устанавливаем выбранный товар
    };

    const handleMouseEnter = (e) => {
        e.target.style.transform = 'scale(1.2)'; // Увеличиваем размер при наведении
    };


    const handleMouseLeave = (e) => {
        e.target.style.transform = 'scale(1)'; // Возвращаем обычный размер при уходе курсора
    };

    return (
        <div style={{textAlign: 'center', padding: '20px'}}>
            <h1>WearU</h1>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
                <div style={{marginLeft: '20px'}}>
                    <label>Search Text: </label>
                    <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                    <button onClick={handleSearchText}>Search Text</button>
                </div>
                <div style={{marginLeft: '20px'}}>
                    <label>Search Image: </label>
                    <input type="file" onChange={handleSearchByImage}/>
                </div>
            </div>
            {(showTextResult || showImageResult) && (
                <div>
                    <h3>Search Result:</h3>
                    {searchResults.map((resultItem) => (
                        <div key={resultItem.item_id}>
                            <img src={`${BASE_URL}${resultItem.image_path}`} alt={resultItem.product_name}
                                 style={{width: '100px', height: 'auto'}}/>
                            <p>{resultItem.product_name}</p>
                            <p>{resultItem.description}</p>
                        </div>
                    ))}
                </div>
            )}
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {/*<h2>Result:</h2>*/}
                {selectedItem && (
                    <div>
                        <table>
                            <tr>
                                <td>
                                    <img src={`${BASE_URL}${selectedItem.image_path}`} alt="Result"
                                 style={{width: '300px', height: 'auto'}}/>
                                </td>
                                <td>
                                    <p>{selectedItem.description}</p>
                                    <p>{selectedItem.department_name}</p>
                                </td>
                            </tr>


                        </table>

                    </div>
                )}
            </div>
            <div style={{marginTop: '40px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                {/*<h2>All Items:</h2>*/}
                {items.map((item) => (
                    <div key={item.item_id}
                         style={{margin: '30px', padding: '20px', cursor: 'pointer', transition: 'transform 0.2s',}}
                         onClick={() => handleItemClick(item)}
                         onMouseEnter={handleMouseEnter}
                         onMouseLeave={handleMouseLeave}
                    >
                        <img src={`${BASE_URL}${item.image_path}`} alt={item.product_name}
                             style={{width: '100px', height: 'auto'}}/>
                        <p style={{visibility: selectedItem === item ? 'hidden' : 'visible'}}>{item.product_name}</p>
                        {/*<p>{item.product_name}</p>*/}
                    </div>
                ))}
            </div>
            {/*{selectedItem && (*/}
            {/*    <div style={{ marginTop: '40px' }}>*/}
            {/*        <h2>Selected Item:</h2>*/}
            {/*        <div key={selectedItem.item_id} style={{ margin: '20px', padding: '10px', border: '1px solid #ccc' }}>*/}
            {/*            <img src={`${BASE_URL}${selectedItem.image_path}`} alt={selectedItem.product_name} style={{ width: '200px', height: 'auto' }} />*/}
            {/*            <p>{selectedItem.product_name}</p>*/}
            {/*            <p>{selectedItem.description}</p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}


        </div>
    );
}

export default App;