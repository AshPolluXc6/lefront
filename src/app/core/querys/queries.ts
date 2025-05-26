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
    insert: `INSERT INTO publicacao`
  },
};