const express = require('express');
const { User, Service, Address } = require('./models');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;

    const { count, rows } = await User.findAndCountAll({
      attributes: ['id', 'name', 'profilePictureUrl'],
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      totalUsers: count,
      totalPages,
      currentPage: parseInt(page, 10),
      users: rows,
    });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        { model: Service },
        { model: Address }
      ]
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user.id,
      name: user.name,
      services: user.Services,
      addresses: user.Address ? [user.Address.homeAddress, user.Address.workAddress] : []
    });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
