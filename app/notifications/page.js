export default function page() {
  return (
    <div className="flex min-h-screen flex-col items-center rounded-sm bg-light p-0 md:p-6">
      <div className="w-full p-4">
        <h2 className="text-xl font-semibold text-[--color-secondary]">
          Notifications
        </h2>
        <ul className="mt-4 space-y-3">
          {[1, 2, 3, 4].map((notification, index) => (
            <li
              key={index}
              className="rounded-lg bg-[--color-bg] p-3 shadow-sm transition-all duration-200 hover:-translate-y-1"
            >
              <p className="text-sm text-[--color-dark]">
                User {index + 1} liked your post!
              </p>
              <span className="text-xs text-gray-500">5 mins ago</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
