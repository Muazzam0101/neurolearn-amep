import React, { useState } from 'react';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { useContent } from '../../context/ContentContext';
import { useCourse } from '../../context/CourseContext';
import './Teacher.css';

const ContentUploader = () => {
  const { addContent, contents } = useContent();
  const { courses, topics } = useCourse();
  const [formData, setFormData] = useState({
    courseId: '',
    topicId: '',
    notesType: 'file', // 'file' or 'text'
    notesFile: null,
    notesText: '',
    videoUrl: '',
    difficulty: 'Medium',
    estimatedTime: '',
    tags: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, notesFile: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(async () => {
      const contentData = {
        course_id: formData.courseId,
        topic_id: formData.topicId,
        title: formData.notesFile?.name || `${getTopicNameById(formData.topicId)} Notes`,
        pdf_file_name: formData.notesFile?.name || null,
        notesFile: formData.notesFile, // Pass the file for base64 conversion
        notes_text: formData.notesText || null,
        video_url: formData.videoUrl || null,
        difficulty: formData.difficulty,
        estimated_time: parseInt(formData.estimatedTime),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      await addContent(contentData);
      
      setFormData({
        courseId: '',
        topicId: '',
        notesType: 'file',
        notesFile: null,
        notesText: '',
        videoUrl: '',
        difficulty: 'Medium',
        estimatedTime: '',
        tags: ''
      });
      
      setLoading(false);
    }, 500);
  };

  const getTopicsForCourse = (courseId) => {
    return topics.filter(topic => topic.course_id === courseId);
  };

  const getCourseNameById = (courseId) => {
    const course = courses.find(c => c.course_id === courseId);
    return course ? course.course_name : 'Course not found';
  };

  const getTopicNameById = (topicId) => {
    const topic = topics.find(t => t.topic_id === topicId);
    return topic ? topic.topic_name : 'Topic not found';
  };

  return (
    <div className="teacher-section">
      <div className="section-header">
        <h2 className="section-title">Content Upload</h2>
        <p className="section-subtitle">Upload learning materials for AI processing and mastery tracking</p>
      </div>

      <div className="teacher-card">
        <h3 className="card-title">Upload Learning Content</h3>
        
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

          <div className="form-group">
            <label className="form-label">Select Topic</label>
            <select
              className="select-field"
              value={formData.topicId}
              onChange={handleInputChange('topicId')}
              required
              disabled={!formData.courseId}
            >
              <option value="">Choose a topic</option>
              {getTopicsForCourse(formData.courseId).map(topic => (
                <option key={topic.topic_id} value={topic.topic_id}>
                  {topic.topic_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Notes Format</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="notesType"
                  value="file"
                  checked={formData.notesType === 'file'}
                  onChange={handleInputChange('notesType')}
                />
                <span>Upload File (PDF/Text)</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="notesType"
                  value="text"
                  checked={formData.notesType === 'text'}
                  onChange={handleInputChange('notesType')}
                />
                <span>Enter Text</span>
              </label>
            </div>
          </div>

          {formData.notesType === 'file' ? (
            <div className="form-group">
              <label className="form-label">Upload Notes</label>
              <input
                type="file"
                accept=".pdf,.txt,.doc,.docx"
                onChange={handleFileChange}
                className="file-input"
                required
              />
            </div>
          ) : (
            <div className="form-group">
              <label className="form-label">Notes Content</label>
              <textarea
                className="textarea-field"
                placeholder="Enter your notes content here..."
                value={formData.notesText}
                onChange={handleInputChange('notesText')}
                rows="6"
                required
              />
            </div>
          )}

          <InputField
            type="url"
            label="Video URL (Optional)"
            placeholder="https://youtube.com/watch?v=..."
            value={formData.videoUrl}
            onChange={handleInputChange('videoUrl')}
          />

          <div className="form-group">
            <label className="form-label">Difficulty Level</label>
            <select
              className="select-field"
              value={formData.difficulty}
              onChange={handleInputChange('difficulty')}
              required
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <InputField
            type="number"
            label="Estimated Study Time (minutes)"
            placeholder="30"
            value={formData.estimatedTime}
            onChange={handleInputChange('estimatedTime')}
            required
          />

          <InputField
            type="text"
            label="Topic Tags (comma separated)"
            placeholder="algebra, equations, linear"
            value={formData.tags}
            onChange={handleInputChange('tags')}
          />

          <Button type="submit" loading={loading} disabled={!formData.courseId || !formData.topicId}>
            Upload Content
          </Button>
        </form>
      </div>

      {contents.length > 0 && (
        <div className="teacher-card">
          <h3 className="card-title">Uploaded Content</h3>
          <div className="content-list">
            {contents.map(content => {
              // Only show content if course still exists
              const courseExists = courses.find(course => course.course_id === content.course_id);
              if (!courseExists) return null;
              
              return (
                <div key={content.content_id} className="content-item">
                  <div className="content-info">
                    <h4 className="content-title">
                      {getCourseNameById(content.course_id)} - {getTopicNameById(content.topic_id)}
                    </h4>
                    <div className="content-details">
                      <span className={`content-difficulty difficulty-${content.difficulty.toLowerCase()}`}>
                        {content.difficulty}
                      </span>
                      <span className="content-time">{content.estimated_time} min</span>
                      {content.video_url && <span className="content-video">📹 Video</span>}
                      {content.pdf_data && <span className="content-pdf">📄 PDF</span>}
                    </div>
                    {content.tags && content.tags.length > 0 && (
                      <div className="content-tags">
                        {content.tags.map((tag, index) => (
                          <span key={index} className="content-tag">{tag}</span>
                        ))}
                      </div>
                    )}
                    <span className="content-id">ID: {content.content_id}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentUploader;