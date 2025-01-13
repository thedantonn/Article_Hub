import React, { useState } from 'react';
import Card from '../components/Card';
import articles from '../../articles.json';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const HomePage = () => {

    const sortCategory = ["Technology", "Health", 'Travel', "Business"];
    const [searchQuery,setSearchQuery] = useState("")
    const [filtered,setfiltered] = useState(articles)
  
  
    const handleSearch = (e) => {
      setSearchQuery(e.target.value)
      const searchedArticle = articles.filter((article) => article.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      articles.filter((article) => article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
      setfiltered(searchedArticle)
      console.log(filtered)
      }
  

    const handleCategory = (category) => {
        const filteredArticles = articles.filter((article) => article.category === category);
        setfiltered(filteredArticles);
        console.log(filteredArticles);
    };

    return (
        <div><h1 className='p-4 mx-auto container text-2xl font-bold'>Filter By Category</h1>
            <div className='container mx-auto p-4 grid grid-cols sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 border-b-2'>
                {sortCategory.map((category) => (
                    <button className='px-2 py-1 bg-blue-500 text-white rounded-lg text-lg hover:shadow-md hover:bg-blue-300' key={category} onClick={() => handleCategory(category)}>
                        {category}
                    </button>
                ))}
            </div>
            <h1 className='p-4 mx-auto container text-2xl font-bold'>Search Article</h1>
            <div className='container w-auto mx-auto p-4 grid grid-cols sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 border-b-2'> 
              <input
             placeholder='Health, 5g, etc' 
             type='text' 
             value={searchQuery}
             onChange={handleSearch}
             className="px-4 py-2 border rounded-full"
             ></input></div>
             <h1 className='p-4 mx-auto container text-2xl font-bold'>Articles To Explore</h1>
            <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              
                {filtered.map((article, index) => (
                    <Link key={index} to={"/article/"+ article.id}>
                        <Card {...article} />
                      </Link>
      
                ))}
            </div>
        </div>
    );
};

export default HomePage;
