import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { uploadProfilePhoto } from '@/app/_services/actions';

export function useProfilePhotoUpload(curUser) {
  const { update } = useSession();
  const router = useRouter();

  const uploadImage = async (image) => {
    if (!image) return alert('Select an image!');

    try {
      await uploadProfilePhoto({ file: image, userId: curUser.id });
      alert('Profile photo updated!');
      await update();
      router.push('/account/profile');
    } catch (err) {
      alert('Upload failed: ' + err.message);
    }
  };

  return { uploadImage };
}
