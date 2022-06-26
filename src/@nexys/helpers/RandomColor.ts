function generateRandomColor() {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`
  // Output -> #19feac
  return randomColor
}

export default generateRandomColor
