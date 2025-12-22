import React, { useState, useEffect } from 'react';
import CourseManager from './CourseManager';
import TopicManager from './TopicManager';
import ContentUploader from './ContentUploader';
import PBLManager from './PBLManager';
import LogoutButton from '../../components/LogoutButton';
import Logo from '../../components/Logo';
import { useCourse } from '../../context/CourseContext';
import './Teacher.css';

const TeacherDashboard = () => {
  const { courses, topics } = useCourse();

  const handleCourseCreated = () => {
    // Courses are managed by CourseContext, no need for local state
  };

  const handleTopicCreated = () => {
    // Topics are managed by CourseContext, no need for local state
  };

  return (
    <div className="teacher-container fade-in">
      <div className="dashboard-header">
        <div className="header-logo">
          <Logo size="small" clickable={true} />
        </div>
        <div className="teacher-header">
          <h1 className="teacher-main-title">Teacher Dashboard</h1>
          <p className="teacher-main-subtitle">
            Create courses, add topics, upload content, and design PBL projects with assessment rubrics
          </p>
        </div>
        <LogoutButton />
      </div>

      <div className="teacher-content-grid">
        <CourseManager onCourseCreated={handleCourseCreated} />
        <TopicManager onTopicCreated={handleTopicCreated} />
        <div className="content-uploader-section">
          <ContentUploader />
        </div>
        <div className="pbl-manager-section">
          <PBLManager />
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;