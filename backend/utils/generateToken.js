import jwt from 'jsonwebtoken'

const generateToken = (id) => {
  return jwt.sign({ id }, 'noman123456', {
    expiresIn: '30d',
  })
}

export default generateToken
