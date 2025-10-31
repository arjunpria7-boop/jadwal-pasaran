import React, { useState, useCallback } from 'react';
import { Note } from './types';
import EditableNoteTable from './components/EditableNoteTable';

const initialDataString = `
KENTUCY MID	00:00	00:15
TOTO MACAU 00	00:01	00:05
TEXAS DAY	00:15	00:30
GERMANI PLUS	01:00	01:10
NEW YORK MID	01:15	01:30
CAROLINA DAY	01:45	02:00
OREGON 01	02:45	03:00
CHICAGO LOTTERY	03:15	03:30
GANGNAM	04:30	04:45
BERLIN LOTTERY	04:45	05:00
NAMDONG	05:15	05:30
TEXAS EVENING	05:45	06:00
OREGON 04	05:45	06:00
QATAR MORNING	08:00	08:15
GWANSAN POOLS	08:15	08:30
CALIFORNIA	08:30	08:45
FLORIDA EVE	08:30	08:45
OREGON 07	08:45	09:00
YORDANIA	08:50	09:00
NEW YORK EVE	09:15	09:30
KENTUKY EVE	09:45	10:00
TEXAS NIGHT	09:45	10:00
SIPRUS MORNING	10:00	10:15
CAROLINA EVENING	10:15	10:30
MAGNUM CAMBODIA	11:30	11:55
OREGON 10	11:45	12:00
BULLSEYE	11:50	12:10
QATAR MIDDAY	12:00	12:15
TOTO MACAU 13	13:00	13:05
FUJI LOTTO	13:00	13:15
SIDNEY	13:30	13:50
SYDNEY LOTTO	13:40	13:55
SIPRUS MIDDAY	14:00	14:15
MANILA LOTTERY	14:15	14:30
VIETNAM	15:00	15:15
CHINA POOLS	15:15	15:30
TOTO MACAU 16	16:00	16:05
QATAR EVENING	16:00	16:15
NANOI LOTERRY	16:15	16:30
JAPAN POOLS	17:00	17:20
singapore	17:30	17:45
BANGKOK POOL	17:30	17:45
SIPRUS EVENING	18:00	18:15
GIEYANG POOLS	18:30	18:45
MIAMI LOTTERY	18:45	19:00
OSAKA LOTTERY	18:45	19:00
TOTO MACAU 19	19:00	19:05
PCSO	20:00	20:15
QATAR NIGHT	20:00	20:15
TAIWAN	20:30	20:45
TENNESE	21:00	21:15
DUBAI	21:15	21:30
TEXAS MORNING	21:45	22:00
TOTO MACAU 22	22:00	22:05
SIPRUS NIGHT	22:00	22:15
HONGKONG	22:30	23:00
HONGKONG LOTTO	22:50	23:10
TOTO MACAU 23	23:00	23:05
GENTING LOTTERY	23:15	23:30
ALASKA	23:30	23:45
`;

// Parse the initial data once, when the module loads for better performance.
const lines = initialDataString.trim().split('\n');
const parsedNotes = lines.map((line, index) => {
  const parts = line.split('\t');
  const name = parts[0]?.trim() || '';
  const closeTime = parts[1]?.trim() || 'N/A';
  const resultTime = parts[2]?.trim() || 'N/A';
  return {
    id: `${name}-${index}`,
    name: name,
    value: '', // Default value is empty
    closeTime,
    resultTime,
  };
});
// Sort by closeTime
const INITIAL_NOTES: Note[] = parsedNotes.sort((a, b) => a.closeTime.localeCompare(b.closeTime));


function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const savedNotes = localStorage.getItem('jadwalPasaranNotes');
      if (savedNotes) {
        return JSON.parse(savedNotes);
      }
    } catch (error) {
      console.error("Gagal memuat data tersimpan dari localStorage", error);
      localStorage.removeItem('jadwalPasaranNotes');
    }
    return INITIAL_NOTES;
  });

  const updateNote = (updatedNote: Note) => {
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
  };

  const handleSave = useCallback(() => {
    try {
      localStorage.setItem('jadwalPasaranNotes', JSON.stringify(notes));
      alert('Data berhasil disimpan!');
    } catch (error) {
      console.error("Gagal menyimpan data ke localStorage", error);
      alert('Gagal menyimpan data.');
    }
  }, [notes]);

  const handleReset = useCallback(() => {
    if (window.confirm('Apakah Anda yakin ingin mereset semua hasil? Perubahan yang belum disimpan akan hilang.')) {
      setNotes(INITIAL_NOTES);
      localStorage.removeItem('jadwalPasaranNotes');
      alert('Data berhasil direset.');
    }
  }, []);


  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-cyan-400">Jadwal Pasaran</h1>
      </header>
      <div className="flex justify-end gap-4 mb-4">
        <button
          onClick={handleSave}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105"
          aria-label="Simpan semua perubahan hasil"
        >
          Simpan
        </button>
        <button
          onClick={handleReset}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105"
          aria-label="Reset semua hasil ke keadaan awal"
        >
          Reset
        </button>
      </div>
      <main>
        <EditableNoteTable
          notes={notes}
          onUpdateNote={updateNote}
        />
      </main>
    </div>
  );
}

export default App;