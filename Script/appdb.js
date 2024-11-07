const client = require('./db');
const app = express();
const port = 3000;

app.use(express.json());

// Conectar ao banco de dados
client.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados', err.stack);
  } else {
    console.log('Conectado ao banco de dados');
  }
});

// Rota para adicionar um novo usuário
app.post('/usuarios', async (req, res) => {
  try {
    const { nome, email, senha, telefone } = req.body;

    // Verifica se todos os campos estão preenchidos
    if (!nome || !email || !senha || !telefone) {
      return res.status(400).json({ error: 'Por favor, preencha todos os campos.' });
    }

    // Inserir dados no banco de dados
    const result = await client.query(
      'INSERT INTO usuarios (nome, email, senha, data_nascimento, rua, numero, bairro, cidade, estado, cep) VALUES ("Otávio Augusto", "otavio@gmail.com","1010", "1990-07-15", "Rua AB", "15", "Pedro Alvares Cabral", "Campinas", "SP", "87550-000"); RETURNING *',
      [nome, email, senha, telefone]
    );

    // Retornar o usuário criado
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao inserir dados', err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
