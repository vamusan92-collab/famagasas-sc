"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type Post = {
  id: number;
  author: string;
  avatar: string;
  meta: string;
  text: string;
  likes: number;
  comments: string[];
  liked: boolean;
  shared: boolean;
};

const initialPosts: Post[] = [
  {
    id: 1,
    author: "SC Business",
    avatar: "SC",
    meta: "Business account · 2h",
    text:
      "Discover products, connect with businesses and experience a simpler way to shop and communicate.",
    likes: 12,
    comments: [],
    liked: false,
    shared: false,
  },
];

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [postText, setPostText] = useState("");
  const [showComposer, setShowComposer] = useState(false);
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>(
    {}
  );
  const [openComments, setOpenComments] = useState<number[]>([]);
  const [notice, setNotice] = useState("");

  const showNotice = (message: string) => {
    setNotice(message);

    setTimeout(() => {
      setNotice("");
    }, 2000);
  };

  const handleCreatePost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedText = postText.trim();

    if (!trimmedText) {
      return;
    }

    const newPost: Post = {
      id: Date.now(),
      author: "You",
      avatar: "V",
      meta: "Just now",
      text: trimmedText,
      likes: 0,
      comments: [],
      liked: false,
      shared: false,
    };

    setPosts((currentPosts) => [newPost, ...currentPosts]);
    setPostText("");
    setShowComposer(false);
    showNotice("Post published!");
  };

  const toggleLike = (postId: number) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const toggleComments = (postId: number) => {
    setOpenComments((current) =>
      current.includes(postId)
        ? current.filter((id) => id !== postId)
        : [...current, postId]
    );
  };

  const handleComment = (event: FormEvent<HTMLFormElement>, postId: number) => {
    event.preventDefault();

    const text = commentInputs[postId]?.trim();

    if (!text) {
      return;
    }

    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [...post.comments, text],
            }
          : post
      )
    );

    setCommentInputs((current) => ({
      ...current,
      [postId]: "",
    }));
  };

  const handleShare = (postId: number) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              shared: true,
            }
          : post
      )
    );

    showNotice("Post shared!");
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Temporary notification */}
      {notice && (
        <div className="fixed left-1/2 top-20 z-[100] -translate-x-1/2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg">
          {notice}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-lg font-black text-white">
              SC
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">
                FAMAGASA&apos;S SC
              </h1>

              <p className="text-xs text-slate-500">
                Connect. Discover. Do Business.
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/search"
              className="rounded-full px-4 py-2 text-sm font-medium hover:bg-slate-100"
            >
              🔍 Search
            </Link>

            <button
              type="button"
              onClick={() => showNotice("Notifications coming soon.")}
              className="rounded-full px-4 py-2 text-sm font-medium hover:bg-slate-100"
            >
              🔔
            </button>

            <Link
              href="/profile"
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Profile
            </Link>
          </div>

          <button
            type="button"
            onClick={() => showNotice("Mobile menu coming soon.")}
            className="rounded-full border border-slate-200 px-3 py-2 sm:hidden"
          >
            ☰
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 pb-24 sm:px-6 lg:grid-cols-[240px_1fr_280px]">
        {/* Left navigation */}
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-2">
            <NavItem icon="🏠" label="Home" active />
            <NavItem icon="💬" label="Chat" href="/chat" />
            <NavItem icon="👥" label="Communities" href="/communities" />
            <NavItem icon="🛍️" label="Shop" href="/shop" />
            <NavItem icon="🏢" label="Businesses" href="/businesses" />
            <NavItem icon="🤖" label="SC AI" href="/ai" />
            <NavItem icon="💳" label="SC Pay" href="/sc-pay" />
          </nav>
        </aside>

        {/* Feed */}
        <section className="space-y-6">
          {/* Welcome card */}
          <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-sm">
            <p className="mb-2 text-sm font-medium text-slate-300">
              Welcome to SC
            </p>

            <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Connect with people. Discover businesses. Do more.
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
              A new social-commerce ecosystem being built with Africa in mind.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/search"
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100"
              >
                Explore
              </Link>

              <Link
                href="/ai"
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100"
              >
                Open SC AI
              </Link>
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <QuickAction icon="🛍️" title="Shop" href="/shop" />
            <QuickAction icon="💬" title="Chat" href="/chat" />
            <QuickAction
              icon="👥"
              title="Communities"
              href="/communities"
            />
            <QuickAction icon="💳" title="SC Pay" href="/sc-pay" />
          </div>

          {/* Post composer */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            {!showComposer ? (
              <>
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-200 font-bold">
                    V
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowComposer(true)}
                    className="flex-1 rounded-full bg-slate-100 px-4 py-3 text-left text-sm text-slate-500 hover:bg-slate-200"
                  >
                    What&apos;s happening?
                  </button>
                </div>

                <div className="mt-3 flex justify-between">
                  <div className="flex gap-2 text-sm text-slate-500">
                    <button
                      type="button"
                      onClick={() => showNotice("Photo upload coming soon.")}
                    >
                      📷 Photo
                    </button>

                    <button
                      type="button"
                      onClick={() => showNotice("Video upload coming soon.")}
                    >
                      🎥 Video
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        showNotice("Product posting coming soon.")
                      }
                    >
                      🛍️ Product
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowComposer(true)}
                    className="rounded-full bg-slate-900 px-4 py-1.5 text-sm font-semibold text-white hover:bg-slate-700"
                  >
                    Post
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={handleCreatePost}>
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-200 font-bold">
                    V
                  </div>

                  <textarea
                    autoFocus
                    value={postText}
                    onChange={(event) => setPostText(event.target.value)}
                    placeholder="What's happening?"
                    rows={4}
                    className="min-h-28 flex-1 resize-none rounded-2xl border border-slate-200 p-4 text-sm outline-none focus:border-slate-400"
                  />
                </div>

                <div className="mt-3 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowComposer(false);
                      setPostText("");
                    }}
                    className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={!postText.trim()}
                    className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Publish
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Posts */}
          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 font-bold">
                  {post.avatar}
                </div>

                <div>
                  <p className="font-semibold">{post.author}</p>
                  <p className="text-xs text-slate-500">{post.meta}</p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-700">
                {post.text}
              </p>

              {post.id === 1 && (
                <div className="mt-4 flex h-48 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                  Product / media preview
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-6 border-t border-slate-100 pt-4 text-sm text-slate-500">
                <button
                  type="button"
                  onClick={() => toggleLike(post.id)}
                  className={`font-medium ${
                    post.liked ? "text-red-500" : "hover:text-slate-900"
                  }`}
                >
                  {post.liked ? "❤️" : "♡"} Like {post.likes > 0 && post.likes}
                </button>

                <button
                  type="button"
                  onClick={() => toggleComments(post.id)}
                  className="hover:text-slate-900"
                >
                  💬 Comment {post.comments.length > 0 && post.comments.length}
                </button>

                <button
                  type="button"
                  onClick={() => handleShare(post.id)}
                  className="hover:text-slate-900"
                >
                  {post.shared ? "✓ Shared" : "↗ Share"}
                </button>
              </div>

              {/* Comments */}
              {openComments.includes(post.id) && (
                <div className="mt-4 border-t border-slate-100 pt-4">
                  {post.comments.length > 0 && (
                    <div className="mb-4 space-y-2">
                      {post.comments.map((comment, index) => (
                        <div
                          key={`${post.id}-${index}`}
                          className="rounded-xl bg-slate-50 px-4 py-3 text-sm"
                        >
                          <span className="font-semibold">You:</span>{" "}
                          {comment}
                        </div>
                      ))}
                    </div>
                  )}

                  <form
                    onSubmit={(event) => handleComment(event, post.id)}
                    className="flex gap-2"
                  >
                    <input
                      value={commentInputs[post.id] || ""}
                      onChange={(event) =>
                        setCommentInputs((current) => ({
                          ...current,
                          [post.id]: event.target.value,
                        }))
                      }
                      placeholder="Write a comment..."
                      className="min-w-0 flex-1 rounded-full border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-400"
                    />

                    <button
                      type="submit"
                      className="rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
                    >
                      Comment
                    </button>
                  </form>
                </div>
              )}
            </article>
          ))}
        </section>

        {/* Right sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-bold">Trending on SC</h3>

              <div className="mt-4 space-y-4 text-sm">
                <Trend title="#SCLaunch" count="2.4K posts" />
                <Trend title="#AfricanBusiness" count="1.8K posts" />
                <Trend title="#TechAfrica" count="964 posts" />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                SC AI
              </p>

              <h3 className="mt-2 font-bold">
                Your intelligent assistant
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Get help discovering products, businesses and services.
              </p>

              <Link
                href="/ai"
                className="mt-4 block w-full rounded-full bg-slate-900 py-2.5 text-center text-sm font-semibold text-white"
              >
                Try SC AI
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white px-2 py-2 sm:hidden">
        <div className="flex justify-around overflow-x-auto text-xs">
          <MobileNav icon="🏠" label="Home" href="/" />
          <MobileNav icon="💬" label="Chat" href="/chat" />
          <MobileNav icon="💳" label="SC Pay" href="/sc-pay" />
          <MobileNav icon="🏢" label="Businesses" href="/businesses" />
          <MobileNav
            icon="👥"
            label="Communities"
            href="/communities"
          />
          <MobileNav icon="🛍️" label="Shop" href="/shop" />
          <MobileNav icon="👤" label="Profile" href="/profile" />
          <MobileNav icon="🤖" label="AI" href="/ai" />
        </div>
      </nav>
    </main>
  );
}

function NavItem({
  icon,
  label,
  active = false,
  href,
}: {
  icon: string;
  label: string;
  active?: boolean;
  href?: string;
}) {
  const className = `flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
    active
      ? "bg-slate-900 text-white"
      : "text-slate-600 hover:bg-slate-100"
  }`;

  if (href) {
    return (
      <Link href={href} className={className}>
        <span>{icon}</span>
        {label}
      </Link>
    );
  }

  return (
    <button type="button" className={className}>
      <span>{icon}</span>
      {label}
    </button>
  );
}

function QuickAction({
  icon,
  title,
  href,
}: {
  icon: string;
  title: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="text-xl">{icon}</span>
      <p className="mt-2 text-sm font-semibold">{title}</p>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:border-slate-300 hover:shadow"
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:border-slate-300 hover:shadow"
    >
      {content}
    </button>
  );
}

function Trend({
  title,
  count,
}: {
  title: string;
  count: string;
}) {
  return (
    <div>
      <p className="font-semibold">{title}</p>
      <p className="text-xs text-slate-400">{count}</p>
    </div>
  );
}

function MobileNav({
  icon,
  label,
  href,
}: {
  icon: string;
  label: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="flex flex-col items-center gap-1 px-3 py-1 text-slate-600"
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className="flex flex-col items-center gap-1 px-3 py-1 text-slate-600"
    >
      {content}
    </button>
  );
}
