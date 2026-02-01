export const learningData = {
    subjects: [
        { id: 'dsa', name: 'Data Structures & Algorithms', color: '#3b82f6' },
        { id: 'dbms', name: 'DBMS', color: '#10b981' },
        { id: 'os', name: 'Operating Systems', color: '#f59e0b' },
        { id: 'cn', name: 'Computer Networks', color: '#ef4444' },
        { id: 'webdev', name: 'Web Development', color: '#8b5cf6' },
        { id: 'software-eng', name: 'Software Engineering', color: '#ec4899' }
    ],
    dsa: {
        topics: [
            { id: 'complexity', name: 'Time & Space Complexity', difficulty: 'Easy' },
            { id: 'recursion', name: 'Recursion', difficulty: 'Medium' },
            { id: 'bit-manipulation', name: 'Bit Manipulation', difficulty: 'Medium' },
            { id: 'arrays', name: 'Arrays', difficulty: 'Easy' },
            { id: 'strings', name: 'Strings', difficulty: 'Easy' },
            { id: 'searching', name: 'Searching', difficulty: 'Easy' },
            { id: 'sorting', name: 'Sorting', difficulty: 'Medium' },
            { id: 'linked-list', name: 'Linked List', difficulty: 'Medium' },
            { id: 'stack', name: 'Stack', difficulty: 'Medium' },
            { id: 'queue', name: 'Queue', difficulty: 'Medium' },
            { id: 'hashing', name: 'Hashing', difficulty: 'Medium' },
            { id: 'trees', name: 'Trees', difficulty: 'Hard' },
            { id: 'bst', name: 'Binary Search Tree (BST)', difficulty: 'Hard' },
            { id: 'heap', name: 'Heap / Priority Queue', difficulty: 'Hard' },
            { id: 'graphs', name: 'Graphs', difficulty: 'Hard' },
            { id: 'greedy', name: 'Greedy Algorithms', difficulty: 'Medium' },
            { id: 'dp', name: 'Dynamic Programming', difficulty: 'Hard' },
            { id: 'backtracking', name: 'Backtracking', difficulty: 'Hard' },
            { id: 'trie', name: 'Trie', difficulty: 'Hard' },
            { id: 'segment-tree', name: 'Segment Tree', difficulty: 'Hard' },
            { id: 'fenwick-tree', name: 'Fenwick Tree (BIT)', difficulty: 'Hard' },
            { id: 'disjoint-set', name: 'Disjoint Set (Union-Find)', difficulty: 'Hard' },
            { id: 'divide-conquer', name: 'Divide and Conquer', difficulty: 'Medium' },
            { id: 'two-pointer', name: 'Two Pointer Technique', difficulty: 'Medium' },
            { id: 'sliding-window', name: 'Sliding Window Technique', difficulty: 'Medium' }
        ],
        sheets: [
            { name: 'Striver A2Z DSA Sheet', url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/' },
            { name: 'Love Babbar 450 DSA Sheet', url: 'https://www.geeksforgeeks.org/explore?page=1&curated%5B%5D=Love%20Babbar%20DSA%20Sheet' },
            { name: 'Apna College DSA Sheet', url: 'https://www.apnacollege.in/course/dsa-sheet' },
            { name: 'Kunal Kushwaha DSA Sheet', url: 'https://github.com/kunal-kushwaha/DSA-Bootcamp-Java' }
        ]
    },
    dbms: {
        topics: [
            { id: 'intro', name: 'Introduction to DBMS', difficulty: 'Easy' },
            { id: 'er-model', name: 'ER Model', difficulty: 'Easy' },
            { id: 'relational-model', name: 'Relational Model', difficulty: 'Medium' },
            { id: 'normalization', name: 'Normalization', difficulty: 'Hard' },
            { id: 'sql', name: 'SQL Queries', difficulty: 'Medium' },
            { id: 'joins', name: 'SQL Joins', difficulty: 'Medium' },
            { id: 'indexing', name: 'Indexing & Hashing', difficulty: 'Hard' },
            { id: 'transactions', name: 'Transactions & Concurrency', difficulty: 'Hard' },
            { id: 'relational-algebra', name: 'Relational Algebra', difficulty: 'Hard' },
            { id: 'nosql', name: 'NoSQL Databases', difficulty: 'Medium' },
            { id: 'schema-design', name: 'Database Schema Design', difficulty: 'Medium' }
        ]
    },
    os: {
        topics: [
            { id: 'intro', name: 'Introduction to OS', difficulty: 'Easy' },
            { id: 'system-calls', name: 'System Calls', difficulty: 'Medium' },
            { id: 'processes', name: 'Process Management', difficulty: 'Medium' },
            { id: 'scheduling', name: 'CPU Scheduling', difficulty: 'Medium' },
            { id: 'sync', name: 'Process Synchronization', difficulty: 'Hard' },
            { id: 'deadlocks', name: 'Deadlocks', difficulty: 'Hard' },
            { id: 'memory', name: 'Memory Management', difficulty: 'Hard' },
            { id: 'paging', name: 'Paging & Segmentation', difficulty: 'Hard' },
            { id: 'virtual-memory', name: 'Virtual Memory', difficulty: 'Hard' },
            { id: 'file-systems', name: 'File Systems', difficulty: 'Medium' },
            { id: 'io-management', name: 'I/O Management', difficulty: 'Medium' }
        ]
    },
    cn: {
        topics: [
            { id: 'osi-layers', name: 'OSI Layers & TCP/IP', difficulty: 'Easy' },
            { id: 'physical-layer', name: 'Physical Layer', difficulty: 'Easy' },
            { id: 'data-link', name: 'Data Link Layer', difficulty: 'Medium' },
            { id: 'network-layer', name: 'Network Layer', difficulty: 'Hard' },
            { id: 'ip-addressing', name: 'IP Addressing (IPv4/v6)', difficulty: 'Medium' },
            { id: 'routing', name: 'Routing Algorithms', difficulty: 'Hard' },
            { id: 'transport-layer', name: 'Transport Layer', difficulty: 'Hard' },
            { id: 'application-layer', name: 'Application Layer Protocols', difficulty: 'Medium' },
            { id: 'security', name: 'Network Security', difficulty: 'Hard' }
        ]
    },
    webdev: {
        topics: [
            { id: 'html', name: 'HTML5 Semantic', difficulty: 'Easy' },
            { id: 'css', name: 'Modern CSS (Flex/Grid)', difficulty: 'Medium' },
            { id: 'responsive', name: 'Responsive Design', difficulty: 'Medium' },
            { id: 'js-basics', name: 'JavaScript ES6+', difficulty: 'Medium' },
            { id: 'dom', name: 'DOM Manipulation', difficulty: 'Medium' },
            { id: 'fetch-api', name: 'APIs & Fetch', difficulty: 'Medium' },
            { id: 'react', name: 'React Fundamentals', difficulty: 'Hard' },
            { id: 'redux', name: 'Redux/Context API', difficulty: 'Hard' },
            { id: 'node', name: 'Node.js & Express', difficulty: 'Hard' },
            { id: 'db-integration', name: 'Backend Integration', difficulty: 'Hard' }
        ]
    },
    'software-eng': {
        topics: [
            { id: 'sdlc', name: 'SDLC Models', difficulty: 'Easy' },
            { id: 'agile', name: 'Agile Methodology', difficulty: 'Medium' },
            { id: 'requirement', name: 'Requirement Analysis', difficulty: 'Medium' },
            { id: 'design-principles', name: 'SOLID Design Principles', difficulty: 'Hard' },
            { id: 'design-patterns', name: 'Design Patterns', difficulty: 'Hard' },
            { id: 'version-control', name: 'Version Control (Git)', difficulty: 'Medium' },
            { id: 'testing', name: 'Software Testing & QA', difficulty: 'Medium' }
        ]
    }
};

export const resourcesData = {
    'arrays': [
        { id: 1, creator: 'Striver', title: 'Complete Arrays Course', difficulty: 'Beginner', duration: '12 videos', url: 'https://www.youtube.com/playlist?list=PLgUwDviBHe0rPG3Ictpu74YWBQ1CaBkm2' },
        { id: 2, creator: 'Love Babbar', title: 'Arrays in One Shot', difficulty: 'Intermediate', duration: '10 videos', url: 'https://www.youtube.com/playlist?list=PLDzeHZWIZsTryvtXdMr6tPh4IDuxB7pue' },
        { id: 3, creator: 'Apna College', title: 'C++ DSA: Arrays', difficulty: 'Beginner', duration: '5 videos', url: 'https://www.youtube.com/playlist?list=PLfqMhTWNBTe0b2nM6JHVCnAkhQRGiZMSJ' },
        { id: 4, creator: 'Kunal Kushwaha', title: 'Java + DSA: Arrays', difficulty: 'Beginner', duration: '8 videos', url: 'https://www.youtube.com/playlist?list=PL9gnSGHSqcnr_mtXIFCkv9n66iEsOfzXV' },
        { id: 5, creator: 'Abdul Bari', title: 'Data Structures: Arrays', difficulty: 'Hard', duration: '15 videos', url: 'https://www.youtube.com/playlist?list=PL2_aWCzGMAwI3W_JlcBbtITUFupHsE_6X' },
        { id: 6, creator: 'Gate Smashers', title: 'DSA for Gate: Arrays', difficulty: 'Beginner', duration: 'Playlist', url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiEed7SKADgn96yb6rgVCsvu' },
        { id: 7, creator: 'CodeWithHarry', title: 'C Language Arrays', difficulty: 'Beginner', duration: '3 videos', url: 'https://www.youtube.com/playlist?list=PLu0W_9lII9aiX78ZaW759_q6X9e3s4xT5' },
        { id: 8, creator: 'Jenny\'s Lectures', title: 'DSA for Beginners: Arrays', difficulty: 'Intermediate', duration: 'Playlist', url: 'https://www.youtube.com/playlist?list=PLdo5W4Nhv31bbKJzrsKfMpo_grxuLl8LU' }
    ],
    // Fallback search link generator for other topics
};

export const quizData = {
    'arrays': [
        { id: 1, question: 'What is the time complexity of accessing an element in an array by index?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], correct: 0, explanation: 'Arrays provide constant-time access because elements are stored in contiguous memory.' },
        { id: 2, question: 'Which index represents the third element in a zero-indexed array?', options: ['1', '2', '3', '4'], correct: 1, explanation: 'In a zero-indexed array, the first element is at index 0, the second at 1, and the third at 2.' }
    ]
};
