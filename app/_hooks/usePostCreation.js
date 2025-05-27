import { useRouter } from 'next/navigation';
import { uploadUserImage, createPost } from '@/app/_services/actions';
import { useSession } from 'next-auth/react';

export function usePostCreation() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleUpload = async (image, caption) => {
    if (!image) return alert('Select an image!');
    if (!session?.user?.userId) return alert('Not logged in!');

    try {
      // Upload image to Supabase Storage
      const imageUrl = await uploadUserImage({
        file: image,
        userId: session.user.userId,
      });

      // Save post in database
      await createPost({
        userId: session.user.userId,
        imageUrl,
        caption,
      });

      alert('Post created!');
      router.push('/account'); // Redirect to account page
    } catch (err) {
      alert('Upload failed: ' + err.message);
    }
  };

  return { handleUpload };
}
