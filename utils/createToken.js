
module.exports = async (data)=> {
        // Generate a token
        const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '12h' });
        return token;
}