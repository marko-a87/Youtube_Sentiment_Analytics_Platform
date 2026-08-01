//Author: Shamar Malcolm

// The goal of the youtube data service is to provide a set of functions that are able to do the following:
// 1. Look up a video by title from a specific channel
// 2. Get the number of likes for a specific video from a specific channel
// 3. Get the number of comments for a specific video from a specific channel
// 4. Get the number of views for a specific video from a specific channel
// 5. Get the date a specific video was published from a specific channel
// 6. Persist the data from the above functions to a database for future use



// This service will be used to ingest data from the YouTube API and store it in a database

import { google } from "googleapis";

// Initialize the YouTube API client
const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

export async function getVideoByTitleFromChannel(channelHandle, searchTitle) {
  if (!channelHandle || !searchTitle) {
    throw new Error("Both channelHandle and searchTitle are required.");
  }

  const channelRes = await youtube.channels.list({
    part: ["contentDetails"],
    forHandle: channelHandle,
  });

  const channel = channelRes.data.items?.[0];
  if (!channel) {
    throw new Error(`Channel not found for handle: ${channelHandle}`);
  }

  const uploadsPlaylistId = channel.contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsPlaylistId) {
    throw new Error(`No uploads playlist found for channel: ${channelHandle}`);
  }

  const playlistRes = await youtube.playlistItems.list({
    part: ["snippet", "contentDetails"],
    playlistId: uploadsPlaylistId,
    maxResults: 25,
  });

  const keyword = searchTitle.trim().toLowerCase();
  const matchingItem = playlistRes.data.items.find((item) => {
    const title = (item.snippet?.title || "").toLowerCase();
    return title.includes(keyword);
  });

  if (!matchingItem) {
    throw new Error(
      `No video matching "${searchTitle}" was found in ${channelHandle}`,
    );
  }

  const videoId = matchingItem.contentDetails.videoId;

  const videoRes = await youtube.videos.list({
    part: ["snippet", "statistics"],
    id: [videoId],
  });

  const video = videoRes.data.items?.[0];
  if (!video) {
    throw new Error("Video details could not be loaded.");
  }

  return {
    channelTitle: video.snippet?.channelTitle,
    videoId: video.id,
    title: video.snippet?.title,
    publishedAt: video.snippet?.publishedAt,
    description: video.snippet?.description,
    viewCount: Number(video.statistics?.viewCount || 0),
    likeCount: Number(video.statistics?.likeCount || 0),
    commentCount: Number(video.statistics?.commentCount || 0),
  };
}

