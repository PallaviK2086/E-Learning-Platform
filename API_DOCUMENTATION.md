# Smart Farming Learning Portal - Backend API Documentation

## 🚀 Overview

Your e-learning platform backend is built with **Lovable Cloud**, providing:
- PostgreSQL database (not MongoDB, but offers the same capabilities)
- JWT-based authentication (automatically handled)
- Secure RESTful APIs
- Row Level Security (RLS) for data protection
- Automatic password hashing (bcrypt-equivalent)

## 📊 Database Schema

### **profiles** table
Stores user profile information
```typescript
{
  id: UUID (primary key, references auth.users)
  name: TEXT
  email: TEXT
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}
```

### **user_roles** table
Manages user roles (admin/user)
```typescript
{
  id: UUID (primary key)
  user_id: UUID (references profiles)
  role: 'admin' | 'user'
  created_at: TIMESTAMP
}
```

### **lessons** table
Stores all learning content
```typescript
{
  id: UUID (primary key)
  title: TEXT
  description: TEXT
  video_id: TEXT (YouTube video ID)
  category: TEXT
  thumbnail_url: TEXT (optional)
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}
```

### **user_progress** table
Tracks completed lessons per user
```typescript
{
  id: UUID (primary key)
  user_id: UUID (references profiles)
  lesson_id: UUID (references lessons)
  completed_at: TIMESTAMP
}
```

### **support_requests** table
Stores support form submissions
```typescript
{
  id: UUID (primary key)
  name: TEXT
  email: TEXT
  phone: TEXT (optional)
  message: TEXT
  status: TEXT (default: 'pending')
  created_at: TIMESTAMP
}
```

## 🔐 Authentication APIs

### Register New User
```typescript
import { supabase } from "@/integrations/supabase/client";

const { data, error } = await supabase.auth.signUp({
  email: "user@example.com",
  password: "secure_password",
  options: {
    data: {
      name: "User Name"
    },
    emailRedirectTo: `${window.location.origin}/`
  }
});
```

**Response:**
- Success: Returns user object with JWT token
- Error: Returns error message

**Security:** 
- Passwords are automatically hashed
- Email confirmation is disabled for development (enabled by default)
- JWT token expires after session timeout

---

### Login User
```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "secure_password"
});
```

**Response:**
- Success: Returns session with JWT token and user data
- Error: Returns authentication error

---

### Logout User
```typescript
const { error } = await supabase.auth.signOut();
```

---

### Reset Password
```typescript
// Request password reset email
const { error } = await supabase.auth.resetPasswordForEmail(
  "user@example.com",
  {
    redirectTo: `${window.location.origin}/reset-password`
  }
);
```

---

### Get Current User Session
```typescript
const { data: { session }, error } = await supabase.auth.getSession();
```

---

## 📚 Lessons Management APIs

### Get All Lessons
```typescript
const { data: lessons, error } = await supabase
  .from('lessons')
  .select('*')
  .order('created_at', { ascending: false });
```

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Soil Health Management",
    "description": "Learn modern techniques...",
    "video_id": "WxQzl0qlf-8",
    "category": "Soil Health",
    "thumbnail_url": "https://...",
    "created_at": "2025-11-10T...",
    "updated_at": "2025-11-10T..."
  }
]
```

**Security:** Public access (anyone can view lessons)

---

### Get Single Lesson by ID
```typescript
const { data: lesson, error } = await supabase
  .from('lessons')
  .select('*')
  .eq('id', 'lesson-uuid')
  .single();
```

**Response:**
```json
{
  "id": "uuid",
  "title": "Soil Health Management",
  "description": "Learn modern techniques...",
  "video_id": "WxQzl0qlf-8",
  "category": "Soil Health",
  "thumbnail_url": "https://...",
  "created_at": "2025-11-10T...",
  "updated_at": "2025-11-10T..."
}
```

---

### [ADMIN ONLY] Add New Lesson
```typescript
const { data: newLesson, error } = await supabase
  .from('lessons')
  .insert({
    title: "New Farming Technique",
    description: "Detailed description",
    video_id: "youtube_video_id",
    category: "Technology",
    thumbnail_url: "https://..." // optional
  })
  .select()
  .single();
```

**Security:** Only users with 'admin' role can create lessons

---

### [ADMIN ONLY] Update Lesson
```typescript
const { data: updatedLesson, error } = await supabase
  .from('lessons')
  .update({
    title: "Updated Title",
    description: "Updated description"
  })
  .eq('id', 'lesson-uuid')
  .select()
  .single();
```

**Security:** Only users with 'admin' role can update lessons

---

### [ADMIN ONLY] Delete Lesson
```typescript
const { error } = await supabase
  .from('lessons')
  .delete()
  .eq('id', 'lesson-uuid');
```

**Security:** Only users with 'admin' role can delete lessons

---

## 📈 User Dashboard & Progress APIs

### Get User's Completed Lessons
```typescript
const { data: progress, error } = await supabase
  .from('user_progress')
  .select(`
    *,
    lessons (*)
  `)
  .eq('user_id', userId);
```

**Response:**
```json
[
  {
    "id": "uuid",
    "user_id": "user-uuid",
    "lesson_id": "lesson-uuid",
    "completed_at": "2025-11-10T...",
    "lessons": {
      "id": "lesson-uuid",
      "title": "Soil Health Management",
      "description": "...",
      "video_id": "...",
      "category": "..."
    }
  }
]
```

**Security:** Users can only view their own progress

---

### Mark Lesson as Completed
```typescript
const { data, error } = await supabase
  .from('user_progress')
  .insert({
    user_id: userId,
    lesson_id: lessonId
  })
  .select()
  .single();
```

**Security:** Users can only add progress for themselves

---

### Check if Lesson is Completed
```typescript
const { data, error } = await supabase
  .from('user_progress')
  .select('*')
  .eq('user_id', userId)
  .eq('lesson_id', lessonId)
  .maybeSingle();

const isCompleted = !!data;
```

---

## 💬 Contact/Support APIs

### Submit Support Request
```typescript
const { data, error } = await supabase
  .from('support_requests')
  .insert({
    name: "User Name",
    email: "user@example.com",
    phone: "+91 12345-67890", // optional
    message: "I need help with..."
  })
  .select()
  .single();
```

**Response:**
```json
{
  "id": "uuid",
  "name": "User Name",
  "email": "user@example.com",
  "phone": "+91 12345-67890",
  "message": "I need help with...",
  "status": "pending",
  "created_at": "2025-11-10T..."
}
```

**Security:** Anyone can submit support requests (no auth required)

---

### [ADMIN ONLY] Get All Support Requests
```typescript
const { data: requests, error } = await supabase
  .from('support_requests')
  .select('*')
  .order('created_at', { ascending: false });
```

**Security:** Only users with 'admin' role can view support requests

---

### [ADMIN ONLY] Update Support Request Status
```typescript
const { data, error } = await supabase
  .from('support_requests')
  .update({ status: 'resolved' })
  .eq('id', 'request-uuid')
  .select()
  .single();
```

---

## 👥 User Roles Management

### Check if User is Admin
```typescript
const { data: roles, error } = await supabase
  .from('user_roles')
  .select('role')
  .eq('user_id', userId);

const isAdmin = roles?.some(r => r.role === 'admin');
```

---

### [ADMIN ONLY] Grant Admin Role
```typescript
const { data, error } = await supabase
  .from('user_roles')
  .insert({
    user_id: targetUserId,
    role: 'admin'
  });
```

**Note:** To make yourself an admin initially, run this SQL in the Cloud tab:
```sql
INSERT INTO user_roles (user_id, role) 
VALUES ('your-user-id', 'admin');
```

---

## 🔒 Security Features

### Row Level Security (RLS)
All tables have RLS enabled with the following policies:

1. **profiles**: Users can only view/update their own profile
2. **lessons**: Public read access, admin-only write access
3. **user_progress**: Users can only view/modify their own progress
4. **support_requests**: Public insert, admin-only read
5. **user_roles**: Users can view their own roles only

### JWT Token
- Automatically included in all authenticated requests
- Tokens expire after session timeout
- Refresh handled automatically by Supabase client

### Password Security
- Passwords are automatically hashed using bcrypt-equivalent
- Minimum password length enforced
- Password reset requires email verification

---

## 🛠️ Local Development

### Frontend Setup
All API calls are already integrated in your React app using the Supabase client:
```typescript
import { supabase } from "@/integrations/supabase/client";
```

### Environment Variables
The following environment variables are automatically configured:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Public API key

**Note:** These are managed automatically by Lovable Cloud. Do not create a `.env` file manually.

---

## 📦 Sample Seed Data

Your database is pre-populated with 6 agriculture learning lessons:
1. Soil Health Management
2. Smart Irrigation Technology
3. Crop Disease Identification & Prevention
4. Modern Farming Business Strategies
5. Precision Agriculture with Drones
6. Organic Farming Techniques

All lessons link to real educational YouTube videos about farming.

---

## 🚨 Error Handling

### Common Error Codes
```typescript
// Authentication errors
if (error?.message.includes('Invalid login credentials')) {
  // Handle invalid credentials
}

// RLS policy violation
if (error?.message.includes('row-level security')) {
  // User doesn't have permission
}

// Unique constraint violation
if (error?.message.includes('duplicate key')) {
  // Record already exists
}
```

---

## 📖 Additional Resources

- View your database: Click "Cloud" tab in Lovable
- Test APIs: Use the built-in React app
- Monitor logs: Check Cloud tab → Functions for edge function logs
- Security: All data is secured with RLS policies

---

## 🎯 Quick Start Checklist

✅ Database schema created  
✅ Authentication configured  
✅ RLS policies enabled  
✅ Sample data seeded  
✅ Frontend integrated  

**Next Steps:**
1. Sign up a user account in the app
2. Make yourself admin (see "Grant Admin Role" section)
3. Test creating/updating lessons as admin
4. Test user progress tracking
5. Test support form submission

---

**Need help?** All features are accessible through the Lovable Cloud interface (Cloud tab) or through the React app at `/`
