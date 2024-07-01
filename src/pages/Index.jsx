import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const Index = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchTopStories = async () => {
      try {
        const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
        const storyIds = await response.json();
        const top10StoryIds = storyIds.slice(0, 10);

        const storyPromises = top10StoryIds.map(async (id) => {
          const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          return storyResponse.json();
        });

        const stories = await Promise.all(storyPromises);
        setStories(stories);
      } catch (error) {
        console.error('Error fetching top stories:', error);
      }
    };

    fetchTopStories();
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-full max-w-2xl p-4">
        <h1 className="text-3xl text-center mb-4">Hacker News Top Stories</h1>
        <ScrollArea className="h-[600px] w-full rounded-md border p-4">
          {stories.map((story) => (
            <Card key={story.id} className="mb-4">
              <CardHeader>
                <CardTitle>{story.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>By: {story.by}</p>
                <p>Score: {story.score}</p>
                <a href={story.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  Read more
                </a>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};

export default Index;