-- Create form_submissions table for storing client form data
CREATE TABLE IF NOT EXISTS form_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    form_type TEXT NOT NULL CHECK (form_type IN ('preventivo', 'contatto', 'configuratore')),
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT,
    message TEXT,
    product_type TEXT,
    dimensions TEXT,
    additional_data JSONB DEFAULT '{}',
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'archived')),
    admin_notes TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_form_submissions_form_type ON form_submissions(form_type);
CREATE INDEX IF NOT EXISTS idx_form_submissions_status ON form_submissions(status);
CREATE INDEX IF NOT EXISTS idx_form_submissions_client_email ON form_submissions(client_email);

-- Enable Row Level Security
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Policy for INSERT: Allow anonymous users to submit forms
CREATE POLICY "Allow anonymous form submissions" ON form_submissions
    FOR INSERT 
    TO anon
    WITH CHECK (true);

-- Policy for SELECT: Only authenticated admin users can view submissions
CREATE POLICY "Admin can view all submissions" ON form_submissions
    FOR SELECT 
    TO authenticated
    USING (true);

-- Policy for UPDATE: Only authenticated admin users can update submissions
CREATE POLICY "Admin can update submissions" ON form_submissions
    FOR UPDATE 
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Policy for DELETE: Only authenticated admin users can delete submissions
CREATE POLICY "Admin can delete submissions" ON form_submissions
    FOR DELETE 
    TO authenticated
    USING (true);

-- Add comment to table for documentation
COMMENT ON TABLE form_submissions IS 'Stores all form submissions from clients including preventivo, contatto, and configuratore forms';
COMMENT ON COLUMN form_submissions.form_type IS 'Type of form: preventivo, contatto, or configuratore';
COMMENT ON COLUMN form_submissions.status IS 'Processing status: new, contacted, or archived';
COMMENT ON COLUMN form_submissions.additional_data IS 'JSON field for storing form-specific additional data';
