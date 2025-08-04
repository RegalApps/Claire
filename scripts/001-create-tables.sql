-- Create database tables for voice agent dashboard

-- Agents table
CREATE TABLE IF NOT EXISTS agents (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Calls table
CREATE TABLE IF NOT EXISTS calls (
    id SERIAL PRIMARY KEY,
    agent_id INTEGER REFERENCES agents(id),
    prospect_name VARCHAR(255),
    prospect_phone VARCHAR(50),
    prospect_email VARCHAR(255),
    call_type VARCHAR(50) DEFAULT 'outbound',
    status VARCHAR(50) DEFAULT 'pending',
    duration INTEGER DEFAULT 0,
    started_at TIMESTAMP,
    ended_at TIMESTAMP,
    recording_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transcripts table
CREATE TABLE IF NOT EXISTS transcripts (
    id SERIAL PRIMARY KEY,
    call_id INTEGER REFERENCES calls(id) ON DELETE CASCADE,
    speaker VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    timestamp_offset INTEGER DEFAULT 0,
    confidence_score DECIMAL(3,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- KPIs table
CREATE TABLE IF NOT EXISTS kpis (
    id SERIAL PRIMARY KEY,
    call_id INTEGER REFERENCES calls(id) ON DELETE CASCADE,
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(10,2) NOT NULL,
    metric_type VARCHAR(50) DEFAULT 'percentage',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Call outcomes table
CREATE TABLE IF NOT EXISTS call_outcomes (
    id SERIAL PRIMARY KEY,
    call_id INTEGER REFERENCES calls(id) ON DELETE CASCADE,
    outcome_type VARCHAR(100) NOT NULL,
    outcome_value TEXT,
    sentiment_score DECIMAL(3,2),
    lead_quality VARCHAR(50),
    follow_up_required BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
