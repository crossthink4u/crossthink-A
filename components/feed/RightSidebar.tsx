import React from 'react';
import { Heart, Repeat2 } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'repost',
    text: 'Neural Optimizer Framework just opened 2 new roles for contributors...',
    time: '5d ago'
  },
  {
    id: 2,
    type: 'like',
    text: 'Eco-Tracking Campus App reached 4 team members. Almost full!',
    time: '5d ago'
  },
  {
    id: 3,
    type: 'like',
    text: 'AI Study Buddy is now piloting with 500 students this semester...',
    time: '6d ago'
  },
  {
    id: 4,
    type: 'repost',
    text: 'Smart Campus IoT Dashboard saved $50k in energy costs this year...',
    time: '6d ago'
  },
  {
    id: 5,
    type: 'like',
    text: 'VR Campus Tour launching at Open Day — October 2026',
    time: '1mo ago'
  }
];

const creators = [
  {
    id: 1,
    name: 'Dr. Emily Chen',
    handle: '@emilychen',
  },
  {
    id: 2,
    name: 'Maya Roth',
    handle: '@mayaroth',
  },
  {
    id: 3,
    name: 'Alex Turner',
    handle: '@alexturner',
  },
  {
    id: 4,
    name: 'Prof. James Wu',
    handle: '@jameswu',
  },
  {
    id: 5,
    name: 'Dr. Ravi Patel',
    handle: '@ravipatel',
  }
];

export default function RightSidebar() {
  return (
    <div className="sticky top-20 w-full flex flex-col gap-5">
      {/* Activity Section */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-5">
        <h3 className="text-white font-bold text-sm mb-5">Activity</h3>
        <div className="flex flex-col gap-5">
          {activities.map((item) => (
            <div key={item.id} className="flex items-start gap-3">
              <div className="mt-0.5 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                {item.type === 'repost' ? (
                  <Repeat2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Heart className="w-4 h-4 text-violet-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-300 leading-snug">
                  <span className="text-gray-400 mr-1">{item.type === 'repost' ? 'Reposted' : 'Liked'}</span>
                  <span className="text-gray-200 font-medium line-clamp-2">{item.text}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Creators Section */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-5">
        <h3 className="text-white font-bold text-sm mb-5">Related Creators</h3>
        <div className="flex flex-col gap-4">
          {creators.map((creator) => (
            <div key={creator.id} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-sm font-semibold text-white">
                  {creator.name.charAt(0)}
                </div>
                <div className="flex flex-col min-w-0">
                  <h4 className="text-sm font-semibold text-white truncate">{creator.name}</h4>
                  <p className="text-xs text-gray-500 truncate">{creator.handle}</p>
                </div>
              </div>
              <button className="px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-colors">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
