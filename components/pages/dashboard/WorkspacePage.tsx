'use client';

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { MoreHorizontal, Plus, MessageSquare, Paperclip, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { useDashboard } from '@/context/DashboardContext';

const PriorityBadge = ({ priority }) => {
  const colors = {
    High: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    Low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  };
  return <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${colors[priority]}`}>{priority}</span>;
};

const WorkspacePage = () => {
  const { workspace, setWorkspaceBoard, addWorkspaceTask } = useDashboard();
  const [addForColumn, setAddForColumn] = useState(null);
  const [draft, setDraft] = useState({ content: '', priority: 'Medium' });

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const start = workspace.columns[source.droppableId];
    const finish = workspace.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = { ...start, taskIds: newTaskIds };
      setWorkspaceBoard({
        ...workspace,
        columns: { ...workspace.columns, [newColumn.id]: newColumn },
      });
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = { ...start, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = { ...finish, taskIds: finishTaskIds };

    setWorkspaceBoard({
      ...workspace,
      columns: {
        ...workspace.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    });
  };

  const submitTask = (e) => {
    e.preventDefault();
    if (!addForColumn) return;
    if (!draft.content.trim()) return;
    addWorkspaceTask(addForColumn, { content: draft.content.trim(), priority: draft.priority });
    setDraft({ content: '', priority: 'Medium' });
    setAddForColumn(null);
  };

  return (
    <div className="h-full flex flex-col pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Neural Optimizer Workspace</h1>
        <p className="text-gray-500 dark:text-gray-400">Kanban board for sprint management. Tasks persist locally.</p>
      </div>

      <div className="flex-1 overflow-x-auto pb-4 scrollbar-hide">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-6 min-w-max h-full">
            {workspace.columnOrder.map((columnId) => {
              const column = workspace.columns[columnId];
              const tasks = column.taskIds.map((taskId) => workspace.tasks[taskId]);

              return (
                <div key={column.id} className="w-80 flex flex-col bg-gray-100/50 dark:bg-[#121212]/50 rounded-2xl p-4 border border-gray-200 dark:border-white/5">
                  <div className="flex justify-between items-center mb-4 px-2">
                    <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      {column.title}
                      <span className="bg-gray-200 dark:bg-white/10 text-xs px-2 py-0.5 rounded-full text-gray-600 dark:text-gray-400">{tasks.length}</span>
                    </h3>
                    <button type="button" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>

                  <Droppable droppableId={column.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 transition-colors rounded-xl min-h-[150px] ${snapshot.isDraggingOver ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                      >
                        {tasks.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(dragProvided, snapshot) => (
                              <div
                                ref={dragProvided.innerRef}
                                {...dragProvided.draggableProps}
                                {...dragProvided.dragHandleProps}
                                className={`mb-3 outline-none ${snapshot.isDragging ? 'rotate-2 scale-105' : ''}`}
                              >
                                <GlassCard className="p-4 cursor-grab active:cursor-grabbing hover:border-blue-500/30">
                                  <div className="flex justify-between items-start mb-3">
                                    <PriorityBadge priority={task.priority} />
                                  </div>
                                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-4 leading-snug">{task.content}</p>
                                  <div className="flex items-center justify-between text-gray-400">
                                    <div className="flex items-center gap-3">
                                      {task.comments > 0 && (
                                        <span className="flex items-center gap-1 text-xs">
                                          <MessageSquare className="w-3.5 h-3.5" /> {task.comments}
                                        </span>
                                      )}
                                      {task.attachments > 0 && (
                                        <span className="flex items-center gap-1 text-xs">
                                          <Paperclip className="w-3.5 h-3.5" /> {task.attachments}
                                        </span>
                                      )}
                                    </div>
                                    <img src="https://i.pravatar.cc/150?img=11" className="w-6 h-6 rounded-full" alt="assignee" />
                                  </div>
                                </GlassCard>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>

                  <button
                    type="button"
                    className="w-full py-3 mt-2 rounded-xl flex items-center justify-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-white dark:hover:bg-white/5 dark:hover:text-white transition-all border border-transparent hover:border-gray-200 dark:hover:border-white/10 hover:shadow-sm"
                    onClick={() => setAddForColumn(column.id)}
                  >
                    <Plus className="w-4 h-4" /> Add Task
                  </button>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      </div>

      <AnimatePresence>
        {addForColumn && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.form
              onSubmit={submitTask}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="w-full max-w-md rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] shadow-2xl p-6 space-y-4"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">New task</h2>
                <button type="button" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10" onClick={() => setAddForColumn(null)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div>
                <label className="text-xs text-gray-500">Title</label>
                <input
                  autoFocus
                  className="mt-1 w-full rounded-lg border border-gray-200 dark:border-white/10 bg-transparent px-3 py-2 text-sm dark:text-white outline-none focus:border-blue-500"
                  value={draft.content}
                  onChange={(e) => setDraft((d) => ({ ...d, content: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Priority</label>
                <select
                  className="mt-1 w-full rounded-lg border border-gray-200 dark:border-white/10 bg-transparent px-3 py-2 text-sm dark:text-white outline-none focus:border-blue-500"
                  value={draft.priority}
                  onChange={(e) => setDraft((d) => ({ ...d, priority: e.target.value }))}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <Button type="button" variant="ghost" className="flex-1" onClick={() => setAddForColumn(null)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" className="flex-1">
                  Add
                </Button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkspacePage;


