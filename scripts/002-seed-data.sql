-- Seed data for voice agent dashboard

-- Insert sample agents
INSERT INTO agents (name, email, phone, status) VALUES
('Sarah Johnson', 'sarah.johnson@company.com', '+1-555-0101', 'active'),
('Michael Chen', 'michael.chen@company.com', '+1-555-0102', 'active'),
('Emily Rodriguez', 'emily.rodriguez@company.com', '+1-555-0103', 'active'),
('David Kim', 'david.kim@company.com', '+1-555-0104', 'active');

-- Insert sample calls
INSERT INTO calls (agent_id, prospect_name, prospect_phone, prospect_email, call_type, status, duration, started_at, ended_at) VALUES
(1, 'John Smith', '+1-555-1001', 'john.smith@email.com', 'outbound', 'completed', 420, NOW() - INTERVAL '2 hours', NOW() - INTERVAL '2 hours' + INTERVAL '7 minutes'),
(2, 'Lisa Wang', '+1-555-1002', 'lisa.wang@email.com', 'outbound', 'completed', 380, NOW() - INTERVAL '3 hours', NOW() - INTERVAL '3 hours' + INTERVAL '6 minutes 20 seconds'),
(1, 'Robert Brown', '+1-555-1003', 'robert.brown@email.com', 'outbound', 'completed', 290, NOW() - INTERVAL '4 hours', NOW() - INTERVAL '4 hours' + INTERVAL '4 minutes 50 seconds'),
(3, 'Maria Garcia', '+1-555-1004', 'maria.garcia@email.com', 'outbound', 'completed', 510, NOW() - INTERVAL '5 hours', NOW() - INTERVAL '5 hours' + INTERVAL '8 minutes 30 seconds'),
(4, 'James Wilson', '+1-555-1005', 'james.wilson@email.com', 'outbound', 'in_progress', 0, NOW() - INTERVAL '10 minutes', NULL);

-- Insert sample transcripts
INSERT INTO transcripts (call_id, speaker, content, timestamp_offset, confidence_score) VALUES
(1, 'agent', 'Hello, this is Sarah from Premium Leasing. Is this John Smith?', 0, 0.98),
(1, 'prospect', 'Yes, this is John. What can I help you with?', 3, 0.95),
(1, 'agent', 'I''m calling about the luxury apartment listing you inquired about downtown. Do you have a few minutes to discuss?', 8, 0.97),
(1, 'prospect', 'Actually, yes! I''ve been looking for something in that area. What can you tell me about it?', 15, 0.94),
(2, 'agent', 'Hi Lisa, this is Michael from Premium Leasing. I wanted to follow up on your interest in our waterfront properties.', 0, 0.96),
(2, 'prospect', 'Oh yes, I remember. I''m definitely still interested. What availability do you have?', 5, 0.93);

-- Insert sample KPIs
INSERT INTO kpis (call_id, metric_name, metric_value, metric_type) VALUES
(1, 'engagement_score', 85.5, 'percentage'),
(1, 'conversion_probability', 72.3, 'percentage'),
(1, 'talk_time_ratio', 45.2, 'percentage'),
(2, 'engagement_score', 91.2, 'percentage'),
(2, 'conversion_probability', 88.7, 'percentage'),
(2, 'talk_time_ratio', 42.8, 'percentage'),
(3, 'engagement_score', 67.8, 'percentage'),
(3, 'conversion_probability', 54.1, 'percentage'),
(3, 'talk_time_ratio', 52.3, 'percentage');

-- Insert sample call outcomes
INSERT INTO call_outcomes (call_id, outcome_type, outcome_value, sentiment_score, lead_quality, follow_up_required) VALUES
(1, 'appointment_scheduled', 'Viewing scheduled for tomorrow 2PM', 0.82, 'hot', true),
(2, 'information_requested', 'Requested floor plans and pricing', 0.91, 'warm', true),
(3, 'not_interested', 'Budget constraints', 0.45, 'cold', false);
