import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';

export const API = process.env.WP_REST_API || `${window.origin}/wordpress-test/wp-json`;


function useFetch(url) {
    const [data, setData] = useState(null);
    useEffect(() => {
        async function loadData() {
            const response = await fetch(url);
            if(!response.ok) {
                return;
            }
            const posts = await response.json();
            setData(posts);
        }
        loadData();
    }, [url]);
    return data;
}

export default function App() {
 const [catId, setCatId] = useState("");


 const categories = useFetch('http://localhost/wordpress-test/wp-json/wp/v2/categories');

  const handleClick = event => {
    setCatId(event.target.getAttribute('data-category-id'));
  };

  // const params = new URLSearchParams({
  //   categories: catId,
  //   _fields: "author,id,excerpt,title,link",
  //   per_page: 5,
  // });

  
  var postsURL;

    if(catId > 0){
      postsURL = API+'/wp/v2/posts?_fields=author,id,excerpt,title,link&categories='+catId;
    } else {
      postsURL = API+'/wp/v2/posts?_fields=author,id,excerpt,title,link';
    }

    const posts = useFetch(postsURL);

  return (
    <div>


    <ul>
    <button onClick={handleClick} data-category-id="-1">
        All categories
        </button>
      {categories && categories.map((cat, idx) => {
        if(cat.id == catId){
          return (
            <button class="active" onClick={handleClick} data-category-id={cat.id}>
            {cat.name}
            </button>
          )} 
          else {
            return (
              <button onClick={handleClick} data-category-id={cat.id}>
                {cat.name}
              </button>
            )
          }
      })}
    </ul>

    <div><ul>
      {posts && posts.map((post, index) => (
        <li><a href={post.link}>{post.title.rendered}</a></li>
      ))}
    </ul></div>
    </div>
  );
}