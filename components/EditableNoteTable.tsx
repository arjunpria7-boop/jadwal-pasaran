import React from 'react';
import { Note } from '../types';
import NoteRow from './NoteRow';

interface EditableNoteTableProps {
  notes: Note[];
  onUpdateNote: (updatedNote: Note) => void;
}

const EditableNoteTable: React.FC<EditableNoteTableProps> = ({ notes, onUpdateNote }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-white w-3/4">Pasaran</th>
            <th scope="col" className="py-3.5 px-4 text-center text-sm font-semibold text-white w-1/4">Result</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800 bg-gray-900">
          {notes.map((note) => (
            <NoteRow
              key={note.id}
              note={note}
              onUpdateNote={onUpdateNote}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditableNoteTable;