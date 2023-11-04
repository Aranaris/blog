import { BlogpostAPI, Post } from "../../apis/BlogpostAPI"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function ArchivedPost() {
    const postID = useParams()
    const [currentPost, setCurrentPost] = useState<Post>()

    useEffect(() => {
        if (typeof postID.id !== 'undefined') {
            BlogpostAPI.getPostByID(postID.id).then((post) => {
                setCurrentPost(post)
            })
        }
    }, [postID.id])

    return (
        <div className="Archived Post">
            <header>Archived Post View</header>
            <section>
                <header className="section">{currentPost?.title}</header>
                <p>{currentPost?.content}</p>
                <footer>Posted on {currentPost?.postdate} by {currentPost?.user?.username}</footer>
            </section>
        </div>
    )
}

export default ArchivedPost
