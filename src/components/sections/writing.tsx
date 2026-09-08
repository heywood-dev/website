// Server Component: fetches the live Power Stack archive from Substack (see
// src/lib/substack.ts) and hands it to the client component that renders
// the interactive section. New issues appear here automatically — no
// per-post code change needed.
import { getPowerStackPosts } from "@/lib/substack";
import { WritingClient } from "./writing-client";

export async function Writing() {
  const posts = await getPowerStackPosts();
  return <WritingClient posts={posts} />;
}
