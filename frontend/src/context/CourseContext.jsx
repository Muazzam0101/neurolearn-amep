import React, { createContext, useContext, useState, useEffect } from 'react';

const CourseContext = createContext();

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};

export const CourseProvider = ({ children }) => {
  // Initialize state directly from localStorage
  const [courses, setCourses] = useState(() => {
    return JSON.parse(localStorage.getItem('amep_courses')) || [];
  });
  
  const [topics, setTopics] = useState(() => {
    return JSON.parse(localStorage.getItem('amep_topics')) || [];
  });

  const [hydrated, setHydrated] = useState(false);

  // Set hydrated after initial state is loaded
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem('amep_courses', JSON.stringify(courses));
    }
  }, [courses, hydrated]);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem('amep_topics', JSON.stringify(topics));
    }
  }, [topics, hydrated]);

  const addCourse = (courseData) => {
    const newCourse = {
      course_id: Date.now().toString(),
      ...courseData,
      created_at: new Date().toISOString()
    };
    const updatedCourses = [...courses, newCourse];
    setCourses(updatedCourses);
    localStorage.setItem('amep_courses', JSON.stringify(updatedCourses));
    return newCourse;
  };

  const addTopic = (topicData) => {
    const newTopic = {
      topic_id: Date.now().toString(),
      ...topicData,
      created_at: new Date().toISOString()
    };
    const updatedTopics = [...topics, newTopic];
    setTopics(updatedTopics);
    localStorage.setItem('amep_topics', JSON.stringify(updatedTopics));
    return newTopic;
  };

  const deleteCourse = (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?\nThis will remove all topics, content, and projects under it.')) {
      return false;
    }

    // Remove course
    const updatedCourses = courses.filter(course => course.course_id !== courseId);
    setCourses(updatedCourses);
    localStorage.setItem('amep_courses', JSON.stringify(updatedCourses));

    // Remove related topics
    const updatedTopics = topics.filter(topic => topic.course_id !== courseId);
    setTopics(updatedTopics);
    localStorage.setItem('amep_topics', JSON.stringify(updatedTopics));

    // Remove related content
    const contents = JSON.parse(localStorage.getItem('contents_table')) || [];
    const updatedContents = contents.filter(content => content.course_id !== courseId);
    localStorage.setItem('contents_table', JSON.stringify(updatedContents));

    return true;
  };

  const value = {
    courses,
    topics,
    addCourse,
    addTopic,
    deleteCourse,
    hydrated
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
};