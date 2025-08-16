"use client";
import { useState } from "react";
import { ReactNode } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  BookOpen,
  Calendar,
  ChevronLeft,
  Save,
  X,
  Star,
  Heart,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Note {
  id: number;
  title: string;
  content: string;
  ayahReference: string;
  tags: string[];
  date: string;
  lastModified: string;
  color: string;
  isFavorite: boolean;
  rating: number;
}

interface NewNote {
  title: string;
  content: string;
  ayahReference: string;
  tags: string[];
  color: string;
}

interface Color {
  name: string;
  class: string;
}

interface BadgeProps {
  children: ReactNode;
  variant?: string;
  className?: string;
  onClick?: () => void;
}

interface TextareaProps {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

const Badge = ({
  children,
  variant = "default",
  className = "",
  onClick,
  ...props
}: BadgeProps) => {
  const baseStyles =
    "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-all duration-200";
  const variants: { [key: string]: string } = {
    default: "bg-green-500 text-white shadow-lg",
    secondary: "bg-gray-700 text-gray-300 hover:bg-gray-600",
    outline:
      "border border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:border-gray-500",
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant] || variants.default} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </span>
  );
};

const Textarea = ({ className = "", ...props }: TextareaProps) => {
  return (
    <textarea
      className={`w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-all duration-200 ${className}`}
      {...props}
    />
  );
};

const Page = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "Reflection on Bismillah",
      content:
        "The opening 'Bismillah' teaches us to begin everything in the name of Allah. This sets the intention and reminds us of our dependence on Allah for success in all our endeavors. It's a beautiful reminder that should be at the forefront of all our actions.",
      ayahReference: "Verse 1",
      tags: ["reflection", "bismillah", "intention"],
      date: "2024-01-15",
      lastModified: "2024-01-15",
      color: "blue",
      isFavorite: true,
      rating: 5,
    },
    {
      id: 2,
      title: "The Meaning of Al-Hamdulillah",
      content:
        "All praise belongs to Allah alone. This verse teaches us gratitude and recognition that everything good comes from Allah. It's not just thanks for blessings, but acknowledgment of Allah's sovereignty over all creation and circumstances.",
      ayahReference: "Verse 2",
      tags: ["gratitude", "praise", "sovereignty"],
      date: "2024-01-14",
      lastModified: "2024-01-14",
      color: "green",
      isFavorite: false,
      rating: 4,
    },
    {
      id: 3,
      title: "Seeking Guidance",
      content:
        "Ihdina as-sirata al-mustaqeem - Guide us to the straight path. This is our daily prayer for guidance, showing our constant need for Allah's direction in life. The straight path represents the balanced way of living according to Islamic principles.",
      ayahReference: "Verse 6",
      tags: ["guidance", "prayer", "path"],
      date: "2024-01-13",
      lastModified: "2024-01-13",
      color: "purple",
      isFavorite: true,
      rating: 5,
    },
    {
      id: 4,
      title: "The Day of Judgment",
      content:
        "Maliki yawm id-deen - Master of the Day of Judgment. This reminds us of the ultimate accountability we all face. Every action, word, and intention will be judged by Allah on that final day.",
      ayahReference: "Verse 4",
      tags: ["judgment", "accountability", "afterlife"],
      date: "2024-01-12",
      lastModified: "2024-01-12",
      color: "yellow",
      isFavorite: false,
      rating: 4,
    },
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [newNote, setNewNote] = useState<NewNote>({
    title: "",
    content: "",
    ayahReference: "",
    tags: [],
    color: "blue",
  });

  const surah = {
    id: 1,
    name: "Al-Faatiha",
    arabicName: "الفاتحة",
    totalAyahs: 7,
  };

  const colors: Color[] = [
    {
      name: "blue",
      class:
        "bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30 hover:border-blue-400/50",
    },
    {
      name: "green",
      class:
        "bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/30 hover:border-green-400/50",
    },
    {
      name: "purple",
      class:
        "bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/30 hover:border-purple-400/50",
    },
    {
      name: "yellow",
      class:
        "bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 hover:border-yellow-400/50",
    },
    {
      name: "pink",
      class:
        "bg-gradient-to-br from-pink-500/20 to-pink-600/10 border-pink-500/30 hover:border-pink-400/50",
    },
  ];

  const allTags = [...new Set(notes.flatMap((note) => note.tags))];

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => note.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  const handleCreateNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const note: Note = {
        ...newNote,
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        lastModified: new Date().toISOString().split("T")[0],
        tags: newNote.tags.filter((tag) => tag.trim() !== ""),
        isFavorite: false,
        rating: 0,
      };

      setNotes([note, ...notes]);
      setNewNote({
        title: "",
        content: "",
        ayahReference: "",
        tags: [],
        color: "blue",
      });
      setIsCreating(false);
    }
  };

  const handleUpdateNote = (id: number, updatedNote: Partial<Note>) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? {
              ...note,
              ...updatedNote,
              lastModified: new Date().toISOString().split("T")[0],
            }
          : note,
      ),
    );
    setEditingNote(null);
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const toggleFavorite = (id: number) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, isFavorite: !note.isFavorite } : note,
      ),
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getColorClass = (colorName: string) => {
    return colors.find((c) => c.name === colorName)?.class || colors[0].class;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-600"}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Enhanced Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white p-2"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                {surah.name} Notes
              </h1>
              <p className="text-gray-400 text-lg mt-2">
                {surah.arabicName} • {surah.totalAyahs} verses
              </p>
            </div>
          </div>

          {/* Enhanced Search and Filter Bar */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search notes by title, content, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-green-500 rounded-xl"
                />
              </div>
              <Button
                onClick={() => setIsCreating(true)}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Note
              </Button>
            </div>

            {/* Enhanced Tag Filter */}
            {allTags.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-semibold text-gray-300">
                    Filter by tags:
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={
                        selectedTags.includes(tag) ? "default" : "outline"
                      }
                      className="cursor-pointer hover:scale-105 transition-transform duration-200"
                      onClick={() => {
                        setSelectedTags((prev) =>
                          prev.includes(tag)
                            ? prev.filter((t) => t !== tag)
                            : [...prev, tag],
                        );
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                  {selectedTags.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedTags([])}
                      className="text-xs text-gray-400 hover:text-white px-2 py-1 h-auto"
                    >
                      Clear filters
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Create Note Form */}
        {isCreating && (
          <Card className="mb-8 bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-green-400 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Create New Note
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCreating(false)}
                  className="text-gray-400 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="text"
                placeholder="Note title..."
                value={newNote.title}
                onChange={(e) =>
                  setNewNote({ ...newNote, title: e.target.value })
                }
                className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-green-500 h-12 rounded-xl"
              />

              <Textarea
                placeholder="Write your note here..."
                value={newNote.content}
                onChange={(e) =>
                  setNewNote({ ...newNote, content: e.target.value })
                }
                rows={4}
              />

              <div className="flex flex-wrap gap-4">
                <Input
                  type="text"
                  placeholder="Ayah reference (e.g., Verse 1)"
                  value={newNote.ayahReference}
                  onChange={(e) =>
                    setNewNote({ ...newNote, ayahReference: e.target.value })
                  }
                  className="flex-1 min-w-48 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-green-500 h-12 rounded-xl"
                />

                <Input
                  type="text"
                  placeholder="Tags (comma separated)"
                  onChange={(e) =>
                    setNewNote({
                      ...newNote,
                      tags: e.target.value.split(",").map((t) => t.trim()),
                    })
                  }
                  className="flex-1 min-w-48 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-green-500 h-12 rounded-xl"
                />
              </div>

              {/* Enhanced Color Selection */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-300">
                  Color:
                </span>
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() =>
                      setNewNote({ ...newNote, color: color.name })
                    }
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                      newNote.color === color.name
                        ? "border-white scale-110"
                        : "border-gray-600"
                    } ${color.class.split(" ")[0]} ${color.class.split(" ")[1]}`}
                  />
                ))}
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleCreateNote}
                  disabled={!newNote.title.trim() || !newNote.content.trim()}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2 rounded-xl font-semibold flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Note
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsCreating(false)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700/50 px-6 py-2 rounded-xl"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <Card
              key={note.id}
              className={`${getColorClass(note.color)} backdrop-blur-sm border transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group`}
            >
              <CardContent className="p-6 space-y-4">
                {/* Enhanced Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-white group-hover:text-green-300 transition-colors duration-200 line-clamp-2">
                      {note.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        <span>{note.ayahReference}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(note.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {renderStars(note.rating)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(note.id)}
                      className={`h-8 w-8 p-0 transition-colors duration-200 ${
                        note.isFavorite
                          ? "text-red-400 hover:text-red-300"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <Heart
                        className="w-4 h-4"
                        fill={note.isFavorite ? "currentColor" : "none"}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingNote(note)}
                      className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteNote(note.id)}
                      className="h-8 w-8 p-0 text-gray-400 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Enhanced Content */}
                <p className="text-sm text-gray-300 line-clamp-6 leading-relaxed">
                  {note.content}
                </p>

                {/* Enhanced Tags */}
                {note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {note.tags.slice(0, 3).map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs px-2 py-1"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {note.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs px-2 py-1">
                        +{note.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Enhanced Footer */}
                <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-700/50">
                  <span>Modified: {formatDate(note.lastModified)}</span>
                  {note.isFavorite && (
                    <div className="flex items-center gap-1 text-red-400">
                      <Heart className="w-3 h-3 fill-current" />
                      <span>Favorite</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Empty State */}
        {filteredNotes.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50 max-w-md mx-auto">
              <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-300 mb-3">
                {notes.length === 0
                  ? "No notes yet"
                  : "No notes match your search"}
              </h3>
              <p className="text-gray-500 mb-6">
                {notes.length === 0
                  ? "Start by creating your first note to capture your Quranic reflections and insights."
                  : "Try adjusting your search terms or clearing your filters."}
              </p>
              {notes.length === 0 && (
                <Button
                  onClick={() => setIsCreating(true)}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  Create Your First Note
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
