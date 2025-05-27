import { useRouter } from 'next/navigation';

export function useNavigation() {
  const router = useRouter();

  function goToUserProfile(userId) {
    router.push(`/account/search/${userId}`);
  }

  function goToFollowers(userId) {
    router.push(`/account/${userId}/followers`);
  }

  function goToFollowings(userId) {
    router.push(`/account/${userId}/following`);
  }

  function goToPostPreview(page, postId) {
    router.push(`/account/${page}/postPreview/${postId}`);
  }

  return {
    goToUserProfile,
    goToFollowers,
    goToFollowings,
    goToPostPreview,
  };
}
