* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', sans-serif;
  }
  
  body {
    background-color: #f5f5f5;
    color: #333;
  }
  
  header {
    background-color: #101820;
    color: white;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    font-size: 1.8rem;
    font-weight: bold;
  }
  
  nav ul {
    display: flex;
    gap: 1.5rem;
    list-style: none;
  }
  
  nav ul li a {
    color: white;
    text-decoration: none;
    font-weight: 500;
  }
  
  .hero {
    text-align: center;
    padding: 4rem 2rem;
    background: linear-gradient(135deg, #101820, #3a3f47);
    color: white;
  }
  
  .hero h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .hero p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  
  .btn {
    background-color: #ff6b00;
    color: white;
    padding: 0.75rem 1.5rem;
    text-decoration: none;
    border-radius: 8px;
    font-size: 1rem;
    transition: background-color 0.3s;
  }
  
  .btn:hover {
    background-color: #e65c00;
  }
  
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 2rem;
    padding: 3rem 2rem;
  }
  
  .product-card {
    background-color: white;
    border-radius: 12px;
    padding: 1rem;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
  }
  
  .product-card img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  .product-card h3 {
    margin-top: 1rem;
    font-size: 1.2rem;
  }
  
  .product-card p {
    color: #555;
    font-size: 1rem;
    margin: 0.5rem 0;
  }
  
  .product-card button {
    background-color: #101820;
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .product-card button:hover {
    background-color: #333;
  }
  
  footer {
    text-align: center;
    padding: 1rem;
    background-color: #101820;
    color: white;
    margin-top: 2rem;
  }
  