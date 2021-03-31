import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Pagination from './components/Pagination';
import Posts from './components/Posts';
import { fetchPosts, setPostsCount, setPostsPerPage, setTotalCount } from './redux/paginationReducer';

function App() {
  // const [posts, setPosts] = useState([])
  // const [loading, setLoading] = useState(false)

  const { activePage, postsPerPage, posts} = useSelector(({ pagination }) => pagination)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])
  useEffect(() => {
    dispatch(setTotalCount(posts.length / postsPerPage))
  },[posts])

  const indexOfLastPost = activePage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)


  return (
    <div className="App">
      <Posts posts={currentPosts}  />
      <Pagination />

    </div>
  );
}

export default App;
