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

async function updateBookmark(userID, artifactID, is_bookmark) {

    try {
        // Periksa apakah data sudah ada
        const [existing] = await db.execute(
            'SELECT * FROM Bookmark WHERE userID = ? AND artifactID = ?',
            [userID, artifactID]
        );

        if (existing.length === 0) {
            // Data tidak ada, insert record baru
            await db.execute(
                'INSERT INTO Bookmark (userID, artifactID, is_bookmark) VALUES (?, ?, ?)',
                [userID, artifactID, is_bookmark]
            );
        } else {
            // Data sudah ada, update record
            await db.execute(
                'UPDATE Bookmark SET is_bookmark = ? WHERE userID = ? AND artifactID = ?',
                [is_bookmark, userID, artifactID]
            );
        }

        return { success: true, message: 'Bookmark updated successfully' };
    } catch (error) {
        console.error('Error updating bookmark:', error);
        throw new Error('Failed to update bookmark');
    }
}

async function updateRead(userID, artifactID, is_read) {

    try {
        // Periksa apakah data sudah ada
        const [existing] = await db.execute(
            'SELECT * FROM `Read` WHERE userID = ? AND artifactID = ?',
            [userID, artifactID]
        );

        if (existing.length === 0) {
            // Data tidak ada, insert record baru
            await db.execute(
                'INSERT INTO `Read` (userID, artifactID, is_read) VALUES (?, ?, ?)',
                [userID, artifactID, is_read]
            );
        } else {
            // Data sudah ada, update record
            await db.execute(
                'UPDATE `Read` SET is_read = ? WHERE userID = ? AND artifactID = ?',
                [is_read, userID, artifactID]
            );
        }

        return { success: true, message: 'Read status updated successfully' };
    } catch (error) {
        console.error('Error updating read status:', error);
        throw new Error('Failed to update read status');
    }
}
module.exports = { getAllTemples, getAllArtifacts,updateBookmark,updateRead };