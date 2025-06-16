export const Queries = {
  usuario: {
    selectAll: `SELECT * FROM usuario`,
    update: `UPDATE pessoa SET nome = ? WHERE id = ?`,
    delete: `DELETE FROM pessoa WHERE id = ?`,
    insert: `INSERT INTO pessoa (nome, cpf) VALUES (?, ?)`,
  },
  publicacao: {
    selectAll: `SELECT * FROM publicacao`,
    update: `UPDATE publicacao SET nome = ? WHERE id = ?`,
    delete: `DELETE FROM publicacao where`,
    insert: `INSERT INTO publicacao 
    (publicacao_id, nome, fichatecnica, imagemcapa, imagem, texto, usuario_id,
    flagfinalizada, flagautorizada, flagrascunho, flagexcluido,
    categoria_id, nota)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  },
  categoria: {
    selectAll: `SELECT * FROM categoria`,
    update: `UPDATE publicacao SET nome = ? WHERE id = ?`,
    delete: `DELETE FROM publicacao where`,
    insert: `INSERT INTO publicacao`
  }
};