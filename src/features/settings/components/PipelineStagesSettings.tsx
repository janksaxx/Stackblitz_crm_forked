import { useState } from 'react';
import { usePipelineStore } from '../stores/pipelineStore';
import { useDrag, useDrop } from 'react-dnd';
import { GripVertical, X, Plus, Pencil } from 'lucide-react';
import { motion } from 'framer-motion';

interface SortableStageProps {
  id: string;
  name: string;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
  moveStage: (dragIndex: number, hoverIndex: number) => void;
}

function SortableStage({ id, name, index, onEdit, onDelete, moveStage }: SortableStageProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PIPELINE_STAGE',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: 'PIPELINE_STAGE',
    hover: (item: { id: string; index: number }) => {
      if (item.index === index) return;
      moveStage(item.index, index);
      item.index = index;
    },
  }));

  return (
    <motion.div
      ref={(node) => drag(drop(node))}
      className={`flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm ${
        isDragging ? 'opacity-50' : ''
      }`}
      layout
    >
      <button className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing">
        <GripVertical className="h-5 w-5" />
      </button>

      <span className="flex-1 text-sm text-gray-900 dark:text-white">
        {name}
      </span>

      <button
        onClick={onEdit}
        className="text-gray-400 hover:text-gray-600"
      >
        <Pencil className="h-4 w-4" />
      </button>

      <button
        onClick={onDelete}
        className="text-gray-400 hover:text-red-600"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

export function PipelineStagesSettings() {
  const [newStageName, setNewStageName] = useState('');
  const [editingStage, setEditingStage] = useState<{ id: string; name: string } | null>(null);
  const { stages, updateStages, addStage, removeStage, updateStage } = usePipelineStore();

  const moveStage = (dragIndex: number, hoverIndex: number) => {
    const newStages = [...stages];
    const [removed] = newStages.splice(dragIndex, 1);
    newStages.splice(hoverIndex, 0, removed);
    updateStages(newStages);
  };

  const handleAddStage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStageName.trim()) {
      addStage({
        id: crypto.randomUUID(),
        name: newStageName.trim()
      });
      setNewStageName('');
    }
  };

  const handleUpdateStage = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStage && editingStage.name.trim()) {
      updateStage(editingStage.id, editingStage.name.trim());
      setEditingStage(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
          Customize Pipeline Stages
        </h3>

        <div className="space-y-2">
          {stages.map((stage, index) => (
            <SortableStage
              key={stage.id}
              id={stage.id}
              name={stage.name}
              index={index}
              onEdit={() => setEditingStage(stage)}
              onDelete={() => removeStage(stage.id)}
              moveStage={moveStage}
            />
          ))}
        </div>

        {editingStage && (
          <form onSubmit={handleUpdateStage} className="mt-4 flex gap-2">
            <input
              type="text"
              value={editingStage.name}
              onChange={(e) => setEditingStage({ ...editingStage, name: e.target.value })}
              className="flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Stage name"
              autoFocus
            />
            <button
              type="submit"
              className="px-3 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditingStage(null)}
              className="px-3 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
          </form>
        )}

        <form onSubmit={handleAddStage} className="mt-4 flex gap-2">
          <input
            type="text"
            value={newStageName}
            onChange={(e) => setNewStageName(e.target.value)}
            className="flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="New stage name"
          />
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Stage
          </button>
        </form>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          Note: Changes to pipeline stages will affect all existing deals. Make sure to review your pipeline before making changes.
        </p>
      </div>
    </div>
  );
}