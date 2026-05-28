import { MetadataRoute } from "next";

// TODO: update SITE_URL to your custom domain once connected in Vercel
const SITE_URL = "https://website-beta-nine-87.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
