const User = require('../model/user');
// controllers/productController.js
const Product = require('../model/Product');

exports.createUser = async (req, res) => {
  try {
    const { fullName, email, password, carType, address,  phone} = req.body;
    const user = await User.create({ fullName, email, password, carType, address, phone });
    res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};

exports.authenticateUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });

    // If user doesn't exist or password is incorrect, return error
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Incorrect email or password' });
    }

    // If credentials are correct, return success message and user data
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during login' });
  }
};

exports.checkEmailExists = async (req, res) => {
    const { email } = req.body;

    try {
        // Consulta a la base de datos para verificar si el correo electrónico ya existe
        const user = await User.findOne({ where: { email: email } });

        if (user) {
            // Si el correo electrónico existe, devolver true
            res.status(200).json({ exists: true });
        } else {
            // Si el correo electrónico no existe, devolver false
            res.status(200).json({ exists: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al verificar el correo electrónico' });
    }
};


//----------------------------------------------


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, description, stock, price } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.update({ name, description, stock, price });
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      res.json({ message: 'Product deleted' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleProductStatus = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      const newStatus = product.status === 'Habilitado' ? 'Inhabilitado' : 'Habilitado';
      await product.update({ status: newStatus });
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};