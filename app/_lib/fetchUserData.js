import supabase from '@/app/_lib/supabase';

async function fetchUserAndPosts(userId) {
  console.log('Fetching user and posts for ID:', userId); // Debugging

  if (!userId) {
    throw new Error('User ID is required');
  }

  // Fetch user details
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (userError || !user) {
    throw new Error('User not found');
  }

  // Fetch user posts
  const { data: posts, error: postsError } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (postsError) {
    throw new Error('Error fetching posts');
  }

  return { user, posts };
}

export default fetchUserAndPosts;
