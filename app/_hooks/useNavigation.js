import { useRouter } from 'next/navigation';

export function useNavigation() {
  const router = useRouter();

  function goToUserProfile(userId) {
    router.push(`/account/user/${userId}`);
  }

  function goToFollowers() {
    router.push(`/account/user/followers`);
  }

  function goToFollowing() {
    router.push(`/account/user/following`);
  }

  function goToPostPreview(postId) {
    router.push(`/account/user/post/${postId}`);
  }

  return {
    goToUserProfile,
    goToFollowers,
    goToFollowing,
    goToPostPreview,
  };
}
