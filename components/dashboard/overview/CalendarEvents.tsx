'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Video, Target, GraduationCap, Presentation, Clock } from 'lucide-react';
import { useDashboard } from '@/context/DashboardContext';

const eventStyles = {
  meeting: { icon: Video, color: 'text-blue-400', dot: 'bg-blue-400' },
  deadline: { icon: Target, color: 'text-red-400', dot: 'bg-red-400' },
  mentor: { icon: GraduationCap, color: 'text-amber-400', dot: 'bg-amber-400' },
  presentation: { icon: Presentation, color: 'text-purple-400', dot: 'bg-purple-400' },
  sprint: { icon: Clock, color: 'text-cyan-400', dot: 'bg-cyan-400' },
};

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export default function CalendarEvents() {
  const { calendarEvents } = useDashboard();
  const [monthOffset, setMonthOffset] = useState(0);

  const now = new Date();
  const viewDate = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  const eventDates = useMemo(() => {
    const set = new Set();
    calendarEvents.forEach((e) => {
      const d = new Date(e.date);
      if (d.getMonth() === month && d.getFullYear() === year) set.add(d.getDate());
    });
    return set;
  }, [calendarEvents, month, year]);

  const upcoming = calendarEvents
    .map((e) => ({ ...e, dt: new Date(e.date) }))
    .filter((e) => e.dt >= now)
    .sort((a, b) => a.dt - b.dt)
    .slice(0, 5);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
      <h2 className="text-base font-semibold text-white mb-4">Calendar & Events</h2>

      {/* Mini Calendar */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => setMonthOffset((o) => o - 1)} className="p-1 rounded hover:bg-white/5 text-gray-500"><ChevronLeft className="w-4 h-4" /></button>
          <span className="text-sm text-white font-medium">
            {viewDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
          </span>
          <button onClick={() => setMonthOffset((o) => o + 1)} className="p-1 rounded hover:bg-white/5 text-gray-500"><ChevronRight className="w-4 h-4" /></button>
        </div>

        <div className="cal-grid mb-1">
          {DAYS.map((d) => <div key={d} className="text-center text-[10px] text-gray-600 py-1">{d}</div>)}
        </div>
        <div className="cal-grid">
          {Array.from({ length: startDay }).map((_, i) => <div key={`e-${i}`} />)}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const isToday = day === now.getDate() && month === now.getMonth() && year === now.getFullYear();
            const hasEvent = eventDates.has(day);
            return (
              <div
                key={day}
                className={`relative flex items-center justify-center py-1.5 text-[11px] rounded-md transition-colors ${
                  isToday ? 'bg-cyan-500/20 text-cyan-400 font-semibold' : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                {day}
                {hasEvent && <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-cyan-400" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="space-y-2">
        {upcoming.map((ev) => {
          const cfg = eventStyles[ev.type] || eventStyles.meeting;
          const Icon = cfg.icon;
          return (
            <div key={ev.id} className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <div className={`w-7 h-7 rounded-full bg-white/[0.04] flex items-center justify-center`}>
                <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium truncate">{ev.title}</p>
                <p className="text-[10px] text-gray-500">
                  {ev.dt.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                  {ev.duration > 0 && ` · ${ev.duration}min`}
                </p>
              </div>
              <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}


