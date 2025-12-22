import React, { useState, useEffect } from 'react';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { useCourse } from '../../context/CourseContext';
import './Teacher.css';

const CourseManager = ({ onCourseCreated }) => {
  const { courses, addCourse, deleteCourse } = useCourse();
  const [formData, setFormData] = useState({
    courseName: '',
    courseDescription: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleDelete = (courseId) => {
    const deleted = deleteCourse(courseId);
    if (deleted && onCourseCreated) {
      // Trigger refresh in parent component
      onCourseCreated(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const courseData = {
        course_name: formData.courseName,
        course_description: formData.courseDescription
      };

      const newCourse = addCourse(courseData);
      onCourseCreated && onCourseCreated(newCourse);
      
      setFormData({
        courseName: '',
        courseDescription: ''
      });
      
      setLoading(false);
    }, 500);
  };

  return (
    <div className="teacher-section">
      <div className="section-header">
        <h2 className="section-title">Course Management</h2>
        <p className="section-subtitle">Create and manage your courses</p>
      </div>

      <div className="teacher-card card-hover">
        <h3 className="card-title">Create New Course</h3>
        
        <form onSubmit={handleSubmit} className="teacher-form">
          <InputField
            type="text"
            label="Course Name"
            placeholder="Enter course name"
            value={formData.courseName}
            onChange={handleInputChange('courseName')}
            required
          />

          <div className="form-group">
            <label className="form-label">Course Description</label>
            <textarea
              className="textarea-field"
              placeholder="Enter course description"
              value={formData.courseDescription}
              onChange={handleInputChange('courseDescription')}
              rows="4"
              required
            />
          </div>

          <Button type="submit" loading={loading}>
            Create Course
          </Button>
        </form>
      </div>

      {courses.length > 0 && (
        <div className="teacher-card card-hover">
          <h3 className="card-title">Created Courses</h3>
          <div className="courses-list">
            {courses.map(course => (
              <div key={course.course_id} className="course-item">
                <div className="course-info">
                  <h4 className="course-name">{course.course_name}</h4>
                  <p className="course-description">{course.course_description}</p>
                  <span className="course-id">ID: {course.course_id}</span>
                </div>
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(course.course_id)}
                  title="Delete Course"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManager;