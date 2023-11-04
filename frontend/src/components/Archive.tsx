import { BlogpostAPI, Post } from "../../apis/BlogpostAPI"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Archive() {
    const [postList, setPostList] = useState<Array<Post>>([])

    useEffect(() => {
        BlogpostAPI.getAllPosts().then((posts) => {
            setPostList(posts)
          })
    }, [])

    return (
        <div className="Archive">
            <header>All Posts</header>
            <section>
            {postList.map((post, key) => (
                <Link to={`/posts/${post._id}`} key={key}>{post.title} by {post.user.username} - {post.postdate}<br></br></Link>
            ))} 
            </section>
        </div>
    )
}

export default Archive
