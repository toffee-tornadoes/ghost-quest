const CommentFooter = ({ location }) => {
  return (
    <div>
      <h1>Comments {"(#)"}</h1>
      <form>
        <input type="text" name="comment" id={location.id} placeholder="Add your comment here..."  className="w-[500px] h-[100px]"/>
      </form>
    </div>
  )
}

export default CommentFooter;
