import React, { useState } from 'react';

const useAdminEmails = () => {
    const [uniqueAdminEmails, setUniqueAdminEmails] = useState(new Set());

    return ( uniqueAdminEmails, setUniqueAdminEmails);
};

export default useAdminEmails;