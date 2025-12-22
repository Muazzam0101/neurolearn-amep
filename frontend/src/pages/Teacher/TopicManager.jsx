import React, { useState, useEffect } from 'react';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import MultiSelect from '../../components/MultiSelect';
import { useCourse } from '../../context/CourseContext';
import './Teacher.css';

const TopicManager = ({ onTopicCreated }) => {
  const { courses, topics, addTopic } = useCourse();
  const [formData, setFormData] = useState({
    topicName: '',
    topicDescription: '',
    courseId: '',
    prerequisiteTopics: []
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handlePrerequisiteChange = (selectedPrerequisites) => {
    setFormData({ ...formData, prerequisiteTopics: selectedPrerequisites });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const topicData = {
        course_id: formData.courseId,
        topic_name: formData.topicName,
        topic_description: formData.topicDescription,
        prerequisite_topic_ids: formData.prerequisiteTopics
      };

      const newTopic = addTopic(topicData);
      onTopicCreated && onTopicCreated(newTopic);
      
      setFormData({
        topicName: '',
        topicDescription: '',
        courseId: '',
        prerequisiteTopics: []
      });
      
      setLoading(false);
    }, 500);
  };

  // Get available topics for prerequisites (excluding current course topics to avoid circular dependencies)
  const getPrerequisiteOptions = () => {
    return topics
      .filter(topic => topic.course_id !== formData.courseId)
      .map(topic => ({
        value: topic.topic_id,
        label: `${topic.topic_name} (${getCourseNameById(topic.course_id)})`
      }));
  };

  const getCourseNameById = (courseId) => {
    const course = courses.find(c => c.course_id === courseId);
    return course ? course.course_name : 'Unknown Course';
  };

  const getTopicsByCourse = (courseId) => {
    return topics.filter(topic => topic.course_id === courseId);
  };

  return (
    <div className="teacher-section">
      <div className="section-header">
        <h2 className="section-title">Topic Management</h2>
        <p className="section-subtitle">Create topics and define learning prerequisites</p>
      </div>

      <div className="teacher-card">
        <h3 className="card-title">Create New Topic</h3>
        
        <form onSubmit={handleSubmit} className="teacher-form">
          <div className="form-group">
            <label className="form-label">Select Course</label>
            <select
              className="select-field"
              value={formData.courseId}
              onChange={handleInputChange('courseId')}
              required
            >
              <option value="">Choose a course</option>
              {courses.map(course => (
                <option key={course.course_id} value={course.course_id}>
                  {course.course_name}
                </option>
              ))}
            </select>
          </div>

          <InputField
            type="text"
            label="Topic Name"
            placeholder="Enter topic name"
            value={formData.topicName}
            onChange={handleInputChange('topicName')}
            required
          />

          <div className="form-group">
            <label className="form-label">Topic Description</label>
            <textarea
              className="textarea-field"
              placeholder="Enter topic description"
              value={formData.topicDescription}
              onChange={handleInputChange('topicDescription')}
              rows="3"
              required
            />
          </div>

          <MultiSelect
            label="Prerequisite Topics"
            placeholder="Select prerequisite topics (optional)"
            options={getPrerequisiteOptions()}
            selectedValues={formData.prerequisiteTopics}
            onChange={handlePrerequisiteChange}
          />

          <Button type="submit" loading={loading} disabled={!formData.courseId}>
            Create Topic
          </Button>
        </form>
      </div>

      {courses.length > 0 && (
        <div className="teacher-card">
          <h3 className="card-title">Topics by Course</h3>
          {courses.map(course => {
            const courseTopics = getTopicsByCourse(course.course_id);
            return (
              <div key={course.course_id} className="course-topics-section">
                <h4 className="course-section-title">{course.course_name}</h4>
                {courseTopics.length === 0 ? (
                  <p className="no-topics">No topics created yet</p>
                ) : (
                  <div className="topics-list">
                    {courseTopics.map(topic => (
                      <div key={topic.topic_id} className="topic-item">
                        <div className="topic-info">
                          <h5 className="topic-name">{topic.topic_name}</h5>
                          <p className="topic-description">{topic.topic_description}</p>
                          {topic.prerequisite_topic_ids.length > 0 && (
                            <div className="prerequisites">
                              <span className="prerequisites-label">Prerequisites:</span>
                              <span className="prerequisites-list">
                                {topic.prerequisite_topic_ids.map(prereqId => {
                                  const prereqTopic = topics.find(t => t.topic_id === prereqId);
                                  return prereqTopic ? prereqTopic.topic_name : 'Unknown';
                                }).join(', ')}
                              </span>
                            </div>
                          )}
                          <span className="topic-id">ID: {topic.topic_id}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TopicManager;