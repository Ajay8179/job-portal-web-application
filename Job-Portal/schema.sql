CREATE TABLE Companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  industry VARCHAR(255),
  logo_url TEXT
);

CREATE TABLE Jobs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  company_id INTEGER REFERENCES Companies(id),
  salary_range VARCHAR(100),
  deadline DATE
);

CREATE TABLE Applications (
  id SERIAL PRIMARY KEY,
  job_id INTEGER REFERENCES Jobs(id),
  user_id INTEGER NOT NULL,
  status VARCHAR(50),
  resume_url TEXT,
  UNIQUE(job_id, user_id)
);

CREATE INDEX idx_jobs_deadline ON Jobs(deadline);
CREATE INDEX idx_applications_job_user ON Applications(job_id, user_id);






