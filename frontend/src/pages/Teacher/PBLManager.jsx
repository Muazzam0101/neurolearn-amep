import React, { useState } from 'react';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import './Teacher.css';

const PBLManager = () => {
  const [formData, setFormData] = useState({
    projectTitle: '',
    projectDescription: '',
    skills: [],
    milestones: [''],
    rubric: {
      teamwork: { 1: '', 2: '', 3: '', 4: '', 5: '' },
      communication: { 1: '', 2: '', 3: '', 4: '', 5: '' },
      problemSolving: { 1: '', 2: '', 3: '', 4: '', 5: '' },
      creativity: { 1: '', 2: '', 3: '', 4: '', 5: '' }
    }
  });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const availableSkills = [
    { id: 'teamwork', label: 'Teamwork' },
    { id: 'communication', label: 'Communication' },
    { id: 'problemSolving', label: 'Problem Solving' },
    { id: 'creativity', label: 'Creativity' }
  ];

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSkillToggle = (skillId) => {
    const updatedSkills = formData.skills.includes(skillId)
      ? formData.skills.filter(id => id !== skillId)
      : [...formData.skills, skillId];
    setFormData({ ...formData, skills: updatedSkills });
  };

  const handleMilestoneChange = (index, value) => {
    const updatedMilestones = [...formData.milestones];
    updatedMilestones[index] = value;
    setFormData({ ...formData, milestones: updatedMilestones });
  };

  const addMilestone = () => {
    setFormData({ ...formData, milestones: [...formData.milestones, ''] });
  };

  const removeMilestone = (index) => {
    if (formData.milestones.length > 1) {
      const updatedMilestones = formData.milestones.filter((_, i) => i !== index);
      setFormData({ ...formData, milestones: updatedMilestones });
    }
  };

  const handleRubricChange = (skill, level, value) => {
    setFormData({
      ...formData,
      rubric: {
        ...formData.rubric,
        [skill]: {
          ...formData.rubric[skill],
          [level]: value
        }
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const newProject = {
        project_id: Date.now().toString(),
        project_title: formData.projectTitle,
        project_description: formData.projectDescription,
        skills: formData.skills,
        milestones: formData.milestones.filter(m => m.trim()),
        rubric: formData.rubric,
        created_at: new Date().toISOString()
      };

      setProjects([...projects, newProject]);
      
      setFormData({
        projectTitle: '',
        projectDescription: '',
        skills: [],
        milestones: [''],
        rubric: {
          teamwork: { 1: '', 2: '', 3: '', 4: '', 5: '' },
          communication: { 1: '', 2: '', 3: '', 4: '', 5: '' },
          problemSolving: { 1: '', 2: '', 3: '', 4: '', 5: '' },
          creativity: { 1: '', 2: '', 3: '', 4: '', 5: '' }
        }
      });
      
      setLoading(false);
    }, 500);
  };

  const getSkillLabel = (skillId) => {
    const skill = availableSkills.find(s => s.id === skillId);
    return skill ? skill.label : skillId;
  };

  return (
    <div className="teacher-section">
      <div className="section-header">
        <h2 className="section-title">Project-Based Learning</h2>
        <p className="section-subtitle">Create structured PBL projects with soft-skill assessment</p>
      </div>

      <div className="teacher-card">
        <h3 className="card-title">Create PBL Project</h3>
        
        <form onSubmit={handleSubmit} className="teacher-form">
          <InputField
            type="text"
            label="Project Title"
            placeholder="Enter project title"
            value={formData.projectTitle}
            onChange={handleInputChange('projectTitle')}
            required
          />

          <div className="form-group">
            <label className="form-label">Project Description</label>
            <textarea
              className="textarea-field"
              placeholder="Describe the project objectives and requirements"
              value={formData.projectDescription}
              onChange={handleInputChange('projectDescription')}
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Skills to Assess</label>
            <div className="skills-grid">
              {availableSkills.map(skill => (
                <label key={skill.id} className="skill-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.skills.includes(skill.id)}
                    onChange={() => handleSkillToggle(skill.id)}
                  />
                  <span>{skill.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Project Milestones</label>
            <div className="milestones-section">
              {formData.milestones.map((milestone, index) => (
                <div key={index} className="milestone-item">
                  <input
                    type="text"
                    className="milestone-input"
                    placeholder={`Milestone ${index + 1}`}
                    value={milestone}
                    onChange={(e) => handleMilestoneChange(index, e.target.value)}
                    required
                  />
                  {formData.milestones.length > 1 && (
                    <button
                      type="button"
                      className="remove-milestone-btn"
                      onClick={() => removeMilestone(index)}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="add-milestone-btn"
                onClick={addMilestone}
              >
                + Add Milestone
              </button>
            </div>
          </div>

          {formData.skills.length > 0 && (
            <div className="form-group">
              <label className="form-label">Assessment Rubric (1-5 Scale)</label>
              <div className="rubric-section">
                {formData.skills.map(skillId => (
                  <div key={skillId} className="rubric-skill">
                    <h4 className="rubric-skill-title">{getSkillLabel(skillId)}</h4>
                    <div className="rubric-levels">
                      {[1, 2, 3, 4, 5].map(level => (
                        <div key={level} className="rubric-level">
                          <label className="rubric-level-label">Level {level}</label>
                          <input
                            type="text"
                            className="rubric-input"
                            placeholder={`Describe level ${level} performance`}
                            value={formData.rubric[skillId][level]}
                            onChange={(e) => handleRubricChange(skillId, level, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button type="submit" loading={loading} disabled={formData.skills.length === 0}>
            Create Project
          </Button>
        </form>
      </div>

      {projects.length > 0 && (
        <div className="teacher-card">
          <h3 className="card-title">Created PBL Projects</h3>
          <div className="projects-list">
            {projects.map(project => (
              <div key={project.project_id} className="project-item">
                <div className="project-info">
                  <h4 className="project-title">{project.project_title}</h4>
                  <p className="project-description">{project.project_description}</p>
                  
                  <div className="project-skills">
                    <span className="skills-label">Skills:</span>
                    <div className="skills-tags">
                      {project.skills.map(skillId => (
                        <span key={skillId} className="skill-tag">
                          {getSkillLabel(skillId)}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="project-milestones">
                    <span className="milestones-label">Milestones:</span>
                    <ol className="milestones-list">
                      {project.milestones.map((milestone, index) => (
                        <li key={index} className="milestone-text">{milestone}</li>
                      ))}
                    </ol>
                  </div>

                  <span className="project-id">ID: {project.project_id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PBLManager;