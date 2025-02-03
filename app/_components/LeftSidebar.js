import ProfileCardMini from './ProfileCardMini';
import SuggestionsCardMini from './SuggestionsCardMini';

export default function LeftSidebar() {
  return (
    <div className="flex h-screen flex-col gap-4 px-4 pt-6">
      <span className="static">
        <ProfileCardMini />
      </span>

      <span className="scrollbar-hide flex-1 overflow-y-auto scroll-smooth">
        <SuggestionsCardMini />
      </span>
    </div>
  );
}
