const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar posts", details: error.message });
    }
})

router.get("/search", async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(200).json([]);
        }
        const postsFound = await Post.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { content: { $regex: query, $options: "i"} },
                { description: { $regex: query, $options: "i" } }
            ]
        }).sort({ createdAt: -1 });
        res.status(200).json(postsFound);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar posts", details: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const idPost = req.params.id;
        const postFound = await Post.findById(idPost);
        if (!postFound) {
            return res.status(404).json({ message: "Post não encontrado" });
        }
        res.status(200).json(postFound);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar post", details: error.message });
    }
});
router.post("/", async (req, res) => {
    try {
        const novoPost = new Post({
            title: req.body.title,
            content: req.body.content,
            description: req.body.description,
            imageUrl: req.body.imageUrl
        });
        const postSalvo = await novoPost.save();
        res.status(201).json(postSalvo);    
    } catch (error) {
        res.status(400).json({ message: "Erro ao criar post", error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const idPost = req.params.id;
        const newData = req.body;
        const postUpdated = await Post.findByIdAndUpdate(idPost, newData, { new: true });
        if (!postUpdated) {
            return res.status(404).json({ message: "Post não encontrado" });
        }
        res.status(200).json(postUpdated);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar post", details: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const idPost = req.params.id;
        postDeleted = await Post.findByIdAndDelete(idPost);
        if (!postDeleted) {
            return res.status(404).json({ message: "Post não encontrado para exclusão" });
        }
        res.status(200).json({ message: "Post excluído" });
    
    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir post", details: error.message });
    }
});

module.exports = router;