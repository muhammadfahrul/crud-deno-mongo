import { Router } from "https://deno.land/x/denotrain@v0.5.0/mod.ts";
import { getPosts, savePost, getSinglePost, updatePost, deletePost } from "../controllers/controllers.ts";

// Optional: Generate router and hook routes to it
const router = new Router();

router.get('/', getPosts)
    .get('/:id', getSinglePost)
    .post('/', savePost)
    .put('/:id', updatePost)
    .delete('/:id', deletePost)

export default router; 