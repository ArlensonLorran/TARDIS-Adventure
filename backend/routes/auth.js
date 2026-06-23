const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
    try {
        const { username, password } = req.body;

        const USUARIO_CORRETO = "zebeto";
        const SENHA_CORRETA = "deletar"; 

        // Validação direta no código
        if (username === USUARIO_CORRETO && password === SENHA_CORRETA) {
            return res.status(200).json({ 
                message: "Acesso autorizado na TARDIS!",
                authorized: true 
            });
        } else {
            return res.status(401).json({ 
                message: "Usuário ou senha incorretos. Acesso negado." 
            });
        }

    } catch (error) {
        console.error("erro do backend:", error);
        return res.status(500).json({ message: "Erro no servidor de autenticação" });
    }
});

module.exports = router;