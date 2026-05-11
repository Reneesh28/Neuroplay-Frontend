import React from 'react';

type JobStatus = 'pending' | 'processing' | 'completed' | 'failed' | string;

const STATUS_CONFIG: Record<string, { label: string; cls: string }> = {
    completed: { label: 'Completed', cls: 'badge badge-completed' },
    processing: { label: 'Processing', cls: 'badge badge-processing' },
    failed: { label: 'Failed', cls: 'badge badge-failed' },
    pending: { label: 'Pending', cls: 'badge badge-pending' },
};

export const JobStatusBadge: React.FC<{ status: JobStatus }> = ({ status }) => {
    const config = STATUS_CONFIG[status] ?? { label: status, cls: 'badge badge-pending' };
    
    return (
        <span className={config.cls}>
            {config.label}
        </span>
    );
};
