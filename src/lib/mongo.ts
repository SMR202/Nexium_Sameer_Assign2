import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  url: String,
  content: String,
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

export async function saveToMongo(url: string, content: string) {
  await mongoose.connect(process.env.MONGO_URI!);
  await Blog.create({ url, content });
}
