# Quick Supabase Setup Guide for MySmile

This guide walks you through setting up Supabase for the MySmile blog and admin features.

## 1. Create a Supabase Project
- Go to [supabase.com](https://supabase.com) and sign up (free tier).
- Click **New Project**.
- Enter a name (e.g., "mysmile"), set a secure database password, and choose a region close to you.
- Wait for the project to initialize.

## 2. Get Your API Credentials
- In the project dashboard, go to **Project Settings** → **API**.
- Copy the **Project URL** (looks like `https://xyz.supabase.co`) and the **anon/public key**.

## 3. Set Up Environment Variables
In your frontend `.env` file (or in your hosting platform), add:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 4. Create the Database Tables
Open the **SQL Editor** in Supabase and run the following script:

```sql
-- create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  date DATE NOT NULL,
  image TEXT,
  type TEXT DEFAULT 'article' CHECK (type IN ('article', 'video')),
  video_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- enable Row Level Security
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- public read access for blogs
CREATE POLICY "Public can view blogs" ON blogs
  FOR SELECT USING (true);

-- admin full access for blogs (only users in admin_users can modify)
CREATE POLICY "Admins can modify blogs" ON blogs
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

-- allow users to read their own admin record
CREATE POLICY "Users can read their own admin record" ON admin_users
  FOR SELECT USING (user_id = auth.uid());
```

## 5. Add an Admin User
First, create a user in Supabase Auth:
- Go to **Authentication** → **Users** → **Add user**.
- Enter an email and password (or use a sign‑up form in your app).  
  
**Note**: The user must exist in `auth.users` before you can add them to `admin_users`.

Then, get the user's UUID (visible in the Users list) and insert it into the `admin_users` table:

```sql
INSERT INTO admin_users (user_id)
VALUES ('the-user-uuid-here');
```

Alternatively, if you know the email, you can insert using a subquery:
```sql
INSERT INTO admin_users (user_id)
SELECT id FROM auth.users WHERE email = 'admin@example.com';
```

## 6. Add Sample Blog Posts
You can add posts manually via SQL or through the admin dashboard (once you have the frontend running). Example:

```sql
INSERT INTO blogs (title, excerpt, content, date, image, type)
VALUES (
  'Digital Future',
  'Exploring how AI and 3D printing are revolutionizing patient care...',
  'Full article content here...',
  '2024-03-20',
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format',
  'article'
);
```

For a video post:
```sql
INSERT INTO blogs (title, excerpt, date, type, video_id)
VALUES (
  'Understanding Gum Disease',
  'Watch this short video to learn about the causes and prevention of gum disease.',
  '2024-03-25',
  'video',
  'dQw4w9WgXcQ' -- Youtube Video ID
);
```

## 7. Verify Setup
- Start your frontend dev server (`npm run dev`).
- Go to the Blog page – you should see the posts you added.
- Go to `/login` and sign in with the admin email/password, then visit `/admin` to manage posts.

Your Supabase is now ready to power the MySmile blog.