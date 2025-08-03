import { useState, useEffect, useCallback } from "react";

export const useJournal = () => {
  const [journals, setJournals] = useState([
    { id: 1, title: "Demo Entry 1", content: "Welcome to your demo journal." },
    { id: 2, title: "Demo Entry 2", content: "This is a second page." },
    { id: 3, title: "Demo Entry 3", content: "Everything here runs locally." }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJournal, setEditingJournal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const entriesPerPage = 5;

  const fetchJournals = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300); // simulate minimal delay
  }, []);

  useEffect(() => {
    fetchJournals();
  }, [fetchJournals]);

  const totalPages = Math.ceil(journals.length / entriesPerPage);
  const currentEntries = journals.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) return;

    setLoading(true);

    setTimeout(() => {
      if (editingJournal) {
        setJournals((prev) =>
          prev.map((j) =>
            j.id === editingJournal.id ? { ...j, ...formData } : j
          )
        );
      } else {
        const newEntry = {
          id: Date.now(),
          title: formData.title,
          content: formData.content,
        };
        setJournals((prev) => [...prev, newEntry]);
      }

      setFormData({ title: "", content: "" });
      setEditingJournal(null);
      setIsDialogOpen(false);
      setLoading(false);
    }, 300);
  };

  const handleDelete = (id) => {
    setLoading(true);
    setTimeout(() => {
      const updated = journals.filter((j) => j.id !== id);
      setJournals(updated);

      const newTotalPages = Math.ceil(updated.length / entriesPerPage);
      setCurrentPage(newTotalPages > 0 ? newTotalPages : 1);
      setLoading(false);
    }, 300);
  };

  const handleEdit = (journal) => {
    setEditingJournal(journal);
    setFormData({ title: journal.title, content: journal.content });
    setIsDialogOpen(true);
  };

  const handleNewEntry = () => {
    setEditingJournal(null);
    setFormData({ title: "", content: "" });
    setIsDialogOpen(true);
  };

  return {
    journals,
    currentEntries,
    totalPages,
    currentPage,
    setCurrentPage,
    isDialogOpen,
    setIsDialogOpen,
    editingJournal,
    formData,
    setFormData,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleNewEntry,
    loading,
    error,
    fetchJournals,
  };
};
