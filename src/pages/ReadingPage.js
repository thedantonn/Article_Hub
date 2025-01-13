import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import articles from "../../articles.json"

const ReadingPage = () => {
    
    const {id} = useParams()
    const [isedited,setisedited] = useState(false)
    const [editedArticle,seteditedArticle] = useState(null)
    const [font,setfont] = useState("18px")

    useEffect(() => {
        const storedArticle = localStorage.getItem(id);
        if (storedArticle) {
            seteditedArticle(JSON.parse(storedArticle));
        } else {
            const SelectedArticle = articles.find((article) => article.id === parseInt(id));
            seteditedArticle(SelectedArticle); 
        }
    }, [id]);

    const increaseFontSize = () => {
        const increaseSize = parseInt(font) + 2
        setfont(increaseSize + 'px')
    }
    const decreaseFontSize = () => {
        const decreaseSize = parseInt(font) - 2
        setfont(decreaseSize + 'px')
    }

    const handleChange = (e) => {
        const {name,value} = e.target
        seteditedArticle((prevArticle) => 
            ({...prevArticle ,[name]: value}))
    }
    const handleSave = () => {
        if (editedArticle) {
            const updatedArticle = { ...editedArticle, lastEdited: new Date().toLocaleString() };
            localStorage.setItem(id, JSON.stringify(updatedArticle));
            seteditedArticle(updatedArticle); 
            setisedited(false);
        }
    }
    const handleCancel = () => {
        const storedArticle = localStorage.getItem(id);
        if (storedArticle) {
            seteditedArticle(JSON.parse(storedArticle));
        } else {
            const selectedArticle = articles.find((article) => article.id === parseInt(id));
            seteditedArticle(selectedArticle);
        }
        setisedited(false);
    };

    if (!editedArticle) return <div>Loading...</div>;
    console.log(editedArticle)
  return (
    <div className="container mx-auto p-6">
        {!isedited ? (
    <div>
      <img className='w-full h-64 object-cover' src={editedArticle.thumbnail}/>
      <h1 className="text-2xl font-semibold">{editedArticle?.title}</h1>
      <p className="text-sm text-gray-500">Last Edited: {editedArticle?.lastEdited}</p>
      
      <div className='space-x-3'>
        <button onClick={increaseFontSize} className="px-2 py-1 bg-blue-500 text-white rounded">+</button>
        <button onClick={decreaseFontSize} className="px-2 py-1 bg-blue-500 text-white rounded">-</button>
      </div>
      <div className="article-content mt-4" style={{ fontSize: font }}>
        <p>{editedArticle?.excerpt}</p>
      </div>
      <button onClick={()=> setisedited(true)} className="px-4 py-2 bg-blue-500 text-white rounded mt-4">Edit Article</button>
      </div>
    ) : (
            <div>
              <h1 className="text-2xl font-semibold">Edit Article</h1>
              <form className="mt-4">
                <label className="block">
                  <input
                    type="text"
                    name="title"
                    value={editedArticle.title}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border rounded"
                  />
                </label>
                <label className="block mt-2">
                  <textarea
                    name="excerpt"
                    value={editedArticle.excerpt}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border rounded"
                  />
                </label>
                <label className="block mt-2">
                  <textarea
                    name="content"
                    value={editedArticle.content}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border rounded"
                  />
                </label>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
    )}
    </div>
    );
}

export default ReadingPage