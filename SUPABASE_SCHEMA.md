# Supabase SQL Schema for Claire AI Voice Agent Dashboard

## Overview

This document outlines the SQL schema for the Claire AI Voice Agent Dashboard database in Supabase. The schema is designed to support all the features identified in the codebase, including call management, transcript analysis, AI performance tracking, and user authentication.

## Database Schema Plan

### Users Table (Built-in)

Supabase automatically handles the `auth.users` table. We'll access this through Supabase Auth.

```sql
-- This table is managed by Supabase Auth
-- Reference only, no need to create manually
```

### Properties Table

```sql
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT NOT NULL,
  units INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their properties" 
  ON properties FOR SELECT 
  USING (auth.uid() IN (
    SELECT user_id FROM property_users WHERE property_id = properties.id
  ));

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_properties_modtime
    BEFORE UPDATE ON properties
    FOR EACH ROW
    EXECUTE PROCEDURE update_modified_column();
```

### Property Users Table (Many-to-many)

```sql
CREATE TABLE property_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'manager', 'viewer')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(property_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE property_users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their property associations" 
  ON property_users FOR SELECT 
  USING (auth.uid() = user_id OR auth.uid() IN (
    SELECT user_id FROM property_users 
    WHERE property_id = property_users.property_id AND role = 'admin'
  ));
```

### Prospects Table

```sql
CREATE TABLE prospects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'tour_scheduled', 'tour_completed', 'application', 'lease_signed', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE prospects ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view prospects for their properties" 
  ON prospects FOR SELECT 
  USING (auth.uid() IN (
    SELECT user_id FROM property_users WHERE property_id = prospects.property_id
  ));

-- Trigger for updated_at
CREATE TRIGGER update_prospects_modtime
    BEFORE UPDATE ON prospects
    FOR EACH ROW
    EXECUTE PROCEDURE update_modified_column();
```

### Calls Table

```sql
CREATE TABLE calls (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prospect_id UUID REFERENCES prospects(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'failed', 'canceled')),
  outcome TEXT CHECK (outcome IN ('tour_scheduled', 'callback_scheduled', 'not_interested', 'no_answer', 'voicemail', 'information_provided', null)),
  duration_seconds INTEGER DEFAULT 0,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  engagement_score INTEGER CHECK (engagement_score BETWEEN 0 AND 100),
  lead_quality_score INTEGER CHECK (lead_quality_score BETWEEN 0 AND 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE calls ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view calls for their properties" 
  ON calls FOR SELECT 
  USING (auth.uid() IN (
    SELECT user_id FROM property_users WHERE property_id = calls.property_id
  ));

-- Trigger for updated_at
CREATE TRIGGER update_calls_modtime
    BEFORE UPDATE ON calls
    FOR EACH ROW
    EXECUTE PROCEDURE update_modified_column();
```

### Transcripts Table

```sql
CREATE TABLE transcripts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  call_id UUID NOT NULL REFERENCES calls(id) ON DELETE CASCADE,
  content JSONB NOT NULL, -- Store the entire transcript with speaker, text, timestamp, sentiment
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE transcripts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view transcripts for their properties' calls" 
  ON transcripts FOR SELECT 
  USING (auth.uid() IN (
    SELECT user_id FROM property_users WHERE property_id IN (
      SELECT property_id FROM calls WHERE id = transcripts.call_id
    )
  ));
```

### Transcript Segments Table

```sql
CREATE TABLE transcript_segments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transcript_id UUID NOT NULL REFERENCES transcripts(id) ON DELETE CASCADE,
  speaker TEXT NOT NULL CHECK (speaker IN ('ai', 'prospect')),
  text TEXT NOT NULL,
  start_time NUMERIC NOT NULL, -- Start time in seconds from call beginning
  end_time NUMERIC NOT NULL, -- End time in seconds
  sentiment TEXT CHECK (sentiment IN ('positive', 'negative', 'neutral', 'uncertain')),
  confidence NUMERIC CHECK (confidence BETWEEN 0 AND 1),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE transcript_segments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view transcript segments for their properties' calls" 
  ON transcript_segments FOR SELECT 
  USING (auth.uid() IN (
    SELECT user_id FROM property_users WHERE property_id IN (
      SELECT c.property_id FROM calls c
      JOIN transcripts t ON t.call_id = c.id
      WHERE t.id = transcript_segments.transcript_id
    )
  ));

-- Index for faster segment queries
CREATE INDEX idx_transcript_segments_transcript_id ON transcript_segments(transcript_id);
CREATE INDEX idx_transcript_segments_speaker ON transcript_segments(speaker);
CREATE INDEX idx_transcript_segments_sentiment ON transcript_segments(sentiment);
```

### AI Performance Metrics Table

```sql
CREATE TABLE ai_performance_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  call_id UUID REFERENCES calls(id) ON DELETE CASCADE,
  response_accuracy NUMERIC CHECK (response_accuracy BETWEEN 0 AND 1),
  nlp_understanding NUMERIC CHECK (nlp_understanding BETWEEN 0 AND 1),
  conversation_flow NUMERIC CHECK (conversation_flow BETWEEN 0 AND 1),
  system_health NUMERIC CHECK (system_health BETWEEN 0 AND 1),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE ai_performance_metrics ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view AI metrics for their properties' calls" 
  ON ai_performance_metrics FOR SELECT 
  USING (auth.uid() IN (
    SELECT user_id FROM property_users WHERE property_id IN (
      SELECT property_id FROM calls WHERE id = ai_performance_metrics.call_id
    )
  ));
```

### User Settings Table

```sql
CREATE TABLE user_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email_notifications BOOLEAN DEFAULT true,
  call_alerts BOOLEAN DEFAULT true,
  performance_reports BOOLEAN DEFAULT false,
  theme TEXT DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'system')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view and edit their own settings" 
  ON user_settings FOR ALL 
  USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_user_settings_modtime
    BEFORE UPDATE ON user_settings
    FOR EACH ROW
    EXECUTE PROCEDURE update_modified_column();
```

## Functions and Triggers

### Automatically Create User Settings

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_settings (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

### Calculate Call Statistics

```sql
CREATE OR REPLACE FUNCTION get_call_statistics(property_id_param UUID, date_from TIMESTAMP, date_to TIMESTAMP)
RETURNS TABLE (
  total_calls BIGINT,
  avg_duration NUMERIC,
  conversion_rate NUMERIC,
  tours_scheduled BIGINT
) AS $$
BEGIN
  RETURN QUERY
  WITH call_data AS (
    SELECT
      COUNT(*) AS total,
      COALESCE(AVG(duration_seconds), 0) AS avg_dur,
      COUNT(CASE WHEN outcome = 'tour_scheduled' THEN 1 END) AS tours,
      COUNT(CASE WHEN status = 'completed' THEN 1 END) AS completed_calls
    FROM calls
    WHERE 
      property_id = property_id_param
      AND created_at BETWEEN date_from AND date_to
  )
  SELECT
    total AS total_calls,
    avg_dur AS avg_duration,
    CASE 
      WHEN completed_calls > 0 THEN (tours::NUMERIC / completed_calls) 
      ELSE 0 
    END AS conversion_rate,
    tours AS tours_scheduled
  FROM call_data;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## Views

### Recent Calls View

```sql
CREATE OR REPLACE VIEW recent_calls AS
SELECT 
  c.id,
  c.status,
  c.outcome,
  c.duration_seconds,
  c.engagement_score,
  c.lead_quality_score,
  c.started_at,
  c.ended_at,
  p.first_name || ' ' || p.last_name AS prospect_name,
  p.phone AS prospect_phone,
  p.email AS prospect_email,
  prop.name AS property_name,
  EXISTS (
    SELECT 1 FROM transcripts t WHERE t.call_id = c.id
  ) AS has_transcript
FROM calls c
LEFT JOIN prospects p ON c.prospect_id = p.id
LEFT JOIN properties prop ON c.property_id = prop.id
ORDER BY c.created_at DESC;
```

### AI Performance Aggregated View

```sql
CREATE OR REPLACE VIEW ai_performance_summary AS
SELECT 
  c.property_id,
  DATE_TRUNC('day', c.created_at) AS date,
  AVG(m.response_accuracy) AS avg_response_accuracy,
  AVG(m.nlp_understanding) AS avg_nlp_understanding,
  AVG(m.conversation_flow) AS avg_conversation_flow,
  AVG(m.system_health) AS avg_system_health,
  COUNT(c.id) AS call_count
FROM calls c
JOIN ai_performance_metrics m ON c.id = m.call_id
GROUP BY c.property_id, DATE_TRUNC('day', c.created_at)
ORDER BY date DESC;
```

## Implementation Steps

1. Create the base tables in the following order:
   - properties
   - property_users
   - prospects
   - calls
   - transcripts
   - transcript_segments
   - ai_performance_metrics
   - user_settings

2. Set up Row Level Security (RLS) policies for each table

3. Create functions, triggers and views

4. Add sample data for testing

5. Connect the application to Supabase using the client libraries already installed

## Next Steps

After implementing this schema:

1. Modify the Claire application to fetch real data from Supabase instead of using mock data
2. Update the call trigger component to create actual database entries
3. Implement real-time updates using Supabase's real-time capabilities
4. Add proper error handling for database operations
5. Create API endpoints or Supabase functions for more complex data operations

## Notes

- This schema uses Supabase's built-in authentication system
- Row Level Security ensures users can only access data they're authorized to see
- The schema is optimized for the current feature set but can be extended as needed
- Consider adding indexes for frequently queried columns to improve performance
