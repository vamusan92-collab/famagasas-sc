const profile = {
  name: "Victor Amusan",
  username: "@victoramusan",
  accountType: "Personal account",
  bio: "Building, creating and discovering new possibilities on SC.",
  location: "Nigeria",
  followers: "0",
  following: "0",
  posts: "0",
};

const profileActions = [
  {
    label: "Edit profile",
    icon: "✏️",
  },
  {
    label: "Share profile",
    icon: "↗️",
  },
  {
    label: "Settings",
    icon: "⚙️",
  },
];

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div>
            <p className="text-sm font-medium text-slate-500">
              FAMAGASA&apos;S SC
            </p>

            <h1 className="text-xl font-bold">
              Profile
            </h1>
          </div>

          <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50">
            ⚙️
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        {/* Profile card */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Cover */}
          <div className="h-40 bg-slate-900 sm:h-52" />

          <div className="px-5 pb-6 sm:px-8">
            {/* Avatar */}
            <div className="-mt-12 flex items-end justify-between sm:-mt-16">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-slate-200 text-3xl font-bold sm:h-32 sm:w-32 sm:text-4xl">
                V
              </div>

              <button className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700">
                Edit profile
              </button>
            </div>

            {/* Identity */}
            <div className="mt-4">
              <h2 className="text-2xl font-bold">
                {profile.name}
              </h2>

              <p className="text-sm text-slate-500">
                {profile.username}
              </p>

              <span className="mt-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {profile.accountType}
              </span>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
                {profile.bio}
              </p>

              <p className="mt-3 text-sm text-slate-500">
                📍 {profile.location}
              </p>
            </div>

            {/* Stats */}
            <div className="mt-6 flex gap-8 border-t border-slate-100 pt-5">
              <div>
                <p className="font-bold">{profile.posts}</p>
                <p className="text-xs text-slate-400">Posts</p>
              </div>

              <div>
                <p className="font-bold">{profile.followers}</p>
                <p className="text-xs text-slate-400">Followers</p>
              </div>

              <div>
                <p className="font-bold">{profile.following}</p>
                <p className="text-xs text-slate-400">Following</p>
              </div>
            </div>
          </div>
        </section>

        {/* Profile actions */}
        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          {profileActions.map((action) => (
            <button
              key={action.label}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:border-slate-300 hover:shadow"
            >
              <span className="text-xl">
                {action.icon}
              </span>

              <p className="mt-2 text-sm font-semibold">
                {action.label}
              </p>
            </button>
          ))}
        </section>

        {/* Profile content */}
        <section className="mt-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                Your posts
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your posts, products and activity will appear here.
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <div className="text-4xl">
              📝
            </div>

            <h3 className="mt-3 font-bold">
              No posts yet
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Start sharing something with the SC community.
            </p>

            <button className="mt-5 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">
              Create a post
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
