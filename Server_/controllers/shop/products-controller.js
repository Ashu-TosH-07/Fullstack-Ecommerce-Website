const Product = require("../../models/Product");

const getFilteredProducts = async (req, res) => {
  try {
    let { Category, Brand, sortBy } = req.query;

    const filters = {};

    // ✅ Normalize Category filter
    if (Category) {
      const categoryArray = Array.isArray(Category)
        ? Category
        : Category.split(",");
      filters.category = { $in: categoryArray };
    }

    // ✅ Normalize Brand filter
    if (Brand) {
      const brandArray = Array.isArray(Brand) ? Brand : Brand.split(",");
      filters.brand = { $in: brandArray };
    }

    // ✅ Sort logic
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "price-lowtohigh":
          sort.price = 1;
          break;
        case "price-hightolow":
          sort.price = -1;
          break;
        case "title-atoz":
          sort.title = 1;
          break;
        case "title-ztoa":
          sort.title = -1;
          break;
      }
    }

    const products = await Product.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error Occurred!",
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error Occurred!",
    });
  }
};

module.exports = { getFilteredProducts, getProductDetails };
