import React, { useState, useRef, useEffect } from 'react';
import { Note } from '../types';

interface NoteRowProps {
  note: Note;
  onUpdateNote: (updatedNote: Note) => void;
}

const NoteRow: React.FC<NoteRowProps> = ({ note, onUpdateNote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(note.value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);
  
  const handleSave = () => {
    if (note.value !== value) {
        onUpdateNote({ ...note, value: value });
    }
    setIsEditing(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setValue(note.value);
      setIsEditing(false);
    }
  };

  const handleCellClick = () => {
    setIsEditing(true);
  };

  return (
    <tr className="hover:bg-gray-800 transition-colors">
      <td className="whitespace-nowrap py-3 px-4 text-sm">
        <div>
          <div className="font-medium text-white">{note.name}</div>
          <div className="text-xs text-gray-400 mt-1">
            Tutup: {note.closeTime} | Result: {note.resultTime}
          </div>
        </div>
      </td>
      <td 
        className="whitespace-nowrap py-2 px-4 text-sm text-center text-yellow-400 font-bold font-mono cursor-pointer"
        onClick={handleCellClick}
      >
        {isEditing ? (
          <input
            ref={inputRef}
            type="tel"
            pattern="[0-9]*"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="w-20 bg-gray-700 border border-cyan-500 rounded text-center p-1 outline-none"
            placeholder="0000"
          />
        ) : (
          <span className={note.value ? 'tracking-widest' : 'text-gray-500'}>
            {note.value || '----'}
          </span>
        )}
      </td>
    </tr>
  );
};

export default NoteRow;
