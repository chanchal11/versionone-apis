const express = require('express');
const cors = require('cors');
const { User, Service, Address } = require('./models');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;

    const users = await User.findAll({
      attributes: ['id', 'name', 'profilePictureUrl'],
      include: [
        {
          model: Service,
          attributes: ['typeOfService'],
        },
      ],
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });

    const count = await User.count();

    const formattedUsers = users.map(user => {
      const services = user.Services.map(service => service.typeOfService);
      return {
        id: user.id,
        name: user.name,
        profilePictureUrl: user.profilePictureUrl,
        services,
        serviceCount: services.length,
      };
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      totalUsers: count,
      totalPages,
      currentPage: parseInt(page, 10),
      users: formattedUsers,
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
