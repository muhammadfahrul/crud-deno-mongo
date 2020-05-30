import DB from "../utils/db.ts";
import { Post } from "../models/Post.ts";

const posts = DB.collection("posts");

export const getPosts = async (req: any) => {
    const allPosts: Post[] | [] = await posts.find({});

    return { posts: allPosts };
}

export const getSinglePost = async ({ req }: { req: any }) => {
    const post: Post | undefined = await posts.findOne({
        _id: {
            "$oid": req.params.id
        }
    });

    if (!post) {
        return {
            items: []
        }
    }

    return { post: post };
}

export const savePost = async ({ req, res }: { req: any, res: any }) => {
    const { title, body } = req.body;

    const newPosts = await posts.insertOne({
        title,
        body
    });

    res.status = 201;
    return {
        posts: newPosts
    }

}

export const updatePost = async ({ req, res }: { req: any, res: any }) => {
    const foundPost = await posts.findOne({
        _id: {
            "$oid": req.params.id
        }
    })

    let updatedPost;
    if (foundPost) {
        updatedPost = await posts.updateOne({
            _id: {
                "$oid": req.params.id
            }
        },
            req.body
        );
    } else {
        res.status = 404;
        return {
            message: 'No such post'
        }
    }

    return { post: updatedPost };
}

export const deletePost = async ({ req, res }: { req: any, res: any }) => {
    const foundPost = await posts.findOne({
        _id: {
            "$oid": req.params.id
        }
    })

    if (foundPost) {
        await posts.deleteOne({
            _id: {
                "$oid": req.params.id
            }
        }
        );
    } else {
        res.status = 404;
        return {
            message: 'No such post'
        }
    }

    return { message: 'Post deleted successfully!' };
}