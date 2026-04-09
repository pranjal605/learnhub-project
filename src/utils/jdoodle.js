/**
 * JDoodle API execution utility
 * Calls the local backend proxy to handle execution securely
 */

/**
 * Maps frontend language names to JDoodle language codes and version indexes
 */
export const LANGUAGE_MAP = {
    'javascript': { lang: 'nodejs', version: '4' },
    'python': { lang: 'python3', version: '4' },
    'cpp': { lang: 'cpp17', version: '1' },
    'java': { lang: 'java', version: '4' },
    'sql': { lang: 'sql', version: '4' }
};

/**
 * Executes code using our local backend proxy (which then calls JDoodle)
 * @param {string} sourceCode 
 * @param {string} language 
 * @param {string} stdin 
 * @returns {Promise<object>}
 */
export const executeCode = async (sourceCode, language, stdin = '') => {
    const config = LANGUAGE_MAP[language.toLowerCase()];

    if (!config) {
        throw new Error(`Unsupported language: ${language}`);
    }

    // Call our local backend instead of JDoodle directly
    // This avoids CORS issues and keeps the Client Secret safe
    const url = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/execute`;

    const body = {
        script: sourceCode,
        language: config.lang,
        versionIndex: config.version,
        stdin: stdin
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to execute code');
        }

        const data = await response.json();

        return {
            stdout: data.output,
            stderr: '',
            compile_output: '',
            status: { id: 3, description: 'Accepted' },
            time: data.cpuTime,
            memory: data.memory ? parseInt(data.memory) : 0
        };

    } catch (error) {
        console.error('JDoodle Execution Error:', error);
        throw error;
    }
};
