import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { MoreHorizontal, Plus, Clock, MessageSquare, Paperclip } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';

const initialData = {
  columns: {
    'todo': { id: 'todo', title: 'To Do', taskIds: ['task-1', 'task-2'] },
    'in-progress': { id: 'in-progress', title: 'In Progress', taskIds: ['task-3'] },
    'review': { id: 'review', title: 'Review', taskIds: ['task-4'] },
    'done': { id: 'done', title: 'Done', taskIds: [] },
  },
  tasks: {
    'task-1': { id: 'task-1', content: 'Design System setup', priority: 'High', comments: 3, attachments: 1 },
    'task-2': { id: 'task-2', content: 'Database schema design', priority: 'Medium', comments: 0, attachments: 2 },
    'task-3': { id: 'task-3', content: 'Authentication Flow', priority: 'High', comments: 5, attachments: 0 },
    'task-4': { id: 'task-4', content: 'Landing Page UI', priority: 'Low', comments: 1, attachments: 0 },
  },
  columnOrder: ['todo', 'in-progress', 'review', 'done'],
};

const PriorityBadge = ({ priority }) => {
  const colors = {
    High: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    Low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  };
  return <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${colors[priority]}`}>{priority}</span>;
};

const WorkspacePage = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...start, taskIds: newTaskIds };
      setData({ ...data, columns: { ...data.columns, [newColumn.id]: newColumn } });
      return;
    }

    // Moving between columns
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = { ...start, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = { ...finish, taskIds: finishTaskIds };

    setData({
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    });
  };

  return (
    <div className="h-full flex flex-col pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Neural Optimizer Workspace</h1>
        <p className="text-gray-500 dark:text-gray-400">Kanban board for sprint management.</p>
      </div>

      <div className="flex-1 overflow-x-auto pb-4 scrollbar-hide">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-6 min-w-max h-full">
            {data.columnOrder.map((columnId) => {
              const column = data.columns[columnId];
              const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

              return (
                <div key={column.id} className="w-80 flex flex-col bg-gray-100/50 dark:bg-[#121212]/50 rounded-2xl p-4 border border-gray-200 dark:border-white/5">
                  <div className="flex justify-between items-center mb-4 px-2">
                    <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      {column.title}
                      <span className="bg-gray-200 dark:bg-white/10 text-xs px-2 py-0.5 rounded-full text-gray-600 dark:text-gray-400">
                        {tasks.length}
                      </span>
                    </h3>
                    <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
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
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`mb-3 outline-none ${snapshot.isDragging ? 'rotate-2 scale-105' : ''}`}
                              >
                                <GlassCard className="p-4 cursor-grab active:cursor-grabbing hover:border-blue-500/30">
                                  <div className="flex justify-between items-start mb-3">
                                    <PriorityBadge priority={task.priority} />
                                  </div>
                                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-4 leading-snug">
                                    {task.content}
                                  </p>
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

                  <button className="w-full py-3 mt-2 rounded-xl flex items-center justify-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-white dark:hover:bg-white/5 dark:hover:text-white transition-all border border-transparent hover:border-gray-200 dark:hover:border-white/10 hover:shadow-sm">
                    <Plus className="w-4 h-4" /> Add Task
                  </button>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default WorkspacePage;
