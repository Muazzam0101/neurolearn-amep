import React, { createContext, useContext, useState, useEffect } from 'react';

const ContentContext = createContext();

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export const ContentProvider = ({ children }) => {
  // Initialize state directly from localStorage
  const [contents, setContents] = useState(() => {
    return JSON.parse(localStorage.getItem('contents_table')) || [];
  });

  const [hydrated, setHydrated] = useState(false);

  // Set hydrated after initial state is loaded
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Save to localStorage whenever contents change
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem('contents_table', JSON.stringify(contents));
    }
  }, [contents, hydrated]);

  const addContent = async (contentData) => {
    // Convert PDF file to base64 if it exists
    let pdfData = null;
    if (contentData.notesFile) {
      pdfData = await convertFileToBase64(contentData.notesFile);
    }

    const newContent = {
      content_id: Date.now().toString(),
      course_id: contentData.course_id,
      topic_id: contentData.topic_id,
      title: contentData.title,
      pdf_name: contentData.pdf_file_name,
      pdf_data: pdfData,
      difficulty: contentData.difficulty,
      estimated_time: contentData.estimated_time,
      tags: contentData.tags || [],
      notes_text: contentData.notes_text,
      video_url: contentData.video_url,
      created_at: new Date().toISOString()
    };

    const updatedContents = [...contents, newContent];
    setContents(updatedContents);
    
    // Immediately sync to localStorage
    localStorage.setItem('contents_table', JSON.stringify(updatedContents));
    
    return newContent;
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const getContentsByTopic = (topicId) => {
    const validCourses = JSON.parse(localStorage.getItem('amep_courses')) || [];
    const validCourseIds = validCourses.map(course => course.course_id);
    return contents.filter(content => 
      content.topic_id === topicId && 
      validCourseIds.includes(content.course_id)
    );
  };

  const getContentsByCourse = (courseId) => {
    const validCourses = JSON.parse(localStorage.getItem('amep_courses')) || [];
    const validCourseIds = validCourses.map(course => course.course_id);
    return contents.filter(content => 
      content.course_id === courseId && 
      validCourseIds.includes(content.course_id)
    );
  };

  const getValidContents = () => {
    const validCourses = JSON.parse(localStorage.getItem('amep_courses')) || [];
    const validCourseIds = validCourses.map(course => course.course_id);
    return contents.filter(content => validCourseIds.includes(content.course_id));
  };

  const getPdfUrl = (content) => {
    if (content.pdf_data) {
      return content.pdf_data; // base64 data URL
    }
    return null;
  };

  const value = {
    contents,
    addContent,
    getContentsByTopic,
    getContentsByCourse,
    getValidContents,
    getPdfUrl,
    hydrated
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};