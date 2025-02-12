/* eslint-disable prefer-const */
// any other errors here is typescript yelling at me and i'm far too lazy rn
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import callAPI from "../utils/apicall";


const CommentsBox = ({ courseId, courseDept }) => {
  const { user, isAuthenticated } = useAuth0();
  interface Comment {
    id: string;
    text: string;
    rating: number;
    avatar: string;
    username: string;
    user_id: string;
    created_at: string;
  }

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      let { data, error } = await callAPI
        .from("comments")
        .select("*")
        .eq("course_id", courseId)
        .order("created_at", { ascending: false });

      if (!error && data) setComments(data);
    };
    fetchComments();
  }, [courseId]);

  const handleSubmit = async () => {
    if (!isAuthenticated || !newComment.trim()) return;

    if (editingId) {
      const { error } = await callAPI
        .from("comments")
        .update({ text: newComment, rating })
        .eq("id", editingId);

      if (!error) {
        setComments(comments.map(c => (c.id === editingId ? { ...c, text: newComment, rating } : c)));
        setEditingId(null);
      }
    } else {
      if (!user) return;

      const { data: existingComment } = await callAPI
        .from("comments")
        .select("id")
        .eq("user_id", user.sub)
        .eq("course_id", courseId)
        .eq("course_dept", courseDept.toUpperCase())
        .single();

      if (existingComment) return alert("You have already posted a comment for this course.");

      const newEntry = {
        user_id: user.sub,
        username: user.name,
        avatar: user.picture || "/default-avatar.jpg",
        text: newComment,
        rating,
        course_id: courseId,
        course_dept: courseDept.toUpperCase()
      };
      const { data, error } = await callAPI.from("comments").insert([newEntry]).select("*").single();

      if (!error) setComments([data, ...comments]);
    }

    setNewComment("");
    setRating(5);
  };

  const handleDelete = async (id: string) => {
    const { error } = await callAPI.from("comments").delete().eq("id", id);
    if (!error) setComments(comments.filter(c => c.id !== id));
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">User Reviews</h2>

      {isAuthenticated && (
        <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col space-y-4">
          <textarea
            className="w-full border-black p-2 rounded-lg text-black bg-white"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />

          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl cursor-pointer ${star <= rating ? "text-red-500" : "text-gray-300"}`}
              >
                ★
              </span>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
          >
            {editingId ? "Update Review" : "Submit Review"}
          </button>
        </div>
      )}

      <div className="space-y-6 mt-6">
        {comments.map(({ id, text, rating, avatar, username, user_id, created_at }) => (
          <div key={id} className="bg-white p-6 shadow-lg rounded-lg flex items-start space-x-4 relative">
            <img className="w-12 h-12 rounded-full" src={avatar} alt="User Avatar" />
            <div>
              <p className="text-gray-700">{text}</p>
              <p className="text-sm text-gray-500">— {username} • {formatDistanceToNow(new Date(created_at))} ago</p>
              <div className="text-red-600 text-lg mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={star <= rating ? "text-red-500" : "text-gray-300"}>
                    ★
                  </span>
                ))}
              </div>
            </div>

            {isAuthenticated && user.sub === user_id && (
              <div className="absolute top-3 right-3 flex space-x-2">
                <FaPencilAlt className="text-gray-500 cursor-pointer" onClick={() => { setNewComment(text); setRating(rating); setEditingId(id); }} />
                <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDelete(id)} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommentsBox;
