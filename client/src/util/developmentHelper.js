const developmentPath = 'http://localhost:5000';

/**
 * Returns relative path if in production, or returns developmentPath if in development.
 * @param {string} relative_path 
 */
export function getCorrectPath(relative_path) {
    if (process.env.NODE_ENV === 'development') {
        return developmentPath + relative_path;

    } else {
        return relative_path;
    }
}