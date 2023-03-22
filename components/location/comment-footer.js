const CommentFooter = ({ location }) => {
  return (
    <div>
      <h1>Comments {"(#)"}</h1>
      <form>
        <input type="text" name="comment" id={location.id} placeholder="Add your comment here..."  className="bg-slate-800 w-3/4 h-[100px] rounded-md pl-1 pr-1 pt-1 pb-20 text-white"/>
      </form>
    </div>
  )
}

export default CommentFooter;
