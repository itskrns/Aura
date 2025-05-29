'use server';

import { getSession } from '@/app/_lib/getSession';
import supabase from '@/app/_lib/supabase';
import { redirect } from 'next/navigation';

export async function getUser(email) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  return data;
}

export async function createUser(newUser) {
  const { data, error } = await supabase
    .from('users')
    .insert([newUser])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('User could not be created');
  }

  console.log(data);
  return data;
}

// USER UPDATE
export async function updateUser(formData) {
  const session = await getSession();
  if (!session) throw new Error('Login required');

  const username = formData.get('username').toLowerCase();
  const email = formData.get('email').toLowerCase();
  const bio = formData.get('bio');
  const fullName = formData.get('fullName');

  const updateData = {};
  if (username) updateData.username = username;
  if (email) updateData.email = email;
  if (bio) updateData.bio = bio;
  if (fullName) updateData.fullName = fullName;

  if (Object.keys(updateData).length === 0) {
    throw new Error('Nothing to update');
  }

  const { error } = await supabase
    .from('users')
    .update(updateData)
    .eq('email', session.user.email);

  if (error) throw new Error('Failed to update user');

  const redirectTo = username ? `/account/` : '/account/settings';
  redirect(redirectTo);
}

// IMAGE UPLOAD
export async function uploadUserImage({ file, userId }) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}_${Date.now()}.${fileExt}`;

  // 1. Upload image to Supabase Storage (bucket: 'posts')
  const { data, error: uploadError } = await supabase.storage
    .from('posts')
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  // 2. Get public URL
  const { data: urlData } = supabase.storage
    .from('posts')
    .getPublicUrl(fileName);

  const imageUrl = urlData.publicUrl;
  return imageUrl;
}

// CREATE POST
export async function createPost({ userId, imageUrl, caption }) {
  // User info lao
  const { data: user } = await supabase
    .from('users')
    .select('username, profilePhoto')
    .eq('id', userId)
    .single();

  const { data, error } = await supabase
    .from('posts')
    .insert([
      {
        user_id: userId,
        image_url: imageUrl,
        caption,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}
// GET POSTS BY USER
export async function getPostsByUserId(userId) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getAllPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function uploadProfilePhoto({ file, userId }) {
  const fileExt = file.name.split('.').pop();
  const fileName = `profile_${userId}.${fileExt}`;

  // 1. Upload image to Supabase Storage (bucket: 'avatars')
  const { data, error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(fileName, file, { upsert: true });

  if (uploadError) throw uploadError;

  // 2. Get public URL
  const { data: urlData } = supabase.storage
    .from('avatars')
    .getPublicUrl(fileName);

  const avatarUrl = urlData.publicUrl;

  // 3. Update user in DB
  const { error: dbError } = await supabase
    .from('users')
    .update({ profilePhoto: avatarUrl })
    .eq('id', userId);

  if (dbError) throw dbError;

  return avatarUrl;
}

export async function followUser(followerId, followingId) {
  if (!followerId || !followingId)
    throw new Error('Invalid followerId or followingId');

  console.log(`From server: ${followerId}, ${followingId}`);

  const { error } = await supabase.from('follows').insert([
    {
      follower_id: parseInt(followerId, 10),
      following_id: parseInt(followingId, 10),
    },
  ]);

  if (error) throw error;
}

export async function unfollowUser(followerId, followingId) {
  if (!followerId || !followingId)
    throw new Error('Invalid followerId or followingId');

  console.log(`From server: ${followerId}, ${followingId}`);

  const { error } = await supabase
    .from('follows')
    .delete()
    .eq('follower_id', parseInt(followerId, 10))
    .eq('following_id', parseInt(followingId, 10));

  if (error) throw error;
}

export async function isFollowing(followerId, followingId) {
  if (!followerId || !followingId) return false;

  console.log(`From server: ${followerId}, ${followingId}`);

  const { data, error } = await supabase
    .from('follows')
    .select('id')
    .eq('follower_id', parseInt(followerId, 10))
    .eq('following_id', parseInt(followingId, 10))
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return !!data;
}

// Get followers count
export async function getFollowersCount(userId) {
  const { count, error } = await supabase
    .from('follows')
    .select('*', { count: 'exact', head: true })
    .eq('following_id', userId);
  if (error) throw error;
  return count;
}

// Get following count
export async function getFollowingCount(userId) {
  const { count, error } = await supabase
    .from('follows')
    .select('*', { count: 'exact', head: true })
    .eq('follower_id', userId);
  if (error) throw error;
  return count;
}

export async function getHomeFeedPosts(userId) {
  // 1. Get following ids
  const { data: following } = await supabase
    .from('follows')
    .select('following_id')
    .eq('follower_id', userId);

  const followingIds = following ? following.map((f) => f.following_id) : [];
  followingIds.push(userId);

  console.log('userId:', userId);
  console.log('followingIds:', followingIds);

  // 2. Get posts (NO JOIN NEEDED)
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*', 'users(username, profilePhoto)')
    .in('user_id', followingIds)
    .order('created_at', { ascending: false });

  console.log('posts:', posts);

  if (error) console.log('error:', error);

  return posts || [];
}

export async function getPostById(postId) {
  const { data, error } = await supabase
    .from('posts')
    .select('*, users(username, profilePhoto)')
    .eq('id', postId)
    .single();

  if (error) return null;
  return data;
}

export async function deletePost(postId) {
  const { error } = await supabase.from('posts').delete().eq('id', postId);
  if (error) throw error;
}

// Like a post
export async function likePost(postId, userId) {
  const { error } = await supabase
    .from('likes')
    .insert([{ post_id: postId, user_id: userId }]);

  if (error) throw error;
}

// Unlike a post
export async function unlikePost(postId, userId) {
  const { error } = await supabase
    .from('likes')
    .delete()
    .eq('post_id', postId)
    .eq('user_id', userId);

  if (error) throw error;
}

// Get likes count & user like status
export async function getPostLikes(postId, userId) {
  const { count } = await supabase
    .from('likes')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', postId);

  const { data: liked } = await supabase
    .from('likes')
    .select('*')
    .eq('post_id', postId)
    .eq('user_id', userId);

  return { count: count || 0, liked: liked && liked.length > 0 };
}

// Add a comment
export async function addComment(postId, userId, comment) {
  const { error } = await supabase.from('comments').insert([
    {
      post_id: postId,
      user_id: userId,
      content: comment,
    },
  ]);

  if (error) throw error;
}

// Get comments
export async function getPostComments(postId) {
  const { data, error } = await supabase
    .from('comments')
    .select('*, users(username, profilePhoto)')
    .eq('post_id', postId)
    .order('created_at', { ascending: false });

  if (error) return [];
  return data;
}

// Delete a comment
export async function deleteComment(commentId) {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId);

  if (error) console.error('Error deleting comment:', error.message);
}

export async function getFollowers(userId) {
  const { data, error } = await supabase
    .from('follows')
    .select(
      `
      id:follower_id,
      users!fk_follower(id, username, profilePhoto)
    `,
    )
    .eq('following_id', userId);

  if (error) {
    console.error('Supabase Error:', error.message);
    throw error;
  }
  return data;
}

export async function getFollowing(userId) {
  const { data, error } = await supabase
    .from('follows')
    .select(
      `
      id:following_id,
      users!fk_following(id, username, profilePhoto)
    `,
    )
    .eq('follower_id', parseInt(userId, 10));

  if (error) {
    console.error('Supabase Error:', error.message);
    throw error;
  }
  return data;
}
