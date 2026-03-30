import React, { useEffect, useState } from "react";
import { supabase, BlogPost } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    date: new Date().toISOString().slice(0, 10),
    image: "",
    type: "article" as "article" | "video",
    video_id: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load posts");
      console.error(error);
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      date: formData.date,
      image: formData.image,
      type: formData.type,
      video_id: formData.type === "video" ? formData.video_id : null,
    };

    let error;
    if (editingId) {
      const { error: updateError } = await supabase
        .from("blogs")
        .update(payload)
        .eq("id", editingId);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from("blogs")
        .insert([payload]);
      error = insertError;
    }

    if (error) {
      toast.error(editingId ? "Update failed" : "Creation failed");
    } else {
      toast.success(editingId ? "Post updated" : "Post created");
      resetForm();
      fetchPosts();
    }
    setLoading(false);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      date: new Date().toISOString().slice(0, 10),
      image: "",
      type: "article",
      video_id: "",
    });
  };

  const handleEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content || "",
      date: post.date,
      image: post.image || "",
      type: post.type as "article" | "video" || "article",
      video_id: post.video_id || "",
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this post permanently?")) {
      const { error } = await supabase.from("blogs").delete().eq("id", id);
      if (error) {
        toast.error("Delete failed");
      } else {
        toast.success("Post deleted");
        fetchPosts();
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (loading && posts.length === 0) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-light">Content Manager</h1>
          <Button onClick={handleLogout} variant="outline">Logout</Button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm mb-8 space-y-4">
          <h2 className="text-xl font-light mb-4">{editingId ? "Edit Post" : "New Post"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <Select
              value={formData.type}
              onValueChange={(val) => setFormData({ ...formData, type: val as "article" | "video" })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="article">Article</SelectItem>
                <SelectItem value="video">Video</SelectItem>
              </SelectContent>
            </Select>

            {formData.type === "video" ? (
              <Input
                placeholder="YouTube Video ID (e.g., dQw4w9WgXcQ)"
                value={formData.video_id}
                onChange={(e) => setFormData({ ...formData, video_id: e.target.value })}
                required
              />
            ) : (
              <>
                <Input
                  placeholder="Excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  required
                />
                <Textarea
                  placeholder="Content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={4}
                />
                <Input
                  placeholder="Image URL"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </>
            )}
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {editingId ? "Update" : "Create"}
            </Button>
            {editingId && (
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            )}
          </div>
        </form>

        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-4 rounded-2xl shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-medium">{post.title}</h3>
                <p className="text-sm text-stone-500">
                  {post.type} • {post.date}
                </p>
              </div>
              <div className="space-x-2">
                <Button variant="outline" onClick={() => handleEdit(post)}>Edit</Button>
                <Button variant="destructive" onClick={() => handleDelete(post.id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;