import jwt, { verify }  from "jsonwebtoken";

const verifyToken = (req: any, res: any, next: any) => {
    const token = req.headers["authorize"];

    if (!token)
        return res.status(403).send('Unauthorized');

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY as string);
        req.user = decoded;
    }
    catch (error) {
        console.log(error);
        return res.status(401).send("Invalid token");
    }

    return next();
}

export default verifyToken;