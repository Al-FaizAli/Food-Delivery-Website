import React, { useState } from 'react';
import './Add.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', data.name);
    formDataToSend.append('description', data.description);
    formDataToSend.append('price', data.price);
    formDataToSend.append('category', data.category);
    formDataToSend.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/addFood', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        toast.success(response.data.message)
        setData({
          name: '',
          description: '',
          price: '',
          category: '',
        });
        setImage(null);
        setImagePreview('');
      } else {
        toast.error(response.data.message)
      }
    } catch (err) {
      console.error('Error submitting form data:', err);
    }
  };

  return (
    <div>
      <h1>Add Food Item</h1>
      <form onSubmit={handleSubmit} className="add-form">
        <input
          name="name"
          value={data.name}
          onChange={handleChange}
          placeholder="Name of Food"
          required
        />
        <textarea
          name="description"
          value={data.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          name="image"
          type="file"
          onChange={handleFileChange}
          placeholder="Food Image"
          required
        />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" style={{ maxWidth: '20%', margin: '-20px 0 0 10px' }} />
        )}
        <input
          name="price"
          type="number"
          value={data.price}
          onChange={handleChange}
          placeholder="Price"
          required
          min="0"
        />
        <select
          name="category"
          value={data.category}
          onChange={handleChange}
          placeholder="Category"
          required
        >
          <option value="">Select a category</option>
          <option value="Appetizer">Appetizer</option>
          <option value="Main Course">Main Course</option>
          <option value="Dessert">Dessert</option>
          <option value="Beverage">Beverage</option>
        </select>
        <button type="submit" className="btn submit-btn">
          Add Food
        </button>
      </form>
    </div>
  );
};

export default Add;
