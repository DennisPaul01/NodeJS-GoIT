const nume = "Denis";
const varsta = 27;

const getIdentity = () => {
  return `Numele meu este ${nume} si am ${varsta} ani!`;
};

// export { nume, varsta };

// export default getIdentity;

module.exports = {
  nume,
  varsta,
  getIdentity,
};
