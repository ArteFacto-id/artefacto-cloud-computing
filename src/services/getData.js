const db = require('./connectDatabase');

async function getAllTemples() {
    try {
        const [rows] = await db.execute(`
            SELECT 
                templeID,
                image_url,
                title,
                description,
                funfact_title as funfactTitle,
                funfact_description as funfactDescription,
                location_url as location
            FROM Temple
        `);
        return rows;
    } catch (error) {
        console.error('Error fetching temples:', error);
        throw error;
    }
}

async function getAllArtifacts(templeId, userId) {
    try {
        const [rows] = await db.execute(`
            SELECT 
                a.artifactID,
                a.image_url,
                a.title,
                a.description,
                COALESCE(b.is_bookmark, FALSE) as is_bookmark,
                a.detail_period,
                a.detail_material,
                a.detail_size,
                a.detail_style,
                COALESCE(r.is_read, FALSE) as is_read,
                a.funfact_title as funfact_title,
                a.funfact_description as funfact_description,
                a.location_url as location,
                a.templeID as temple_id
            FROM Artifact a
            LEFT JOIN Bookmark b ON a.artifactID = b.artifactID AND b.userID = ?
            LEFT JOIN \`Read\` r ON a.artifactID = r.artifactID AND r.userID = ?
            WHERE a.templeID = ?
        `, [userId, userId, templeId]);
        return rows;
    } catch (error) {
        console.error('Error fetching artifacts:', error);
        throw error;
    }
}

module.exports = { getAllTemples, getAllArtifacts };