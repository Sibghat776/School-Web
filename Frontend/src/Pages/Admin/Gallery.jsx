import React, { useEffect, useState } from 'react';
import { ImagePlus, Trash2 } from 'lucide-react';
import { Loading, EmptyState, ErrorState, PanelCard, Button, Input } from '../../Components/ui';
import { galleryService } from '../../services';
import { showToast } from '../../utils/commonFunctions';

const AdminGallery = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState('');
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await galleryService.getPosts();
      setPosts(res.data?.data || []);
    } catch { setError(true); } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const upload = async (e) => {
    e.preventDefault();
    if (!title || files.length === 0) return showToast('Title and images required', 'error');
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('teacherName', 'Sibghat Ullah');
      fd.append('title', title);
      Array.from(files).forEach((f) => fd.append('images', f));
      await galleryService.addPost(fd);
      showToast('Post added', 'success');
      setTitle(''); setFiles([]);
      load();
    } catch (e) {
      showToast(e.response?.data?.message || 'Upload failed', 'error');
    } finally {
      setUploading(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try { await galleryService.deletePost(id); showToast('Deleted', 'success'); load(); }
    catch (e) { showToast(e.response?.data?.message || 'Failed', 'error'); }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorState onRetry={load} />;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-white">Gallery</h2>
      <PanelCard title="Add Post">
        <form onSubmit={upload} className="space-y-4">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title" />
          <input type="file" multiple accept="image/*" onChange={(e) => setFiles(e.target.files)} className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-blue-600 file:text-white file:font-bold" />
          <Button type="submit" disabled={uploading}><ImagePlus size={16} className="mr-1 inline" />{uploading ? 'Uploading...' : 'Upload'}</Button>
        </form>
      </PanelCard>

      <PanelCard>
        {posts.length === 0 ? <EmptyState message="No gallery posts" /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map((p) => (
              <div key={p._id} className="border border-white/5 rounded-xl p-4 bg-[#1e293b]/40">
                <div className="flex items-center justify-between">
                  <p className="text-white font-bold">{p.title}</p>
                  <Button variant="danger" onClick={() => remove(p._id)} className="!py-1.5"><Trash2 size={14} /></Button>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {p.imageUrl?.map((url, i) => (
                    <img key={i} src={url} alt="" className="w-full h-24 object-cover rounded-lg" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </PanelCard>
    </div>
  );
};

export default AdminGallery;
