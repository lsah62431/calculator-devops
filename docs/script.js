body {
  font-family: Arial, sans-serif;
  text-align: center;
  background-color: #f5f5f5;
}

h1 {
  margin-top: 20px;
}

#display {
  width: 220px;
  height: 40px;
  font-size: 20px;
  text-align: right;
  margin-bottom: 10px;
  padding: 5px;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 55px);
  grid-gap: 5px;
  justify-content: center;
}

button {
  height: 50px;
  font-size: 18px;
  background-color: #e0e0e0;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #d5d5d5;
}

button.red {
  background-color: red;
  color: white;
}
